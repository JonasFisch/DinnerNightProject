import { Text, View } from "react-native"
import { Ingredient } from "../interfaces/FirebaseSchema"
import PlusIcon from "../assets/icons/add.svg"
import MinusIcon from "../assets/icons/minus.svg"
import { Row } from "./Row"
import { colors } from "../styles/Color"
import { sizes } from "../styles/Sizes"
import { CircleIconWrapper } from "./CircleIconWrapper"
import { typography } from "../styles/Typography"
import { useEffect, useState } from "react"
import { spacing } from "../styles/Spacing"

type IngredientsProps = {
	ingredients: Ingredient[],
	servings: number,
}

export const Ingredients = (props: IngredientsProps) => {
	
	const [servings, setServings] = useState<number>(props.servings);	
	
	const servingMultiplier = servings / (props.servings);

	const updateServings = (num: number) => {
		if (num <= 0) return
		else setServings(num)
	}

	useEffect(() => {
		setServings(props.servings)
	}, [props.servings])

	return <View>
		<Row spaceBetween style={{flexDirection: "row", alignItems: "center", marginBottom: spacing.m}}>
			<CircleIconWrapper onPress={() => {updateServings(servings - 1)}}>
				<MinusIcon fill={colors.primary} />
			</CircleIconWrapper>
			<Text style={typography.overline}>{`${servings} SERVINGS`}</Text>
			<CircleIconWrapper onPress={() => {updateServings(servings + 1)}}>
				<PlusIcon fill={colors.primary} />
			</CircleIconWrapper>
		</Row>

		<View>
			{props.ingredients.map(ingredient => {
            return (
              <Text style={typography.body}>{`${Math.ceil(ingredient.measures.metric.amount * servingMultiplier)} ${
                  ingredient.measures.metric.unitShort
                } ${ingredient.name}`}
              </Text>
            );
			})}
		</View>

	</View>
}