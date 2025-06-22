import { validateCredentials } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signInWithEmail } from '$lib/auth';

export const actions = {
    default: async ({ request }) => {
        const formData: FormData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        validateCredentials(email, password);
        await signInWithEmail(email, password);
        redirect(303, '/classes');
    }
}

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;