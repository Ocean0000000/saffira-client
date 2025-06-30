import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const redirectTo = url.searchParams.get('redirectTo');
    
    if (redirectTo) {
        throw redirect(302, redirectTo);
    }
    
    throw redirect(302, '/classes');
};