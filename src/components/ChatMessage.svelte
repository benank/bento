<script lang="ts">
	import type { ChatMessageType } from '$lib/models';
	import { User2 } from 'lucide-svelte';

	export let type: ChatMessageType;
	export let content: string;
</script>

<div class={`container ${type}`}>
	<div class="icon">
		{#if type === 'incoming'}
			<img src="favicon.jpg" alt="Bento icon" />
		{:else}
			<div class="person-icon">
				<User2 />
			</div>
		{/if}
	</div>
	<div class="message">{content}</div>
</div>

<style lang="less">
	div.container {
		display: flex;
		flex-direction: row;
		font-size: 32px;
		gap: 8px;
		font-weight: 600;
		--bubble-color: #c9eae3;
		line-height: 1.1;

		&.outgoing {
			flex-direction: row-reverse;
			font-weight: 500;
			--bubble-color: #e9e9e9;
		}
	}

	img {
		width: 1.25em;
		height: auto;
		border-radius: 8px;
	}

	div.person-icon {
		width: 1.25em;
		aspect-ratio: 1;
		border-radius: 8px;
		display: grid;
		place-content: center;
		background-color: var(--bubble-color);
	}

	div.message {
		border-radius: 8px;
		background-color: var(--bubble-color);
		max-width: 75%;
		word-wrap: break-word;
		padding: 0.5em;
	}
</style>
