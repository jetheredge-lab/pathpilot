import { FlatList, Text, View } from 'react-native';
import { CAREER_PATHWAYS, type CareerPathway } from '@shared';

const PATHWAYS: CareerPathway[] = Object.values(CAREER_PATHWAYS);

function PathwayCard({ pathway }: { pathway: CareerPathway }) {
  const sourceCount = pathway.dataSources?.length ?? 0;
  return (
    <View className="rounded-2xl bg-white p-5 shadow-sm">
      <Text className="text-lg font-semibold text-ink">{pathway.title}</Text>
      <Text className="mt-1 text-sm leading-5 text-muted">{pathway.roleDescription}</Text>

      <View className="mt-4 flex-row flex-wrap gap-x-6 gap-y-2">
        <View>
          <Text className="text-xs uppercase text-muted">Median pay</Text>
          <Text className="text-sm font-semibold text-ink">{pathway.averageSalary}</Text>
        </View>
        <View>
          <Text className="text-xs uppercase text-muted">Job growth</Text>
          <Text className="text-sm font-semibold text-ink">{pathway.jobGrowth}</Text>
        </View>
        <View>
          <Text className="text-xs uppercase text-muted">Time after HS</Text>
          <Text className="text-sm font-semibold text-ink">
            {pathway.totalYearsAfterHighSchool}
          </Text>
        </View>
      </View>

      {sourceCount > 0 && pathway.lastVerified ? (
        <Text className="mt-4 text-xs text-muted">
          {sourceCount} source{sourceCount === 1 ? '' : 's'} · verified{' '}
          {pathway.lastVerified}
        </Text>
      ) : null}
    </View>
  );
}

export default function Pathways() {
  return (
    <FlatList
      className="flex-1 bg-slate-50"
      contentContainerClassName="p-5 gap-4"
      data={PATHWAYS}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => <PathwayCard pathway={item} />}
      ListHeaderComponent={
        <Text className="mb-1 text-sm text-muted">
          {PATHWAYS.length} pre-health career pathways
        </Text>
      }
    />
  );
}
