import { NextResponse } from 'next/server';
import { markLeadsAsSynced } from '@/lib/leadsStore';
const API_KEY = process.env.TRESCON_API_KEY;

export async function POST(request: Request) {
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
        const { ids } = await request.json();

        if (!Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        await markLeadsAsSynced(ids);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API SYNC Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
