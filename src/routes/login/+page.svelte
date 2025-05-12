<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
    import GoogleLogo from 'virtual:icons/logos/google-icon';
    import MicrosoftLogo from 'virtual:icons/logos/microsoft-icon';

	let isAuthenticated = $state(false);
	let email = $state('');
	let password = $state('');

	const handleLogin = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (email === 'test' && password === 'saffira.ai') {
			isAuthenticated = true;
			console.log({ email, password, isAuthenticated });
			goto('/classes');
		}
	};

	let { data }: PageProps = $props();
</script>

<section class="bg-saffira flex min-h-screen items-center justify-center">
	<section class="flex w-96 flex-col items-center justify-center gap-4">
		<img class="logo" src="/logo.png" alt="logo" width={400} />
		<form class="flex w-full flex-col items-center justify-center">
			<fieldset class="flex w-full flex-col gap-4 border-none">
				<input
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					type="text"
					id="email"
					placeholder="Email"
					bind:value={email}
				/>
				<input
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					type="password"
					id="password"
					placeholder="Password"
					bind:value={password}
				/>
				<div class="flex w-full items-center justify-between">
					<a href="/forgot-password" class="cursor-pointer pl-2 text-sm font-semibold text-cyan-600 underline">
						Forgot password?
                    </a>
					<button
						class="w-32 cursor-pointer rounded border-none bg-cyan-400 px-4 py-2 text-slate-50"
						onclick={handleLogin}>Login</button
					>
				</div>
			</fieldset>
		</form>
		<div class="my-4 w-full rounded-full border-t-2 border-neutral-700/20"></div>
		<section class="flex w-full justify-around gap-4">
			<button
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
			>
                <GoogleLogo class="text-lg" />
				<a class="text-xs">Sign in with Google</a>
			</button>
			<button
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
			>
				<MicrosoftLogo class="text-lg" />
				<a class="text-xs">Sign in with Microsoft</a>
			</button>
		</section>
		<div class="flex gap-2 text-sm font-semibold text-cyan-600">
			<p>Still not a user?</p>
			<p class="cursor-pointer underline">Sign Up</p>
		</div>
	</section>
</section>
