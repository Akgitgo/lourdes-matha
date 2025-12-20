const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function compressImage(inputPath, outputPath, filename) {
    try {
        const ext = path.extname(filename).toLowerCase();
        const targetSize = 200 * 1024; // 200KB target

        let metadata = await sharp(inputPath).metadata();
        let quality = 85;

        console.log(`Processing: ${filename} (${(metadata.size / 1024 / 1024).toFixed(2)}MB)`);

        // If already small enough, just copy with minimal optimization
        if (metadata.size < targetSize) {
            await sharp(inputPath)
                .jpeg({ quality: 90, progressive: true })
                .toFile(outputPath);
            console.log(`✓ ${filename} - Already optimized`);
            return;
        }

        // Aggressive compression for large images
        let compressed = false;
        while (!compressed && quality >= 60) {
            await sharp(inputPath)
                .resize(1920, 1920, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({
                    quality: quality,
                    progressive: true,
                    mozjpeg: true
                })
                .toFile(outputPath);

            const stats = fs.statSync(outputPath);
            const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

            if (stats.size < targetSize || quality === 60) {
                console.log(`✓ ${filename} - Compressed to ${sizeMB}MB (quality: ${quality})`);
                compressed = true;
            } else {
                quality -= 5;
                fs.unlinkSync(outputPath); // Delete and try again with lower quality
            }
        }
    } catch (error) {
        console.error(`✗ Error processing ${filename}:`, error.message);
    }
}

async function compressAllImages() {
    console.log('🚀 Starting aggressive image compression...\n');

    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to compress\n`);

    for (const file of imageFiles) {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(outputDir, file.replace(/\.(png|webp)$/i, '.jpg'));
        await compressImage(inputPath, outputPath, file);
    }

    console.log('\n✅ Compression complete!');
    console.log(`\nOptimized images are in: ${outputDir}`);
    console.log('\nTo use them, run:');
    console.log('  Remove-Item public\\images\\* -Force');
    console.log('  Move-Item public\\images-optimized\\* public\\images\\');
}

compressAllImages().catch(console.error);
