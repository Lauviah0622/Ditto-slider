import React, { useEffect, useState, useRef, DOMElement } from "react";
import slide from "../style.module.scss";
import {
  countElementsGapWidth,
  fillUpImage,
  transInRangeIndex,
  countOffset,
  countFillUp,
  SliderParams,
} from "./utils";

export type SlideContainer = (
  props: {
    children: JSX.Element;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) => JSX.Element;

export type SlideItem = (props: { src: string }) => JSX.Element;

interface SlideProps {
  index: number
  images: string[]
  Container: SlideContainer
  Item: SlideItem
}

const useSliderImageLoadedHook = (
  sliderRef: React.RefObject<HTMLDivElement | undefined>,
  callback: () => void
) => {
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (sliderElement && sliderElement.firstElementChild) {
      const img = sliderElement.firstElementChild.querySelector("img");
      if (img) {
        img.onload = callback;
      }
    }
  }, []);
};

export default function Slide({
  index = 0,
  images = [],
  Item,
  Container,
}: SlideProps) {
  const [isImageRendered, setIsImageRendered] = useState(false);
  const [itemWidth, setItemWidth] = useState<SliderParams["itemWidth"]>(0);
  const [containerWidth, setContainerWidth] =
    useState<SliderParams["containerWidth"]>(0);
  const [gapWidth, setGapWidth] = useState<SliderParams["gapWidth"]>(0);

  const containerRef = useRef<HTMLDivElement>();
  const sliderRef = useRef<HTMLDivElement>();

  useSliderImageLoadedHook(sliderRef, () => {
    setIsImageRendered(true);
  });

  useEffect(() => {
    if (!isImageRendered) return;
    const sliderElement = sliderRef.current;
    const firstItemElement = sliderElement?.firstElementChild;
    if (sliderElement && firstItemElement) {
      if (isImageRendered) {
        const SecondItem: Element | null = firstItemElement.nextElementSibling;

        setItemWidth(firstItemElement?.clientWidth ?? 0);
        setContainerWidth(sliderElement?.clientWidth ?? 0);
        if (SecondItem) {
          const gapSize = countElementsGapWidth([firstItemElement, SecondItem]);
          setGapWidth(gapSize);
        }
      }
    }
  }, [isImageRendered]);

  const fillup = countFillUp({
    gapWidth,
    itemWidth,
    containerWidth,
  });
  const indexInRange = transInRangeIndex(index, images.length);

  const fillUpImages = fillUpImage(images, fillup);
  const offset = countOffset({
    index: indexInRange + fillup,
    gapWidth,
    itemWidth,
    containerWidth,
  });

  return (
    <>
      <Container ref={containerRef}>
        <div
          className={slide.offset}
          ref={sliderRef}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {fillUpImages.map((src, i) => (
            <Item src={src} key={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
