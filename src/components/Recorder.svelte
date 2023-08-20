<script lang="ts">
	import { Mic } from 'lucide-svelte';
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

	const toggleRecording = () => {
		isRecording ? stopRecording() : startRecording();
	};

	const startRecording = () => {
		if (mediaRecorder) {
			audioChunks = []; // Clear any existing chunks
			mediaRecorder.start();
			isRecording = true;
		}
	};

	const stopRecording = async () => {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			isRecording = false;

			audioChunks = [];
		}
	};
</script>

<button class:active={isRecording} on:click={toggleRecording}>
	<Mic size="40px" />
</button>

<style lang="less">
	button {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
		height: 75px;
		width: 75px;
		display: grid;
		margin: 20px auto 0 auto;
		place-content: center;
		background-color: white;
		border-radius: 50%;
		border: none;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.15);

		&.active {
			background-color: #45dfc7;
			color: white;
		}

		transition: 0.1s ease-in-out all;
	}
</style>
