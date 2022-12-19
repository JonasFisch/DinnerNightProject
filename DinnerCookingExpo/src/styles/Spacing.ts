export enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}
export const spacings = (direction: Direction) => {
  const defaultSpacing = 24;

  switch (direction) {
    case Direction.TOP:
      return {marginTop: defaultSpacing};
    case Direction.RIGHT:
      return {marginRight: defaultSpacing};
    case Direction.BOTTOM:
      return {marginBottom: defaultSpacing};
    case Direction.LEFT:
      return {marginLeft: defaultSpacing};

    default:
      break;
  }
};
