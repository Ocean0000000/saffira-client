import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { confirmSignUpWithEmail } from '$lib/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData: FormData = await request.formData();
		const email: string | undefined = cookies.get('pending_email');
		const digits: string[] = [];

		if (!email) {
			return fail(400, {
				error: 'Email is required for confirmation.'
			});
		}

		for (let i = 0; i < 6; i++) {
			const digit = formData.get(`code-${i}`) as string;
			if (digit) {
				digits.push(digit);
			} else {
				return fail(400, {
					error: `Must provide all 6 digits of the confirmation code.`
				});
			}
		}

		const code: string = digits.join('');

		await confirmSignUpWithEmail(email, code);
		throw redirect(303, '/classes');
	}
} satisfies Actions;

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
