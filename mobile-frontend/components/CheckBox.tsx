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
  checkBox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#48225a',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeCheckboxColor: {
    backgroundColor: '#6a329b',
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: '#f4e1f6',
  },
  activeText: {
    color: '#ffffff',
  },
});
