export interface SliderParams {
  index: number;
  gapWidth: number;
  itemWidth: number;
  containerWidth: number;
}

export const countElementsGapWidth = ([left, right]: [Element, Element]) =>
  right.getBoundingClientRect().left - left.getBoundingClientRect().right;

export const fillUpImage = (
  images: string[],
  fillUpCount: number
): string[] => {
  const tailFillOut: string[] = [];
  const headFillOut: string[] = [];
  let counter = 0;
  let fillUpCounter = fillUpCount;
  while (fillUpCounter > 0) {
    const tailI = counter % images.length;
    const headI = images.length - 1 - (counter % images.length);
    tailFillOut.push(images[tailI]);
    headFillOut.unshift(images[headI]);
    fillUpCounter--;
    counter++;
  }
  return [...headFillOut, ...images, ...tailFillOut];
};

export const transInRangeIndex = (index: number, itemsCount: number) => {
  if (index >= 0) {
    return index % itemsCount;
  }
  return itemsCount - 1 + (index % itemsCount);
};

export const countOffset: (props: SliderParams) => number = ({
  index,
  gapWidth,
  itemWidth,
  containerWidth,
}) => {
  const itemWidthCount = 0.5 + index;
  const gapCount = index;
  return (
    0.5 * containerWidth - (itemWidthCount * itemWidth + gapCount * gapWidth)
  );
};

export const countFillUp: (props: Omit<SliderParams, "index">) => number = ({
  gapWidth,
  itemWidth,
  containerWidth,
}) => Math.floor((containerWidth - itemWidth) / 2 / (itemWidth + gapWidth)) + 1;
