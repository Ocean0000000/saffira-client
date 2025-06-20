import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp, resendSignUpCode, signIn, signInWithRedirect, signOut } from 'aws-amplify/auth';

export function configureAuth() {
	try {
		Amplify.configure({
			Auth: {
				Cognito: {
					userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
					userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
					loginWith: {
						oauth: {
							domain: import.meta.env.VITE_COGNITO_DOMAIN,
							scopes: ['email', 'openid', 'profile'],
							redirectSignIn: import.meta.env.VITE_COGNITO_REDIRECT_SIGN_IN,
							redirectSignOut: import.meta.env.VITE_COGNITO_REDIRECT_SIGN_OUT,
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
	} catch (error) {
		console.error('Error configuring Amplify Auth:', error);
		throw error;
	}
}

export async function signUpWithEmail(email: string, password: string, options?: { userAttributes?: Record<string, string>}) {
	try {
		await signUp({
			username: email,
			password,
			options: {
				userAttributes: {
					email: email,
					...options?.userAttributes
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
		await confirmSignUp({
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
		await signIn({
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
		await signOut();
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
}