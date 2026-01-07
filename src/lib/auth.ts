export function validateApiKey(req: Request): boolean {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return false;
    }

    const token = authHeader.split(' ')[1];

    if (token !== process.env.TRESCON_API_KEY) {
        return false;
    }

    return true;
}
