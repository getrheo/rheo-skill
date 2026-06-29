import { View, Text } from 'react-native';

export const StepQuitGoal = ({ selected, goal }: { selected: string; goal: string }) => (
  <View
    className={
      selected === goal
        ? 'border-primary-500 bg-primary-500/10'
        : 'border-gray-200 bg-gray-50'
    }
  >
    <Text className={selected === goal ? 'text-primary-700' : 'text-gray-700'}>
      Goal
    </Text>
  </View>
);
