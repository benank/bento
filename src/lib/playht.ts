
import { PLAYHT_API_KEY, PLAYHT_USER_ID, PLAYHT_VOICE_ID } from '$env/static/private';

// https://docs.play.ht/reference/api-generate-audio
interface PlayHTTTSBodyParams {
    text: string;
    voice: string;
    quality?: 'draft' | 'low' | 'medium' | 'high' | 'premium';
    output_format?: 'mp3' | 'ogg' | 'flac' | 'wav' | 'mulaw';
    speed?: number;
    sample_rate?: number;
    seed?: number | null;
    temperature?: number | null;
}

const defaultBody: PlayHTTTSBodyParams = {
    text: '',
    voice: PLAYHT_VOICE_ID,
    quality: 'medium',
    output_format: 'mp3',
    sample_rate: 24000
};

export const getClonedVoices = async () => {
    return await fetch(
        'https://play.ht/api/v2/cloned-voices',
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                ...getPlayHTAuthHeaders()
            }
        }
    );
};

export const getStreamingTTS = async (params: Partial<PlayHTTTSBodyParams>): Promise<Response> => {
    return await fetch(
        'https://play.ht/api/v2/tts',
        {
            method: 'POST',
            body: JSON.stringify({
                ...defaultBody,
                ...params
            }),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                ...getPlayHTAuthHeaders()
            }
        }
    );
};

export const getPlayHTAuthHeaders = () => {
    return {
        'Authorization': `Bearer ${PLAYHT_API_KEY}`,
        'X-USER-ID': PLAYHT_USER_ID
    };
};