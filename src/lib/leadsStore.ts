import { supabase } from './supabase';

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

export const getUnsyncedLeads = async (): Promise<Lead[]> => {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('synced', false)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching leads:', error);
        throw error;
    }

    return (data || []).map(mapDbToLead);
};

export const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'synced'>): Promise<string> => {
    const { data, error } = await supabase
        .from('leads')
        .insert([{
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            service: lead.service,
            appointment_type: lead.appointmentType,
            preferred_date: lead.preferredDate,
            message: lead.message
        }])
        .select('id')
        .single();

    if (error) {
        console.error('Error adding lead:', error);
        throw error;
    }

    return data.id;
};

export const markLeadsAsSynced = async (ids: string[]): Promise<void> => {
    const { error } = await supabase
        .from('leads')
        .update({ synced: true })
        .in('id', ids);

    if (error) {
        console.error('Error syncing leads:', error);
        throw error;
    }
};

const mapDbToLead = (dbLead: any): Lead => ({
    id: dbLead.id,
    name: dbLead.name,
    phone: dbLead.phone,
    email: dbLead.email,
    service: dbLead.service,
    appointmentType: dbLead.appointment_type,
    preferredDate: dbLead.preferred_date,
    message: dbLead.message,
    createdAt: dbLead.created_at,
    synced: dbLead.synced,
});

export const validateApiKey = (req: Request): boolean => {
    const authHeader = req.headers.get('Authorization');
    const apiKey = process.env.TRESCON_API_KEY;
    if (!apiKey || !authHeader) return false;
    return authHeader === `Bearer ${apiKey}` || authHeader === apiKey;
};
