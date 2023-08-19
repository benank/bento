import { dev } from '$app/environment';
import { PASSCODE } from '$env/static/private';
import { error, type Handle } from '@sveltejs/kit';

// This handles requests to all routes
export const handle: Handle = async ({ event, resolve }) => {
    // No authentication needed for dev mode
    if (dev) {
        event.locals.authenticated = true;
        return await resolve(event);
    }

    // Login route is not protected with auth
    if (event.url.pathname === '/login') {
        return await resolve(event);
    }

    const passcode = event.cookies.get('passcode');

    if (passcode === PASSCODE) {
        event.locals.authenticated = true;
        return await resolve(event);
    } else if (event.url.pathname === '/') {
        // Redirect to login page if on base page without auth
        return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
    }

    // Throw unauthorized error for all other pages, including api
    throw error(401);
};