import { View, FlatList, StyleSheet } from 'react-native';
import EquipmentItem from './EquipmentItem';

interface EquipmentListProps {
  equipment: { id: string; name: string }[];
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={equipment}
        renderItem={({ item }) => <EquipmentItem name={item.name} />}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContent: {
    gap: 10,
  },
});
