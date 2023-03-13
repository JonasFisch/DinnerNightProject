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

const PAGE_WIDTH = Dimensions.get('screen').width;
const recepies = [
  {
    title: 'Nices Essen',
    duration: 1,
    level: 'easy',
  },
  {
    title: 'Apple Pie',
    duration: 1,
    level: 'easy',
  },
  {
    title: 'something else',
    duration: 1,
    level: 'easy',
  },
];

const RecepieCarousel = () => {
  const isVertical = false;
  const autoPlay = false;
  const pagingEnabled = true;
  const snapEnabled = true;
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.8,
  } as const;

  const [selected, setSelected] = React.useState<number>(0);
  const navigator = useNavigation();

  const navigateExpandPage = (index: number) => {
    navigator.navigate('Recipe');
  };

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Carousel
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
          parallaxScrollingOffset: 70,
          parallaxAdjacentItemScale: 0.7,
        }}
        data={recepies}
        renderItem={({ index, item }) => (
          <CarouselItem
            name={item.title}
            duration={item.duration}
            level={item.level}
            selected={index == selected}
            onThumbnailPressed={() => setSelected(index)}
            onExpandClicked={() => navigateExpandPage(index)}
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
                }
          }>
            {/* TODO: pagination */}
          {/* {recepies.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })} */}
        </View>
      )}
    </View>
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
        backgroundColor: 'white',
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
