import { FlatList, StyleSheet, Text, View } from "react-native"
import { UserFirebase } from "../interfaces/FirebaseSchema"
import { spacing } from "../styles/Spacing"
import { typography } from "../styles/Typography"
import { UserImage } from "./UserImage"

type AvatarListProps = {
  participants: UserFirebase[]
} 

export const AvatarList = (props: AvatarListProps) => {  
  const renderAvatar = ({ item } : {item: UserFirebase}) => (
    <View style={[styles.userWrapper, {marginBottom: spacing.m}]}>
      <UserImage
        name={item.name}
        imageUrl={item.imageUrl}
      />
      <Text style={[typography.body2, styles.text]} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <FlatList data={props.participants} renderItem={renderAvatar} horizontal style={{flexDirection: "row"}} ItemSeparatorComponent={() => <View style={{width: 40}}></View>}/>
  ) 
}

const styles = StyleSheet.create({
  userWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
  },
})