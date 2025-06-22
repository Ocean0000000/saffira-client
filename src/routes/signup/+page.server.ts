import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { signUpWithEmail } from '$lib/auth';
import { validateCredentials } from '$lib/utils';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!firstName || !lastName) {
			return fail(400, {
				error: 'First name and last name are required.'
			});
		}

		validateCredentials(email, password);

		await signUpWithEmail(email, password, {
			userAttributes: {
				given_name: firstName,
				family_name: lastName
			}
		});

		cookies.set('pending_email', email, {
			path: '/',
			maxAge: 60 * 60 * 24,
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

		throw redirect(303, '/confirm');
	}
};

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
