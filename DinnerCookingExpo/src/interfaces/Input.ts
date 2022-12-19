import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';

export interface AppInputProps {
  label: string;
  keyboardType: KeyboardTypeOptions | undefined;
  errorMessage?: string;
  disabled?: boolean;
  hideable?: boolean;
  value: string;
  onChangeText?: ((text: string) => void) | undefined;
  onEndEdit?:
    | ((e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void)
    | undefined;
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
}
