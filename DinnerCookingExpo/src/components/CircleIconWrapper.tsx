import { Pressable, PressableProps, View, ViewProps } from 'react-native';
import { colors } from '../styles/Color';

export const CircleIconWrapper = (props: PressableProps) => {
  return (
    <Pressable
      style={{ borderColor: colors.primary, borderWidth: 2, borderRadius: 50 }}
      {...props}>
      {props.children}
    </Pressable>
  );
};
