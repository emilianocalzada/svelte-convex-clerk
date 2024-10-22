<script lang="ts">
	import '../app.css';
	import { onMount, type Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import Header from '../components/Header.svelte';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import type { LayoutData } from './$types';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ClerkProvider {...data} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<Header></Header>
	<main class="container mx-auto">
		<div class="flex min-h-screen items-start justify-center">
			<div class="mt-20">{@render children()}</div>
		</div>
	</main>
</ClerkProvider>
