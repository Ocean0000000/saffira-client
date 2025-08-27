import { browser } from '$app/environment';
import { Amplify } from 'aws-amplify';
import {
	signUp,
	confirmSignUp,
	resendSignUpCode,
	signIn,
	signInWithRedirect,
	signOut,
	getCurrentUser,
	fetchAuthSession,
	type UserAttributeKey
} from 'aws-amplify/auth';

let configured = false;

export async function configureAuth() {
	try {
		if (configured || !browser) return;
		Amplify.configure({
			Auth: {
				Cognito: {
					userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
					userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
					loginWith: {
						oauth: {
							domain: import.meta.env.VITE_COGNITO_DOMAIN,
							scopes: ['email', 'openid', 'profile'],
							redirectSignIn: [import.meta.env.VITE_DEPLOYMENT_URL + '/callback'],
							redirectSignOut: [import.meta.env.VITE_DEPLOYMENT_URL + '/login'],
							responseType: 'code'
						}
					},
					signUpVerificationMethod: 'code',
					userAttributes: {
						email: {
							required: true
						}
					}
				}
			}
		});
		configured = true;
	} catch (error) {
		console.error('Error configuring Amplify Auth:', error);
		throw error;
	}
}

export async function signUpWithEmail(
	email: string,
	password: string,
	options?: Partial<Record<UserAttributeKey, string>>
) {
	try {
		return await signUp({
			username: email,
			password,
			options: {
				userAttributes: {
					email,
					...options
				}
			}
		});
	} catch (error) {
		console.error('Error signing up with email:', error);
		throw error;
	}
}

export async function confirmSignUpWithEmail(email: string, code: string) {
	try {
		return await confirmSignUp({
			username: email,
			confirmationCode: code
		});
	} catch (error) {
		console.error('Error confirming sign up:', error);
		throw error;
	}
}

export async function resendConfirmationCode(email: string) {
	return resendSignUpCode({ username: email });
}

export async function signInWithEmail(email: string, password: string) {
	try {
		return await signIn({
			username: email,
			password
		});
	} catch (error) {
		console.error('Error signing in with email:', error);
		throw error;
	}
}

export async function signInWithGoogle() {
	try {
		return await signInWithRedirect({ provider: 'Google' });
	} catch (error) {
		console.error('Google sign-in error:', error);
		throw error;
	}
}

export async function signInWithMicrosoft() {
	try {
		return await signInWithRedirect({ provider: { custom: 'Microsoft' } });
	} catch (error) {
		console.error('Microsoft sign-in error:', error);
		throw error;
	}
}

export async function logout() {
	try {
		return await signOut();
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
}

export async function getCurrentAuthenticatedUser() {
	try {
		const session = await fetchAuthSession();
		console.log({ session });
		if (session.tokens?.accessToken) {
			return await getCurrentUser();
		}
	} catch (error) {
		console.error('Error getting current authenticated user:', error);
		return error;
	}
}
