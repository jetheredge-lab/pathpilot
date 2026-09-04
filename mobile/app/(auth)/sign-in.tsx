import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '@/auth';
import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
  googleNativeConfigured,
} from '@/config';

// Required so the OAuth popup can hand control back to the app.
WebBrowser.maybeCompleteAuthSession();

const GOOGLE_BTN_CLASS =
  'mt-3 items-center rounded-xl border border-slate-300 py-3.5 active:opacity-80';

export default function SignIn() {
  const { signIn, signUp, signInWithApple } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      if (mode === 'signin') await signIn(email.trim(), password);
      else await signUp(email.trim(), password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  const onApple = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithApple();
    } catch (e) {
      // The user tapping Cancel isn't an error worth surfacing.
      if ((e as { code?: string })?.code !== 'ERR_REQUEST_CANCELED') {
        setError(e instanceof Error ? e.message : 'Apple sign-in failed');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-12"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-bold text-ink">RoundsAhead</Text>
        <Text className="mt-2 text-base text-muted">
          {mode === 'signin'
            ? 'Sign in to your pre-health plan'
            : 'Create your account'}
        </Text>

        <View className="mt-8 gap-3">
          <TextInput
            className="rounded-xl border border-slate-300 px-4 py-3 text-base text-ink"
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="rounded-xl border border-slate-300 px-4 py-3 text-base text-ink"
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

          <Pressable
            className="mt-1 items-center rounded-xl bg-brand py-3.5 active:opacity-80"
            disabled={busy}
            onPress={submit}
          >
            {busy ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-base font-semibold text-white">
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </Text>
            )}
          </Pressable>

          <Pressable
            className="items-center py-2"
            onPress={() => {
              setError(null);
              setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
            }}
          >
            <Text className="text-sm text-brand">
              {mode === 'signin'
                ? "Don't have an account? Create one"
                : 'Already have an account? Sign in'}
            </Text>
          </Pressable>
        </View>

        <View className="my-6 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-slate-200" />
          <Text className="text-xs uppercase text-muted">or</Text>
          <View className="h-px flex-1 bg-slate-200" />
        </View>

        {Platform.OS === 'ios' ? (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={12}
            style={{ height: 48, width: '100%' }}
            onPress={onApple}
          />
        ) : null}

        {/* The Google request hook validates its client IDs eagerly, so it must
            only be mounted when Google is actually configured. */}
        {googleNativeConfigured ? (
          <GoogleButton busy={busy} setBusy={setBusy} setError={setError} />
        ) : (
          <GoogleUnavailableButton disabled={busy} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Owns the expo-auth-session Google request. Mounted only when at least one
// Google client ID is configured (see the guard in SignIn).
function GoogleButton({
  busy,
  setBusy,
  setError,
}: {
  busy: boolean;
  setBusy: (v: boolean) => void;
  setError: (v: string | null) => void;
}) {
  const { signInWithGoogleToken } = useAuth();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type !== 'success') return;
    const idToken = response.params?.id_token;
    if (!idToken) {
      setError('Google sign-in did not return a token.');
      return;
    }
    setError(null);
    setBusy(true);
    signInWithGoogleToken(idToken)
      .catch((e) => setError(e instanceof Error ? e.message : 'Google sign-in failed'))
      .finally(() => setBusy(false));
    // On success the root navigator redirects into the app.
  }, [response, signInWithGoogleToken, setBusy, setError]);

  return (
    <Pressable
      className={GOOGLE_BTN_CLASS}
      disabled={busy || !request}
      onPress={() => promptAsync()}
    >
      <Text className="text-base font-semibold text-ink">Continue with Google</Text>
    </Pressable>
  );
}

// Shown when no Google client IDs are configured — tapping explains why.
function GoogleUnavailableButton({ disabled }: { disabled: boolean }) {
  return (
    <Pressable
      className={GOOGLE_BTN_CLASS}
      disabled={disabled}
      onPress={() =>
        Alert.alert(
          'Google sign-in',
          'Google sign-in needs OAuth client IDs configured for the app. Use email + password for now.',
        )
      }
    >
      <Text className="text-base font-semibold text-ink">Continue with Google</Text>
    </Pressable>
  );
}
