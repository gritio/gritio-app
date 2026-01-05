import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client | null = null;
const IS_DEV_MODE = import.meta.env.VITE_USE_MOCK_TOKEN === 'true';

export const getAuth0Client = async (): Promise<Auth0Client | null> => {
  // Skip Auth0 initialization in dev mode with mock tokens
  if (IS_DEV_MODE) {
    return null;
  }

  if (auth0Client) {
    return auth0Client;
  }

  try {
    auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN || 'your-domain.auth0.com',
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-client-id',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE || 'household-tracker-api',
      },
    });
  } catch (error) {
    console.error('Failed to initialize Auth0:', error);
  }

  return auth0Client;
};

export const login = async () => {
  if (IS_DEV_MODE) {
    console.log('Using mock token in development mode');
    return;
  }

  const client = await getAuth0Client();
  if (client) {
    await client.loginWithPopup();
    const token = await client.getIdTokenClaims();
    localStorage.setItem('authToken', token?.__raw || '');
  }
};

export const logout = async () => {
  if (IS_DEV_MODE) {
    localStorage.removeItem('authToken');
    return;
  }

  const client = await getAuth0Client();
  if (client) {
    await client.logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('authToken');
  }
};

export const getToken = async (): Promise<string | null> => {
  // In development, we don't need a real token
  if (IS_DEV_MODE) {
    return 'dev-token';
  }

  try {
    const client = await getAuth0Client();
    if (client && typeof client.getAccessToken === 'function') {
      const token = await client.getAccessToken();
      if (token) {
        localStorage.setItem('authToken', token);
        return token;
      }
    }
  } catch (error) {
    console.error('Failed to get token:', error);
  }
  return localStorage.getItem('authToken');
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const client = await getAuth0Client();
    return await client.isAuthenticated();
  } catch (error) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const client = await getAuth0Client();
    return await client.getUser();
  } catch (error) {
    return null;
  }
};
