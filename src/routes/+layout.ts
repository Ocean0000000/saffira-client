import { configureAuth } from '$lib/auth';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    await configureAuth();
    return {};
}) satisfies LayoutLoad;