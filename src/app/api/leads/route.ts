import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Read the environment variable inside the handler to ensure it's fresh
    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    try {
        const body = await req.json();
        const { name, phone, email, service, appointmentType, preferredDate, message } = body;

        if (!name || !phone || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!GOOGLE_SHEETS_WEBHOOK_URL) {
            console.error('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables');
            return NextResponse.json({ error: 'Server configuration error: Missing Google Sheets URL' }, { status: 500 });
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

        if (googleResponse.ok) {
            let result;
            try {
                // Clone response because we might need to read text if json fails
                result = await googleResponse.clone().json();
            } catch (e) {
                const text = await googleResponse.text();
                console.error('Failed to parse Google Sheets response as JSON. Received:', text);
                return NextResponse.json({ error: 'Invalid response from Google Sheets integration' }, { status: 502 });
            }

            if (result.result === 'success') {
                return NextResponse.json({ success: true });
            } else {
                console.error('Google Sheets Script returned error:', result);
                return NextResponse.json({ error: 'Failed to save to Google Sheets', details: result }, { status: 500 });
            }
        } else {
            console.error('Google Sheets HTTP Error:', googleResponse.status, await googleResponse.text());
            return NextResponse.json({ error: 'Failed to connect to Google Sheets integration' }, { status: 502 });
        }

    } catch (error) {
        console.error('API POST Error:', error);
        return NextResponse.json({ error: 'Internal server error processing request' }, { status: 500 });
    }
}
