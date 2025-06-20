import { signUpWithEmail } from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const password = formData.get('password') as string;

		if (!emailRegex.test(email)) {
			return { error: 'Invalid email address format.' };
		} else if (
			password.length < 8 ||
			!/[A-Z]/.test(password) ||
			!/[a-z]/.test(password) ||
			!/\d/.test(password)
		) {
			fail(400, {
				error:
					'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
			});
		}

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
