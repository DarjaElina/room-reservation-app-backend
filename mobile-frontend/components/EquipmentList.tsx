import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import EquipmentItem from './EquipmentItem';

export default function EquipmentList({ equipment }) {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={equipment}
        renderItem={({ item }) => <EquipmentItem name={item.name} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
