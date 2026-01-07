import fs from 'fs';
import path from 'path';

export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    appointmentType: string;
    preferredDate: string;
    message: string;
    createdAt: string;
    synced: boolean;
}

const FILE_PATH = path.join(process.cwd(), 'src/data/leads.json');

export const readLeads = (): Lead[] => {
    if (!fs.existsSync(path.dirname(FILE_PATH))) {
        fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
    }
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
};

export const writeLeads = (leads: Lead[]): void => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2));
};

export const validateApiKey = (req: Request): boolean => {
    const authHeader = req.headers.get('Authorization');
    const apiKey = process.env.TRESCON_API_KEY;
    if (!apiKey || !authHeader) return false;
    return authHeader === `Bearer ${apiKey}`;
};
