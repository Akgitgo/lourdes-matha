import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), 'src/assets/pdf/booklet.pdf');

        if (!fs.existsSync(filePath)) {
            return new NextResponse('Brochure not found', { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Cache-Control': 'no-store, max-age=0',
                'X-Content-Type-Options': 'nosniff',
                'Content-Disposition': 'inline',
            },
        });
    } catch (error) {
        console.error('Error serving PDF:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
