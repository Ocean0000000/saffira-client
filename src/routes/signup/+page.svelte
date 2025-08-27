<script lang="ts">
	import GoogleLogo from 'virtual:icons/logos/google-icon';
	import MicrosoftLogo from 'virtual:icons/logos/microsoft-icon';
	import { signInWithGoogle, signInWithMicrosoft, signUpWithEmail } from '$lib/auth';
	import type { PageProps } from './$types';
	import type { MouseEventHandler } from 'svelte/elements';
	import { validateCredentials } from '$lib/utils';

	let { data }: PageProps = $props();

	let firstName: string = $state('');
	let lastName: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let error: string | null = $state(null);
	let sentConfirmationLink: boolean = $state(false);

	const handleSignUpWithEmail: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		if (!firstName || !lastName) {
			error = 'First name and last name are required.';
		}
		if (typeof firstName !== 'string' || typeof lastName !== 'string') {
			error = 'First name and last name must be strings.';
		}
		error = validateCredentials(email, password);

		if (error) {
			return;
		}

		const result = await signUpWithEmail(email, password, {
			given_name: firstName,
			family_name: lastName,
		});

		sentConfirmationLink = true;
		firstName = '';
		lastName = '';
		email = '';
		password = '';
	};
</script>

<section class="bg-saffira flex min-h-screen items-center justify-center">
	<section class="flex flex-col items-center justify-center gap-2">
		<img class="logo" src="/logo.png" alt="logo" width={480} />
		<form class="flex w-full flex-col items-center justify-center">
			<fieldset class="flex w-full flex-col gap-4 border-none">
				<div class="flex justify-between gap-4">
					<div class="flex flex-1 flex-col">
						<input
							type="text"
							class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
							id="firstName"
							name="firstName"
							placeholder="First Name"
							bind:value={firstName}
						/>
					</div>
					<div class="flex flex-1 flex-col">
						<input
							type="text"
							class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
							id="lastName"
							name="lastName"
							placeholder="Last Name"
							bind:value={lastName}
						/>
					</div>
				</div>
				<input
					type="email"
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					id="email"
					name="email"
					placeholder="Email"
					autocomplete="email"
					bind:value={email}
				/>
				<input
					type="password"
					class="h-10 w-full rounded-lg border-none bg-slate-50 px-4 text-sm placeholder-neutral-700 focus:outline-none"
					id="password"
					name="password"
					placeholder="Password"
					autocomplete="new-password"
					bind:value={password}
				/>
				<button
					type="submit"
					class="disabled:bg-saffira-disabled mt-3 w-full cursor-pointer rounded border-none bg-cyan-400 px-4 py-2 text-slate-50 disabled:cursor-default"
					disabled={!firstName || !lastName || !email || !password}
					onclick={handleSignUpWithEmail}
				>
					Sign Up
				</button>
				{#if error}
					<p class="mt-2 text-sm text-red-600">{error}</p>
				{/if}
				{#if sentConfirmationLink}
					<p class="mt-2 text-sm text-green-600">
						A confirmation link has been sent to your email. Please check your inbox.
					</p>
				{/if}
			</fieldset>
		</form>
		<div class="my-4 w-full rounded-full border-t-2 border-neutral-700/20"></div>
		<section class="flex w-full justify-around gap-4">
			<button
				type="button"
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
				onclick={signInWithGoogle}
			>
				<GoogleLogo class="text-lg" />
				Sign up with Google
			</button>
			<button
				type="button"
				class="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded border-none bg-slate-50 text-neutral-700"
				onclick={signInWithMicrosoft}
			>
				<MicrosoftLogo class="text-lg" />
				Sign up with Microsoft
			</button>
		</section>
		<div class="mt-2 flex gap-2 text-sm font-semibold text-cyan-600">
			<p>Already a user?</p>
			<a class="cursor-pointer underline" href="/login">Login</a>
		</div>
	</section>
</section>
