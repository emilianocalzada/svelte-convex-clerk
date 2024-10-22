<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { convexClient } from '$lib/convexClient';

	// This doesn't work since I'm not using the convexClient instance, which has the auth function set
	const query = useQuery(api.tasks.get, {});
	// user: null

	// This works since I'm using the convexClient instance, which has the auth function set
	convexClient.query(api.tasks.get, {}).then((tasks) => console.log(tasks));
	// user: { id: '...', email: '...', ... }
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<ul>
		{#each query.data as task}
			<li>
				{task.isCompleted ? '☑' : '☐'}
				<span>{task.text}</span>
				<span>assigned by {task.assigner}</span>
			</li>
		{/each}
	</ul>
{/if}
