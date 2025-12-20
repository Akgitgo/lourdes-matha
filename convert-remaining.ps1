$videos = @("testimonials1", "testimonials2", "residents-activity")

foreach ($video in $videos) {
    Write-Host "Backing up $video.mp4..." -ForegroundColor Green
    Copy-Item "public\videos\$video.mp4" "public\videos\originals\$video-original.mp4" -ErrorAction SilentlyContinue
    
    Write-Host "Converting $video.mp4..." -ForegroundColor Cyan
    ffmpeg -i "public\videos\$video.mp4" -c:v libx264 -preset medium -crf 24 -c:a aac -b:a 128k -movflags +faststart -y "public\videos\$video-temp.mp4" 2>&1 | Out-Null
    
    Write-Host "Replacing original..." -ForegroundColor Yellow
    Move-Item -Force "public\videos\$video-temp.mp4" "public\videos\$video.mp4"
    
    Write-Host "✓ Completed $video.mp4`n" -ForegroundColor Green
}

Write-Host "✅ All videos converted successfully!" -ForegroundColor Green
