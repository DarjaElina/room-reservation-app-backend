import { View, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';

interface CheckBoxProps {
  options: {
    label: string;
    value: string;
  }[];
  checkedValues: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CheckBox({
  options,
  checkedValues,
  onChange,
}: CheckBoxProps) {
  const [updatedCheckedValues, setUpdatedCheckedValues] = useState([
    ...checkedValues,
  ]);

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
