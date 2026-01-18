import { NextResponse } from 'next/server';
import { addLead, getUnsyncedLeads } from '@/lib/leadsStore';

const API_KEY = process.env.TRESCON_API_KEY;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, service, appointmentType, preferredDate, message } = body;

        if (!name || !phone || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const id = await addLead({
            name,
            phone,
            email,
            service: service || '',
            appointmentType: appointmentType || '',
            preferredDate: preferredDate || '',
            message: message || '',
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('API POST Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    if (!API_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Missing API Key' }, { status: 500 });
    }

    const authorization = request.headers.get("authorization");
    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parts = authorization.split(' ');
    const token = parts.length > 1 ? parts[1] : parts[0];
    if (token !== API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const unsyncedLeads = await getUnsyncedLeads();
        return NextResponse.json(unsyncedLeads);
    } catch (error) {
        console.error('API GET Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
