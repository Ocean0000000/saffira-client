<script lang="ts">
	import { logout } from '$lib/auth';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const handleLogout = async () => await logout();
</script>

<button class="btn btn-primary" onclick={handleLogout}>Logout</button>
