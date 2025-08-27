<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';
	import { goto } from '$app/navigation';
	import { getCurrentAuthenticatedUser } from '$lib/auth';

	let { data, children }: LayoutProps = $props();

	onMount(async () => {
		const user = await getCurrentAuthenticatedUser();
        console.log({ user });
		if (!user) {
			goto('/login');
		}
	});
</script>

{@render children()}