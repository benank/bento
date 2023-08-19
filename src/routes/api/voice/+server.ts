import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { error, text } from '@sveltejs/kit';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export const config = {
    runtime: 'edge'
};

export async function POST({ request, locals }) {
    if (!locals.authenticated) {
        throw error(401);
    }
    
    const blob = await request.blob();
    const audioFile = new File([blob], "input.wav", { type: "audio/wav" });

    try {
        // https://platform.openai.com/docs/api-reference/audio/createTranscription
        const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-1',
            response_format: 'text',
            language: 'en'
            // Can continue audio from another file using prompt
        });

        console.log(`Transcription: ${transcription}`);
        return text(`${transcription}`);

    } catch (err) {
        console.error(err);
        throw error(500);
    }

}