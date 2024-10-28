import { FlatList, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import theme from '../theme';
import CalendarHeader from './CalendarHeader';

function SelectedTimeSlot({ value }) {
  return (
    <View
      style={{
        minHeight: 25,
        backgroundColor: '#8594e4',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        width: '80%',
      }}
    >
      <Text style={{ color: theme.colors.textPrimary }}>{value}</Text>
    </View>
  );
}

const testArray = [
  { hour: 6, value: '06:00:00' },
  { hour: 6, value: '06:15:00' },
  { hour: 6, value: '06:30:00' },
  { hour: 6, value: '06:45:00' },
  { hour: 7, value: '07:00:00' },
  { hour: 7, value: '07:15:00' },
  { hour: 7, value: '07:30:00' },
  { hour: 7, value: '07:45:00' },
  { hour: 8, value: '08:00:00' },
  { hour: 8, value: '08:15:00' },
  { hour: 8, value: '08:30:00' },
  { hour: 8, value: '08:45:00' },
  { hour: 9, value: '09:00:00' },
  { hour: 9, value: '09:15:00' },
  { hour: 9, value: '09:30:00' },
  { hour: 9, value: '09:45:00' },
  { hour: 10, value: '10:00:00' },
  { hour: 10, value: '10:15:00' },
  { hour: 10, value: '10:30:00' },
  { hour: 10, value: '10:45:00' },
  { hour: 11, value: '11:00:00' },
  { hour: 11, value: '11:15:00' },
  { hour: 11, value: '11:30:00' },
  { hour: 11, value: '11:45:00' },
  { hour: 12, value: '12:00:00' },
  { hour: 12, value: '12:15:00' },
  { hour: 12, value: '12:30:00' },
  { hour: 12, value: '12:45:00' },
  { hour: 13, value: '13:00:00' },
  { hour: 13, value: '13:15:00' },
  { hour: 13, value: '13:30:00' },
  { hour: 13, value: '13:45:00' },
  { hour: 14, value: '14:00:00' },
  { hour: 14, value: '14:15:00' },
  { hour: 14, value: '14:30:00' },
  { hour: 14, value: '14:45:00' },
  { hour: 15, value: '15:00:00' },
  { hour: 15, value: '15:15:00' },
  { hour: 15, value: '15:30:00' },
  { hour: 15, value: '15:45:00' },
  { hour: 16, value: '16:00:00' },
  { hour: 16, value: '16:15:00' },
  { hour: 16, value: '16:30:00' },
  { hour: 16, value: '16:45:00' },
  { hour: 17, value: '17:00:00' },
  { hour: 17, value: '17:15:00' },
  { hour: 17, value: '17:30:00' },
  { hour: 17, value: '17:45:00' },
  { hour: 18, value: '18:00:00' },
  { hour: 18, value: '18:15:00' },
  { hour: 18, value: '18:30:00' },
  { hour: 18, value: '18:45:00' },
  { hour: 19, value: '19:00:00' },
  { hour: 19, value: '19:15:00' },
  { hour: 19, value: '19:30:00' },
  { hour: 19, value: '19:45:00' },
  { hour: 20, value: '20:00:00' },
  { hour: 20, value: '20:15:00' },
  { hour: 20, value: '20:30:00' },
  { hour: 20, value: '20:45:00' },
  { hour: 21, value: '21:00:00' },
  { hour: 21, value: '21:15:00' },
  { hour: 21, value: '21:30:00' },
  { hour: 21, value: '21:45:00' },
  { hour: 22, value: '22:00:00' },
  { hour: 22, value: '22:15:00' },
  { hour: 22, value: '22:30:00' },
  { hour: 22, value: '22:45:00' },
  { hour: 23, value: '23:00:00' },
  { hour: 23, value: '23:15:00' },
  { hour: 23, value: '23:30:00' },
  { hour: 23, value: '23:45:00' },
  { hour: 0, value: '00:00:00' }
];

interface TimeSlot {
  hour: number;
  value: string;
}

function Calendar() {
  const [selectedValues, setSelectedValues] = useState<TimeSlot[]>([]);

  const handleSelect = (item: TimeSlot) => {
    const hour = Number(item.value.slice(0, 2));

    const hourBlock = [
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:00:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:15:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:30:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:45:00` },
    ];

    const isHourSelected = hourBlock.every((block) =>
      selectedValues.some((selected) => selected.hour === block.hour)
    );

    const isValueSelected = selectedValues.some((i) => i.value === item.value);

    if (isHourSelected && isValueSelected) {
      console.log('I am if!!!')
      setSelectedValues(
        selectedValues.filter((selected) => selected.value !== item.value)
      );
    } else if (!isHourSelected) {
      console.log('and i am ELSE :D')
      setSelectedValues([...selectedValues, ...hourBlock]);
    } else {
      setSelectedValues([...selectedValues, item])
    }
  };
  console.log(selectedValues);
  return (
    <View>
      <FlatList
        data={testArray}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleSelect(item)}
            style={{
              height: 25,
              borderTopWidth: 1,
              borderColor:
                index !== 0 && index % 4 === 0
                  ? 'grey'
                  : theme.colors.textPrimary,
              position: 'relative',
            }}
          >
            {index % 4 === 0 ? (
              <Text style={{ padding: 2 }}>{item.value}</Text>
            ) : null}
            {selectedValues.find((i) => i.value === item.value) ? (
              <SelectedTimeSlot value={item.value} />
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
}

function Separator() {
  return (
    <View
      style={{
        width: 1,
        position: 'absolute',
        backgroundColor: 'grey',
        height: '100%',
        left: '20%',
      }}
    ></View>
  );
}

export default function CalendarTemplate() {
  return (
    <View style={{ position: 'relative' }}>
      <Calendar />
      <Separator />
    </View>
  );
}
