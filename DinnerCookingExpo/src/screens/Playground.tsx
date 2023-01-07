import React from 'react';
import {
  ProgressBarAndroidBase,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AppButton } from '../components/Button';
import { AppInput } from '../components/Input';
import { AppButtonType } from '../interfaces/Button';
import { typography } from '../styles/Typography';
import { colors } from '../styles/Color';
import { Tabs } from '../components/Tabs';
import { Frame } from '../components/Frame';

export const Playground = () => {
  const test = () => {
    console.log('hello');
  };

  return (
    <Frame>
      <AppInput label='test' value='hallo' textContentType={'emailAddress'} keyboardType={'default'}  />
      {/* <Tabs
        tabViews={[
          { node: <Text>Seite 1</Text>, title: 'In Progess' },
          { node: <Text>Seite 2</Text>, title: 'Archive' },
        ]}
      /> */}
    </Frame>
  );

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <AppInput
          label="Search"
          keyboardType="default"
          textContentType="username"
          hideable={true}
        />
        <AppInput
          label="Disabled"
          keyboardType="default"
          textContentType="password"
          disabled={true}
        />
        <AppInput
          label="Search"
          keyboardType="numeric"
          textContentType="password"
          hideable={true}
          // disabled={true}
          errorMessage="password incorrect"
        />
      </View>
      <AppButton
        title="BUTTON"
        onPress={test}
        type={AppButtonType.primary}
        disabled={false}
        logo={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/150px-Facebook_f_logo_%282019%29.svg.png'
        }
      />
      <AppButton
        title="secondary"
        onPress={test}
        type={AppButtonType.secondary}
        // disabled={true}
      />
      <AppButton
        title="text"
        onPress={test}
        type={AppButtonType.text}
        // disabled={true}
      />
      <Text style={typography.h1}>H1 Headline</Text>
      <Text style={typography.h2}>H2 Headline</Text>
      <Text style={typography.h3}>H3 Headline</Text>
      <Text style={typography.h4}>H4 Headline</Text>
      <Text style={typography.subtitle1}>Subtitle 1</Text>
      <Text style={typography.subtitle2}>Subtitle 2</Text>
      <Text style={typography.button}>Button</Text>
      <Text style={typography.overline}>Overline</Text>
      <Text style={typography.body}>Body</Text>
      <Text style={typography.link}>Link</Text>
    </ScrollView>
  );
};
