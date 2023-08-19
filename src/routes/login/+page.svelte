<script lang="ts">
	import { writable } from 'svelte/store';

	const input = writable<string>('');

	const onSubmit = async () => {
		if ($input.length === 0) {
			return;
		}

		console.log($input);
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
	Please login
	<form on:submit={onSubmit}>
		<input bind:value={$input} />
		<button type="submit" placeholder="Passcode">Login</button>
	</form>
</main>
