import { NextResponse } from 'next/server';

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, service, appointmentType, preferredDate, message } = body;

        if (!name || !phone || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!GOOGLE_SHEETS_WEBHOOK_URL) {
            console.error('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const googleResponse = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                service: service || '',
                appointmentType: appointmentType || '',
                preferredDate: preferredDate || '',
                message: message || '',
                timestamp: new Date().toISOString()
            }),
        });

        // Google Apps Script returns a redirect (302) often, which fetch follows automatically.
        // If it follows and gets a 200 OK from the final page (often an HTML page saying "script completed"),
        // we can consider it a success. The script I provided returns JSON.

        if (googleResponse.ok) {
            const result = await googleResponse.json().catch(() => ({}));
            if (result.result === 'success') {
                return NextResponse.json({ success: true });
            } else {
                console.error('Google Sheets Script Error:', result);
                return NextResponse.json({ error: 'Failed to save to Google Sheets' }, { status: 500 });
            }
        } else {
            console.error('Google Sheets HTTP Error:', googleResponse.status, await googleResponse.text());
            return NextResponse.json({ error: 'Failed to connect to Google Sheets' }, { status: 500 });
        }

    } catch (error) {
        console.error('API POST Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
