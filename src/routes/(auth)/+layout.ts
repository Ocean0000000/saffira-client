import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, parent }) => {
	if (!browser) {
		return {};
	}

	const { user } = await parent();
	
	if (!user) {
		throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
	}
	
	return {};
};
