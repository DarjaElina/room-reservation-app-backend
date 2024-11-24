import { View, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';

export default function CheckBox({ options, checkedValues, onChange }) {
  const [updatedCheckedValues, setUpdatedCheckedValues] = useState([
    ...checkedValues,
  ]);

  console.log(updatedCheckedValues);

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({ item }) => {
          const isActive = updatedCheckedValues.includes(item.value);
          return (
            <CheckBoxItem
              item={item}
              isActive={isActive}
              updatedCheckedValues={updatedCheckedValues}
              setUpdatedCheckedValues={setUpdatedCheckedValues}
              onChange={onChange}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
