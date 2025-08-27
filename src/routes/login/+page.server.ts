import { validateCredentials } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const actions = {
	default: async ({ request }) => {
		const formData: FormData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		validateCredentials(email, password);
		return {
			success: true
		};
	}
};

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
