import { View, FlatList, StyleSheet } from 'react-native';
import EquipmentItem from './EquipmentItem';
import useStyles from '../hooks/useStyles';
import { Equipment } from '@/__generated__/graphql';

interface EquipmentListProps {
  equipment: Equipment[];
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  const styles = useStyles();
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
