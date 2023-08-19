<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>There's an error!</h1>
<h2>{$page.error?.message}</h2>
