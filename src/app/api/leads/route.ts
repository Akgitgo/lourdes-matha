import { NextResponse } from 'next/server';
import { readLeads, writeLeads, Lead } from '@/lib/leadsStore';
// removed unused validateApiKey import to avoid commented/unused auth bypass
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.TRESCON_API_KEY;

export async function POST(req: Request) {
    if (!API_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Missing API Key' }, { status: 500 });
    }
    // Require Authorization header with exact API key match
    const authorization = req.headers.get("authorization");
    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parts = authorization.split(' ');
    const token = parts.length > 1 ? parts[1] : parts[0];
    if (token !== API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json();
        const { name, phone, email, service, appointmentType, preferredDate, message } = body;

        if (!name || !phone || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newLead: Lead = {
            id: uuidv4(),
            name,
            phone,
            email,
            service: service || '',
            appointmentType: appointmentType || '',
            preferredDate: preferredDate || '',
            message: message || '',
            createdAt: new Date().toISOString(),
            synced: false,
        };

        const leads = readLeads();
        leads.push(newLead);
        writeLeads(leads);

        return NextResponse.json({ success: true, id: newLead.id });
    } catch (error) {
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

    // debug logging removed to avoid exposing API key

    const leads = readLeads();
    const unsyncedLeads = leads.filter((l) => !l.synced);

    return NextResponse.json(unsyncedLeads);
}
