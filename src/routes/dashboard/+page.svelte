<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { useConvexClient } from 'convex-svelte';

	const query = useQuery(api.tasks.get, {});

	const convex = useConvexClient();
	async function addTask(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const text = formData.get('text') as string;
		const isCompleted = formData.get('isCompleted') === 'on';
		await convex.mutation(api.tasks.create, { text, isCompleted });
	}
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<form on:submit={addTask}>
		<input type="text" name="text" placeholder="Task text" />
		<input type="checkbox" name="isCompleted" />
		<button type="submit">Add</button>
	</form>
	<ul>
		{#each query.data as task}
			<li>
				{task.isCompleted ? '☑' : '☐'}
				<span>{task.text}</span>
			</li>
		{/each}
	</ul>
{/if}
