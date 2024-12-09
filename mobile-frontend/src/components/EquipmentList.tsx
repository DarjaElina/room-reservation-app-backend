import { View, FlatList, StyleSheet } from 'react-native';
import EquipmentItem from './EquipmentItem';
import useStyles from '../hooks/useStyles';

interface EquipmentListProps {
  equipment: { id: string; name: string }[];
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  const styles = useStyles();
  return (
    <View style={styles.equipmentContainer}>
      <FlatList
        horizontal
        data={equipment}
        renderItem={({ item }) => <EquipmentItem name={item.name} />}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.equipmentListContent}
      />
    </View>
  );
}
