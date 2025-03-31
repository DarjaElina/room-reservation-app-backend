import { View, FlatList } from 'react-native';
import EquipmentItem from './EquipmentItem';
import { Equipment } from '@/__generated__/graphql';

interface EquipmentListProps {
  equipment: Equipment[];
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  return (
    <View>
      <FlatList
        horizontal
        data={equipment}
        renderItem={({ item }) => <EquipmentItem name={item.name} />}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
