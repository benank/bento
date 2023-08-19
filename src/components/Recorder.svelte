<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let onRecorderStop = (file: File) => {};

	let mediaRecorder: MediaRecorder | null = null;
	let audioChunks: Blob[] = [];
	let isRecording = false;

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				mediaRecorder = new MediaRecorder(stream);

				mediaRecorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						audioChunks.push(event.data);
					}
				};

				mediaRecorder.onstop = async () => {
					const audioBlob = new Blob(audioChunks);
					const file = new File([audioBlob], 'input.wav', { type: 'audio/wav' });

					onRecorderStop(file);
					audioChunks = [];
				};
			})
			.catch((error) => {
				console.error('Error accessing microphone:', error);
			});
	});

	onDestroy(() => {
		if (mediaRecorder) {
			mediaRecorder.stop();
		}
	});

	function startRecording() {
		if (mediaRecorder) {
			audioChunks = []; // Clear any existing chunks
			mediaRecorder.start();
			isRecording = true;
		}
	}

	async function stopRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			isRecording = false;

			audioChunks = [];
		}
	}
</script>

<main>
	{#if !isRecording}
		<button on:click={startRecording}>Start Recording</button>
	{:else}
		<button on:click={stopRecording}>Stop Recording</button>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 2rem;
	}
</style>
