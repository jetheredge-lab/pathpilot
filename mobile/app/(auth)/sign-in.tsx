import { useState } from 'react';
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
import { useAuth } from '@/auth';

export default function SignIn() {
  const { signIn, signUp } = useAuth();
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
      // On success the root navigator redirects into the app.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  // Native OAuth needs a backend token-exchange endpoint (POST the Apple/Google
  // identity token, receive our session token). That endpoint is the next step
  // in Phase 8.2 — the buttons are wired to the UI now, backend to follow.
  const nativeOAuthTodo = (provider: string) =>
    Alert.alert(
      `${provider} sign-in`,
      `Native ${provider} sign-in is coming next — it needs the backend token-exchange endpoint. Use email + password for now.`,
    );

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
            onPress={() => nativeOAuthTodo('Apple')}
          />
        ) : null}

        <Pressable
          className="mt-3 items-center rounded-xl border border-slate-300 py-3.5 active:opacity-80"
          onPress={() => nativeOAuthTodo('Google')}
        >
          <Text className="text-base font-semibold text-ink">Continue with Google</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
