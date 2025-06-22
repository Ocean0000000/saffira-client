import { fail } from '@sveltejs/kit';

export function validateCredentials(email: string, password: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!email || !password) {
		return { error: 'Email and password are required.' };
	}
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
}
