<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}
