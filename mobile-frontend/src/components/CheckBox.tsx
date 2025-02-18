import { View, FlatList } from 'react-native';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';
import useStyles from '../hooks/useStyles';

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
  const styles = useStyles();

  return (
    <View style={styles.flexContainer}>
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
