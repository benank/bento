import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export const config = {
    runtime: 'edge'
};

export async function POST({ request, cookies }) {
    const passcode = await request.text();

    if (passcode !== env.PASSCODE) {
        throw error(401);
    }

    cookies.set('passcode', passcode);
    return new Response();
}