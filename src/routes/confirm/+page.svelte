<script lang="ts">
	import { resendConfirmationCode } from '$lib/auth';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: PageProps = $props();
	let code: string[] = $state(['', '', '', '', '', '']);
	let inputRefs: HTMLInputElement[] = $state([]);
    let email: string = $state(data.email);

	const handleCodeInput = (index: number) => {
		if (index < code.length - 1 && code[index].length === 1) {
			inputRefs[index + 1].focus();
		}
	};

	const handleCodeKeyDown = (event: KeyboardEvent, index: number) => {
		switch (event.key) {
			case 'ArrowLeft':
				if (index > 0) {
					inputRefs[index - 1].focus();
				}
				break;
			case 'ArrowRight':
				if (index < code.length - 1) {
					inputRefs[index + 1].focus();
				}
				break;
			case 'Backspace':
				if (code[index].length === 0 && index > 0) {
					code[index] = '';
					inputRefs[index - 1].focus();
				} else {
					code[index] = '';
				}
				break;
			case 'Delete':
				if (index > 0) {
					code[index] = '';
					inputRefs[index - 1].focus();
				}
				break;
			case 'Tab':
				event.preventDefault();
				if (event.shiftKey && index > 0) {
					inputRefs[index - 1].focus();
				} else if (index < code.length - 1) {
					inputRefs[index + 1].focus();
				}
				break;
			default:
				if (event.key.match(/[0-9]/) && code[index].length === 1) {
					code[index] = event.key;
					if (index < code.length - 1) {
						inputRefs[index + 1].focus();
					}
				}
				break;
		}
	};
</script>

<section class="bg-saffira flex flex-col min-h-screen items-center justify-center gap-4">
    <img src="/logo.png" alt="logo" width="480" />
	<form
		method="post"
		id="confirm-signup"
		class="flex w-full max-w-md flex-col items-center justify-center gap-4"
		use:enhance
	>
		<h1 class="text-2xl font-bold">Confirm Sign Up</h1>
		<p>Enter the verification code sent to your email.</p>
		<fieldset class="flex gap-2">
			{#each code as _, index}
				<input
					type="text"
					name={`code-${index}`}
					class="w-10 rounded border px-3 py-2 text-center text-2xl font-bold [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					maxlength="1"
					pattern="[0-9]"
					bind:this={inputRefs[index]}
					bind:value={code[index]}
					oninput={() => handleCodeInput(index)}
					onkeydown={(e) => handleCodeKeyDown(e, index)}
				/>
			{/each}
		</fieldset>
	</form>
	<button
		type="submit"
		form="confirm-signup"
		class="disabled:bg-saffira-disabled mt-3 w-sm max-w-[80vw] cursor-pointer rounded border-none bg-cyan-400 px-4 py-2 text-slate-50"
	>
		Verify
	</button>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
    <button class="underline cursor-pointer" onclick={() => resendConfirmationCode(email)}>Resend</button>
</section>
