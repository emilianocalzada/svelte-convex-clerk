<script lang="ts">
	import type { LayoutData } from './$types';
	import { useClerkContext } from 'svelte-clerk';
	import { type Snippet } from 'svelte';
	import { useConvexClient } from 'convex-svelte';

	// Do not destructure context or you'll lose reactivity!
	const convexClient = useConvexClient();
	const ctx = useClerkContext();
	const session = $derived(ctx.session);

	async function getAuthToken() {
		const token = await session?.getToken({ template: 'convex' });
		console.log('token: ', token);
		return token;
	}

	$effect(() => {
		if (session) {
			convexClient.setAuth(getAuthToken);
		}
	});
	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

{@render children()}
