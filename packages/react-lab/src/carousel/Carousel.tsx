import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

export interface CarouselProps {
  dataset: {
    src: string;
    alt: string;
  }[];
  interval: number;
}

export default function Carousel({
  dataset,
  interval = 0,
}: CarouselProps): JSX.Element {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef?.current) return;
    carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    carouselRef.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  const moveCarousel = useCallback(
    (direction: number) => {
      const value = current + direction;
      if (value < 0) {
        setCurrent(dataset.length);
        return;
      }
      if (value >= dataset.length) {
        setCurrent(0);
        return;
      }
      setCurrent(value);
    },
    [current, dataset.length],
  );

  useEffect(() => {
    if (interval <= 0) {
      return;
    }
    let timer = setInterval(() => {
      moveCarousel(+1);
    }, interval);

    return () => clearInterval(timer);
  }, [current, interval, moveCarousel]);

  const onClickLeftButton = () => {
    moveCarousel(-1);
  };

  const onClickRightButton = () => {
    moveCarousel(+1);
  };

  return (
    <Container>
      <ImageContainer ref={carouselRef}>
        {dataset.map(({ src, alt }, index) => (
          <Image key={alt + index} src={src} alt={alt} />
        ))}
      </ImageContainer>
      <LeftButton onClick={onClickLeftButton}>&lt;</LeftButton>
      <RightButton onClick={onClickRightButton}>&gt;</RightButton>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const Image = styled.img`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
`;

const LeftButton = styled(Button)``;

const RightButton = styled(Button)`
  right: 0;
`;
