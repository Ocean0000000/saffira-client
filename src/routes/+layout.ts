import { browser } from '$app/environment';
import { configureAuth } from '$lib/auth';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    if (!browser) return;

    await configureAuth();
    
    return {};
}) satisfies LayoutLoad;