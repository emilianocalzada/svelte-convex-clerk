<script lang="ts">
	import { onMount } from 'svelte';
	import ConvexProviderWithAuth from './ConvexProviderWithAuth.svelte';

	export let client;

	let isLoaded = false;
	let isSignedIn = false;
	let getToken;

	onMount(async () => {
		const { user, session } = await clerk.load();
		isLoaded = true;
		isSignedIn = !!user && !!session;
		getToken = session?.getToken;
	});

	async function fetchAccessToken({ forceRefreshToken }) {
		try {
			if (getToken) {
				return await getToken({
					template: 'convex',
					skipCache: forceRefreshToken
				});
			} else {
				return null;
			}
		} catch {
			return null;
		}
	}

	function useAuthFromClerk() {
		return {
			isLoading: !isLoaded,
			isAuthenticated: isSignedIn,
			fetchAccessToken
		};
	}
</script>

<ConvexProviderWithAuth {client} useAuth={useAuthFromClerk}>
	<slot />
</ConvexProviderWithAuth>
