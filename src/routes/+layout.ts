import { browser } from '$app/environment';
import { configureAuth, getCurrentAuthenticatedUser } from '$lib/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    if (!browser) {
        return { user: null };
    }
    
    try {
        configureAuth();
        
        const user = await getCurrentAuthenticatedUser();
        
        return { user };
    } catch (error) {
        return { user: null, error };
    }
};