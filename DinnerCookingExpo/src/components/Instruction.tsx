import { Text, TextProps, View } from "react-native";
import { colors } from "../styles/Color";
import { spacing } from "../styles/Spacing";


export const Instruction = (props: TextProps) => (
	<View style={{borderLeftColor: colors.disabled, borderLeftWidth: 1, padding: spacing.s }}>
		<Text>
				{props.children}
		</Text>
	</View>
);