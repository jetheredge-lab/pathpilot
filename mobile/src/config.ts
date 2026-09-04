import Constants from 'expo-constants';

// The mobile app always talks to the deployed backend over HTTPS. Override in
// development by setting EXPO_PUBLIC_API_BASE_URL (e.g. a LAN IP) if you run the
// server locally.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Constants.expoConfig?.extra?.apiBaseUrl as string | undefined) ??
  'https://roundsahead.com/api';
