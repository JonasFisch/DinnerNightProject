import { StyleSheet, Text } from "react-native"
import { spacing } from "../styles/Spacing"
import { typography } from "../styles/Typography"
import { Row } from "./Row"

export const ParticipantVotingRow = () => {
	return (<Row spaceBetween style={{marginBottom: spacing.s}}>
		<Text style={typography.subtitle2}>Participants</Text>
		<Row style={{alignItems: "flex-end"}}>
			<Text style={typography.overline}>0 / 4</Text>
			<Text style={typography.body2}>{" "}voted</Text>
		</Row>
	</Row>)
}