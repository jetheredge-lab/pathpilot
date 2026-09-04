import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/auth';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="p-5 gap-4">
      <View className="rounded-2xl bg-white p-5 shadow-sm">
        <Text className="text-sm text-muted">Signed in as</Text>
        <Text className="mt-1 text-lg font-semibold text-ink">{user?.email}</Text>

        <View className="mt-4 flex-row items-center gap-2">
          <View
            className={`rounded-full px-3 py-1 ${
              user?.active ? 'bg-brand-light' : 'bg-slate-200'
            }`}
          >
            <Text className="text-xs font-semibold text-brand-dark">
              {user?.active ? 'Pro — active' : `Plan: ${user?.plan ?? 'free'}`}
            </Text>
          </View>
        </View>

        {user?.entitlementExpiresAt ? (
          <Text className="mt-2 text-xs text-muted">
            Access through {new Date(user.entitlementExpiresAt).toLocaleDateString()}
          </Text>
        ) : null}
      </View>

      <View className="rounded-2xl bg-white p-5 shadow-sm">
        <Text className="text-base font-semibold text-ink">Welcome to RoundsAhead</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          Your pre-health plan syncs with the web app. Explore the Pathways tab to
          compare careers, salaries, and the steps to get there — every fact is
          sourced and dated.
        </Text>
      </View>

      <Pressable
        className="mt-2 items-center rounded-xl border border-slate-300 bg-white py-3.5 active:opacity-80"
        onPress={signOut}
      >
        <Text className="text-base font-semibold text-red-600">Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}
