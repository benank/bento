// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authenticated: boolean;
		}
		// interface PageData {}
		interface Platform {
			env?: {
				OPENAI_API_KEY: string;
				PLAYHT_USER_ID: string;
				PLAYHT_API_KEY: string;
				PLAYHT_VOICE_ID: string;
				PASSCODE: string;
			}
		}
	}
}

export {};
