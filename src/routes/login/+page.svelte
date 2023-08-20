<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	const input = writable<string>('');

	const onSubmit = async () => {
		if ($input.length === 0) {
			return;
		}

		const res = await fetch('/login', {
			method: 'POST',
			body: $input
		});

		if (res.ok) {
			window.location.href = '/';
		}
	};
</script>

<main>
	<h1>Please login to access Bento</h1>
	<form on:submit={onSubmit}>
		<input bind:value={$input} placeholder="Passcode" />
		<button type="submit">
			<ArrowRight />
		</button>
	</form>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-content: center;
		text-align: center;
		gap: 20px;
	}

	h1 {
		font-size: 30px;
		font-weight: bold;
	}

	form {
		display: flex;
		gap: 6px;
	}

	input,
	button {
		font-size: 24px;
		font-weight: 500;
	}

	button {
		display: grid;
		place-content: center;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: white;
		border: none;
		cursor: pointer;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15), 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
	}
</style>
