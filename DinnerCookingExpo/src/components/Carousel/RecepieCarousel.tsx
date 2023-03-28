import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SBItem } from './SBItem';
import { CarouselItem } from './CarouselItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Recipe } from '../../interfaces/FirebaseSchema';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { spacing } from '../../styles/Spacing';
import { colors } from '../../styles/Color';

const PAGE_WIDTH = Dimensions.get('screen').width;
const PAGE_HEIGHT = Dimensions.get('screen').height;

interface RecipeCarouselProps {
  recipes: Recipe[];
  selected?: string;
  active?: string;
  setSelected: (selected: string) => void;
}

const RecepieCarousel = (props: RecipeCarouselProps) => {
  const isVertical = false;
  const autoPlay = false;
  const pagingEnabled = true;
  const snapEnabled = true;
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT * 0.4,
  } as const;

  const navigator = useNavigation();

  const navigateExpandPage = (recipe: Recipe) => {
    navigator.navigate('Recipe', {
      id: recipe.id,
      canFinishDinner: false,
    });
  };

  return (
    <GestureHandlerRootView style={{ marginTop: -spacing.m }}>
      <Carousel
        style={{ marginBottom: -spacing.m }}
        {...baseOptions}
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={1500}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 90,
          parallaxAdjacentItemScale: 0.6,
        }}
        data={props.recipes}
        renderItem={({ index, item }) => (
          <CarouselItem
            key={item.id}
            name={item.title}
            duration={item.readyInMinutes / 60}
            imageURL={item.image}
            active={item.id == props.active}
            selected={item.id == props.selected}
            onThumbnailPressed={() => props.setSelected(item.id)}
            onExpandClicked={() => navigateExpandPage(item)}
          />
        )}
      />
      {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 10,
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  top: 40,
                }
              : {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 100,
                  alignSelf: 'center',
                  marginBottom: spacing.l,
                }
          }>
          {props.recipes.map((recipe, index) => {
            return (
              <PaginationItem
                backgroundColor={colors.textLight}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={props.recipes.length}
              />
            );
          })}
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = props => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        borderColor: colors.textLight,
        borderStyle: 'solid',
        borderWidth: 1,
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default RecepieCarousel;
