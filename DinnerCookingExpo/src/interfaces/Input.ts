import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';

export interface AppInputProps {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  disabled?: boolean;
  hideable?: boolean;
  clearable?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onEndEdit?:
    | ((e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void)
    | undefined;
  customOnFokus?: () => void;
  onPressIn?: () => void;
  textContentType:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
  style?: object;
}
