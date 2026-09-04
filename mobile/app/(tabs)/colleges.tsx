import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, type CollegeFinancials } from '@/api';
import { useAuth } from '@/auth';

const usd = (n: number | null): string =>
  n == null ? '—' : `$${Math.round(n).toLocaleString('en-US')}`;

const pct = (n: number | null): string =>
  n == null ? '—' : `${(n * 100).toFixed(n < 0.1 ? 1 : 0)}%`;

const INCOME_BANDS: { key: keyof CollegeFinancials['netPriceByIncome']; label: string }[] = [
  { key: 'band0_30k', label: 'Under $30k' },
  { key: 'band30_48k', label: '$30–48k' },
  { key: 'band48_75k', label: '$48–75k' },
  { key: 'band75_110k', label: '$75–110k' },
  { key: 'band110k_plus', label: '$110k+' },
];

export default function Colleges() {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  // Debounce typing so we don't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 400);
    return () => clearTimeout(t);
  }, [query]);

  const statusQuery = useQuery({
    queryKey: ['scorecard-status'],
    queryFn: () => api.scorecardStatus(),
  });
  const enabled = statusQuery.data?.enabled ?? false;

  const searchQuery = useQuery({
    queryKey: ['scorecard', debounced],
    queryFn: () => api.searchColleges(token!, debounced),
    enabled: !!token && enabled && debounced.length >= 2,
  });

  const results = searchQuery.data?.results ?? [];

  return (
    <View className="flex-1 bg-slate-50">
      <View className="border-b border-slate-200 bg-white px-5 pb-3 pt-2">
        <TextInput
          className="rounded-xl border border-slate-300 px-4 py-3 text-base text-ink"
          placeholder="Search any U.S. college…"
          placeholderTextColor="#94a3b8"
          autoCapitalize="words"
          autoCorrect={false}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        contentContainerClassName="p-5 gap-4"
        data={results}
        keyExtractor={(c) => String(c.unitId)}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <CollegeCard college={item} />}
        ListEmptyComponent={
          <EmptyState
            statusLoading={statusQuery.isLoading}
            enabled={enabled}
            searching={searchQuery.isFetching}
            query={debounced}
            error={searchQuery.isError}
          />
        }
      />
    </View>
  );
}

function EmptyState({
  statusLoading,
  enabled,
  searching,
  query,
  error,
}: {
  statusLoading: boolean;
  enabled: boolean;
  searching: boolean;
  query: string;
  error: boolean;
}) {
  if (statusLoading) {
    return (
      <View className="items-center py-16">
        <ActivityIndicator color="#0f766e" />
      </View>
    );
  }
  if (!enabled) {
    return (
      <Card>
        <Text className="text-base font-semibold text-ink">Search unavailable</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          College net-price search isn't configured on the server yet.
        </Text>
      </Card>
    );
  }
  if (searching) {
    return (
      <View className="items-center py-16">
        <ActivityIndicator color="#0f766e" />
      </View>
    );
  }
  if (error) {
    return (
      <Card>
        <Text className="text-base font-semibold text-ink">Something went wrong</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          Couldn't reach college search. Check your connection and try again.
        </Text>
      </Card>
    );
  }
  if (query.length >= 2) {
    return (
      <Card>
        <Text className="text-base font-semibold text-ink">No matches</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          No operating colleges matched “{query}”. Try the official name.
        </Text>
      </Card>
    );
  }
  return (
    <Card>
      <Text className="text-base font-semibold text-ink">What will college actually cost?</Text>
      <Text className="mt-2 text-sm leading-5 text-muted">
        Search any U.S. college to see the <Text className="font-semibold">net price by family
        income</Text> — what families really pay after aid, not the sticker price — plus
        admission rate, test ranges, median debt, and graduate earnings.
      </Text>
      <Text className="mt-3 text-xs text-muted">
        Source: U.S. Dept. of Education — College Scorecard (public domain).
      </Text>
    </Card>
  );
}

function CollegeCard({ college }: { college: CollegeFinancials }) {
  const openNpc = () => {
    if (college.netPriceCalculatorUrl) Linking.openURL(college.netPriceCalculatorUrl);
  };
  return (
    <Card>
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-ink">{college.name}</Text>
          <Text className="mt-0.5 text-sm text-muted">
            {[college.city, college.state].filter(Boolean).join(', ')}
          </Text>
        </View>
        <View className="rounded-full bg-slate-100 px-3 py-1">
          <Text className="text-xs font-semibold text-ink capitalize">{college.ownership}</Text>
        </View>
      </View>

      {/* Net price by income — the headline. */}
      <Text className="mt-4 text-xs font-semibold uppercase text-muted">
        Net price / year by family income
      </Text>
      <View className="mt-2 gap-1.5">
        {INCOME_BANDS.map((b) => (
          <View key={b.key} className="flex-row items-center justify-between">
            <Text className="text-sm text-muted">{b.label}</Text>
            <Text className="text-sm font-semibold text-ink">
              {usd(college.netPriceByIncome[b.key])}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-4 flex-row flex-wrap gap-x-8 gap-y-3">
        <Stat label="Admit rate" value={pct(college.admissionRate)} />
        <Stat
          label="SAT range"
          value={college.sat25 && college.sat75 ? `${college.sat25}–${college.sat75}` : '—'}
        />
        <Stat label="Median debt" value={usd(college.medianDebt)} />
        <Stat label="Earnings (10 yr)" value={usd(college.earnings10yr)} />
      </View>

      {college.netPriceCalculatorUrl ? (
        <Pressable
          className="mt-4 items-center rounded-xl border border-brand py-3 active:opacity-80"
          onPress={openNpc}
        >
          <Text className="text-sm font-semibold text-brand">
            Open the school's Net Price Calculator
          </Text>
        </Pressable>
      ) : null}

      <Text className="mt-3 text-[11px] leading-4 text-muted">
        {college.source}. {college.vintage}.
      </Text>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View className="rounded-2xl bg-white p-5 shadow-sm">{children}</View>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="text-xs uppercase text-muted">{label}</Text>
      <Text className="text-base font-semibold text-ink">{value}</Text>
    </View>
  );
}
