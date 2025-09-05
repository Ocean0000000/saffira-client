<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageProps } from './$types';
	import { confirmSignUpWithEmail } from '$lib/auth';
	import { goto } from '$app/navigation';

    let { data }: PageProps = $props();

    onMount(async () => {
        const url = new URL(window.location.href);
        const username = url.searchParams.get('username');
        const code = url.searchParams.get('code');

        if (!username || !code) return;

        const confirmSignUp = await confirmSignUpWithEmail(username, code);

        if (confirmSignUp.isSignUpComplete) {
            goto('/login');
        } else {
            goto('/callback');
        }
    })
</script>
