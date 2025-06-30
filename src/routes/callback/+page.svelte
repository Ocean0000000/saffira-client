<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="text-center">
		<div class="border-saffira mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
		<p class="text-lg font-semibold">Completing sign in...</p>
	</div>
</div>
