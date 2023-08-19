import { error, text } from '@sveltejs/kit';
import { getPlayHTAuthHeaders, getStreamingTTS } from '$lib/playht.js';
import { wait } from '$lib/wait.js';

export const config = {
    runtime: 'edge'
};

export async function POST({ request, locals }) {
    if (!locals.authenticated) {
        throw error(401);
    }
    
    const textToTTS = await request.text();

    try {
        const audioStream = await getStreamingTTS({
            text: textToTTS,
            speed: 1.2
        });

        console.log(audioStream.ok);
        if (!audioStream.ok) {
            console.log(audioStream.status);
            console.log(audioStream.statusText);
        }

        const jobInfo = await audioStream.json();
        let output = jobInfo.output;

        await wait(3000);

        while (!output) {
            await wait(500);
            const res = await fetch(`https://play.ht/api/v2/tts/${jobInfo.id}`, {
                method: 'GET',
                headers: {
                    accept: 'accept: application/json',
                    ...getPlayHTAuthHeaders()
                }
            });
            const updatedJobInfo = await res.json();
            output = updatedJobInfo.output;
        }

        return text(output.url);
    } catch (err) {
        console.error(err);
        throw error(500);
    }

}