import { StyleSheet, Text } from "react-native"
import { spacing } from "../styles/Spacing"
import { typography } from "../styles/Typography"
import { Row } from "./Row"

interface ParticipantVotingRowProps {
	total: number,
	voted: number
}

export const ParticipantVotingRow = (props: ParticipantVotingRowProps) => {
	return (<Row spaceBetween style={{marginBottom: spacing.s}}>
		<Text style={typography.subtitle2}>Participants</Text>
		<Row style={{alignItems: "flex-end"}}>
			<Text style={typography.overline}>{`${props.voted} / ${props.total}`}</Text>
			<Text style={typography.body2}>{" "}voted</Text>
		</Row>
	</Row>)
}