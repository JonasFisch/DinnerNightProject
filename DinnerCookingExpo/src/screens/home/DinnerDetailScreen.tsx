import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute();
  const params = route.params as DinnerDetailScreenParams;

  console.log(params.id);
  // TODO: get dinner details here

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dinner Detail Screen for Dinner with id of: {params.id}</Text>
    </View>
  );
};
