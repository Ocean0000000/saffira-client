<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/auth';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const handleLogout = async () => {
		await logout();
		goto('/');
	};
</script>

<button class="btn btn-primary cursor-pointer" onclick={handleLogout}>Logout</button>
