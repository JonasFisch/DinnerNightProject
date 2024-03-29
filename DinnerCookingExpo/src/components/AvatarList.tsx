import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UserFirebase } from '../interfaces/FirebaseSchema';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { UserImage } from './UserImage';
import CheckIcon from '../assets/icons/check.svg';
import { colors } from '../styles/Color';

type AvatarListProps = {
  participants: UserFirebase[];
  votes: {};
  style?: {};
};

export const AvatarList = (props: AvatarListProps) => {
  const userHasVoted = (userid: string) => {
    return Object.keys(props.votes).includes(userid);
  };

  const renderAvatar = ({ item }: { item: UserFirebase }) => (
    <View style={[styles.userWrapper]}>
      <UserImage name={item.name} imageUrl={item.imageUrl} />
      <Text style={[typography.body2, styles.text]} numberOfLines={1}>
        {item.name}
      </Text>
      {userHasVoted(item.id) && (
        <CheckIcon width={20} style={{ color: colors.primaryDark }} />
      )}
    </View>
  );

  return (
    <FlatList
      data={props.participants}
      renderItem={renderAvatar}
      horizontal
      style={[{ flexDirection: 'row' }, props.style]}
      ItemSeparatorComponent={() => <View style={{ width: 40 }}></View>}
    />
  );
};

const styles = StyleSheet.create({
  userWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    marginTop: spacing.xs,
  },
});
