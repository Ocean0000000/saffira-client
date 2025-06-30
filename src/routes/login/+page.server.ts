import { validateCredentials } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { signInWithEmail } from '$lib/auth';

export const actions: Actions = {
    default: async ({ request, url }) => {
        const formData: FormData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        validateCredentials(email, password);
        
        try {
            await signInWithEmail(email, password);
            const redirectTo = url.searchParams.get('redirectTo') || '/classes';
            redirect(303, redirectTo);
        } catch (error) {
            console.error('Login error:', error);
            return {
                error: 'Invalid email or password',
                email
            };
        }
    }
}

export const load: PageServerLoad = async ({ url }) => {
    const redirectTo = url.searchParams.get('redirectTo');
    return {
        redirectTo
    };
};