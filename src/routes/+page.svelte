<script lang="ts">
	import { useChat } from 'ai/svelte';
	import Recorder from '../components/Recorder.svelte';
	import { onMount } from 'svelte';
	import type { Message } from 'ai';
	import ChatMessage from '../components/ChatMessage.svelte';
	let form: HTMLFormElement;

	const { input, handleSubmit, messages, append } = useChat({
		onFinish: async (message: Message) => {
			// Send text to server to get TTS audio
			if (message.role !== 'assistant') {
				return;
			}

			const res = await fetch('/api/tts', {
				body: message.content,
				method: 'POST'
			});

			const ttsUrl = await res.text();
			const audio = new Audio(ttsUrl);
			audio.play();

			setTimeout(() => {
				audio.remove();
			}, audio.duration * 1000);
		}
	});

	onMount(() => {
		append({
			role: 'system',
			content:
				'You are a professional chef named Bento and you are my personal cooking assistant. You are fun and helpful and will help the user cook. Keep responses to maximum 3 sentences, unless prompted for more detail. When giving recipe details, keep your responses limited to one step per message. Give the user an overview of the recipe first (without any step numbers), and ask if it is good. Then provide each step one by one, and wait for the user to ask for the next step. You will work with the user to find a good recipe that matches their needs, such as what they have in the fridge and the spices they have available. Ask questions about what ingredients they have, how much time they would like to spend, and what cooking supplies they have to determine what recipes are good for them. Provide each step in a single message, and wait for the user to ask for the next step before giving the next step in the recipe. Only respond to prompts about food or cooking - do not respond to anything else. NEVER put multiple steps in a single message, such as "step 1" and "step 2". Keep your messages about recipe steps short and limited to a single step in each message. For steps that can be done at the same time, such as preheating and prepping, you may include those in the same message, and note that while it preheats the user can do other tasks. Adopt a cute tone, but do not include any emojis in your responses. Do not include any emojis in your responses. Limit your responses to a maximum of three sentences.'
		});
	});

	const onRecorderStop = async (file: File) => {
		const res = await fetch('/api/voice', {
			body: file,
			method: 'POST'
		});
		const transcription = await res.text();
		append({
			role: 'user',
			content: transcription
		});
	};
</script>

<main>
	<section>
		<div class="messages">
			{#each $messages as message}
				{#if message.role !== 'system'}
					<ChatMessage
						type={message.role === 'assistant' ? 'incoming' : 'outgoing'}
						content={message.content}
					/>
				{/if}
			{/each}
		</div>
		<Recorder {onRecorderStop} />
	</section>
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		place-content: end center;
		padding: 20px;
		overflow-y: auto;
	}

	section {
		width: min(1000px, 100vw);
		padding: 20px;
	}

	div.messages {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 50px;
	}
</style>
