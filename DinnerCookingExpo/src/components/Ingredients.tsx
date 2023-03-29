import { Text, View } from 'react-native';
import { Ingredient } from '../interfaces/FirebaseSchema';
import PlusIcon from '../assets/icons/add.svg';
import MinusIcon from '../assets/icons/minus.svg';
import { Row } from './Row';
import { colors } from '../styles/Color';
import { sizes } from '../styles/Sizes';
import { typography } from '../styles/Typography';
import { useEffect, useState } from 'react';
import { spacing } from '../styles/Spacing';
import { AppButton } from './Button';
import { AppButtonType } from '../interfaces/Button';

type IngredientsProps = {
  ingredients: Ingredient[];
  servings: number;
};

export const Ingredients = (props: IngredientsProps) => {
  const [servings, setServings] = useState<number>(props.servings);

  const servingMultiplier = servings / props.servings;

  const updateServings = (num: number) => {
    if (num <= 0) return;
    else setServings(num);
  };

  useEffect(() => {
    setServings(props.servings);
  }, [props.servings]);

  return (
    <View>
      <Row
        spaceBetween
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.m,
        }}>
        <AppButton
          title=""
          iconOnly
          logoSVG={MinusIcon}
          logoColor={colors.primary}
          type={AppButtonType.secondary}
          onPress={() => {
            updateServings(servings - 1);
          }}
        />
        <Text style={typography.overline}>{`${servings} SERVINGS`}</Text>
        <AppButton
          title=""
          iconOnly
          logoSVG={PlusIcon}
          logoColor={colors.primary}
          type={AppButtonType.secondary}
          onPress={() => {
            updateServings(servings + 1);
          }}
        />
      </Row>

      <View>
        {props.ingredients.map(ingredient => {
          return (
            <Text
              style={[typography.body, { marginTop: spacing.xxs }]}
              key={"ingredient" + ingredient.name + ingredient.id}>
              {`${Math.ceil(
                ingredient.measures.metric.amount * servingMultiplier,
              )} ${ingredient.measures.metric.unitShort} ${ingredient.name}`}
            </Text>
          );
        })}
      </View>
    </View>
  );
};
