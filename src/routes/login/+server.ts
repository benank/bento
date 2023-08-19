import { PASSCODE } from "$env/static/private";
import { error } from "@sveltejs/kit";

export const config = {
    runtime: 'edge'
};

export async function POST({ request, cookies }) {
    const passcode = await request.text();

    if (passcode !== PASSCODE) {
        throw error(401);
    }

    cookies.set('passcode', passcode);
    return new Response();
}