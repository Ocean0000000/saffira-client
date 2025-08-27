<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCurrentAuthenticatedUser } from '$lib/auth';

	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			// Wait a moment for Amplify to process the OAuth callback
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Check if user is authenticated
			const user = await getCurrentAuthenticatedUser();

			if (user) {
				// Redirect to classes page on successful authentication
				goto('/classes');
			} else {
				// Redirect back to login if authentication failed
				error = 'Authentication failed';
				setTimeout(() => goto('/login'), 2000);
			}
		} catch (err) {
			console.error('Callback error:', err);
			error = 'Authentication failed';
			setTimeout(() => goto('/login'), 2000);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div
				class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-600"
			></div>
			<p class="text-lg font-semibold">Completing sign in...</p>
		</div>
	</div>
{:else if error}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<p class="text-lg font-semibold text-red-600">{error}</p>
			<p class="mt-2 text-gray-600">Redirecting to login...</p>
		</div>
	</div>
{/if}
