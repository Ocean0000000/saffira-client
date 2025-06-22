<script lang="ts">
	import type { PageProps } from './$types';
	import GoogleLogo from 'virtual:icons/logos/google-icon';
	import MicrosoftLogo from 'virtual:icons/logos/microsoft-icon';
	import { signInWithEmail, signInWithGoogle, signInWithMicrosoft } from '$lib/auth';
	import { enhance } from '$app/forms';

	let email = $state('');
	let password = $state('');

	let { data }: PageProps = $props();
</script>

<section class="bg-saffira flex min-h-screen items-center justify-center">
	<section class="flex flex-col items-center justify-center gap-4">
		<img class="logo" src="/logo.png" alt="logo" width={480} />
		<form method="POST" class="flex w-full flex-col items-center justify-center" use:enhance>
			<fieldset class="flex w-full flex-col gap-4 border-none">
				<input
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					type="text"
					id="email"
					name="email"
					placeholder="Email"
					autocomplete="email"
					bind:value={email}
				/>
				<input
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					autocomplete="current-password"
					bind:value={password}
				/>
				<div class="flex w-full items-center justify-between">
					<a
						href="/forgot-password"
						class="cursor-pointer pl-2 text-sm font-semibold text-cyan-600 underline"
					>
						Forgot password?
					</a>
					<button
						type="submit"
						class="w-32 cursor-pointer rounded border-none bg-cyan-400 px-4 py-2 text-slate-50"
						onclick={() => signInWithEmail(email, password)}
						disabled={!email || !password}
					>
						Login
					</button>
				</div>
			</fieldset>
		</form>
		<div class="my-4 w-full rounded-full border-t-2 border-neutral-700/20"></div>
		<section class="flex w-full justify-around gap-4">
			<button
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
				onclick={signInWithGoogle}
			>
				<GoogleLogo class="text-lg" />
				Sign in with Google
			</button>
			<button
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
				onclick={signInWithMicrosoft}
			>
				<MicrosoftLogo class="text-lg" />
				Sign in with Microsoft
			</button>
		</section>
		<div class="flex gap-2 text-sm font-semibold text-cyan-600">
			<p>Still not a user?</p>
			<a class="cursor-pointer underline" href="/signup">Sign Up</a>
		</div>
	</section>
</section>
