import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export enum AppButtonType {
  primary = 'primary',
  secondary = 'secondary',
  text = 'text',
}

export type AppButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type: AppButtonType;
  disabled?: boolean;
  logoURI?: string;
  logoSVG?: React.FC<SvgProps>;
  logoColor?: string;
  logoAsTrailingIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  widthFitContent?: boolean;
  iconOnly?: boolean;
  textStyle?: StyleProp<TextStyle>;
};
