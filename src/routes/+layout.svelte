<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import { configureAuth } from '$lib/auth';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	
	configureAuth();
</script>

{@render children()}
