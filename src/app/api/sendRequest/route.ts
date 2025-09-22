import { NextRequest, NextResponse } from 'next/server';
import { OpenRouterRequest, sendRequest } from '@/lib/openrouter';

export const POST = async (req: NextRequest) => {
    try {
        const request: OpenRouterRequest = await req.json();

        const data = await sendRequest(request);

        return NextResponse.json(data);
    } catch (error: unknown) {
        return NextResponse.json({ error: error as string });
    }
};
