import { StyleProp, View, ViewStyle } from "react-native"

type RowProps = {
  spaceBetween?: boolean,
  style?: StyleProp<ViewStyle>,
  children: React.ReactNode
} 

export const Row = (props: RowProps) => {
  return <View style={[{
    flexDirection: "row",
    justifyContent: props.spaceBetween ? "space-between" : "flex-start",
  }, props.style]}>
    {props.children}
  </View>
}