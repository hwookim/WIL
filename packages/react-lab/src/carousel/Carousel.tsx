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
        setCurrent(dataset.length - 1);
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
      <Counter>
        {current + 1} / {dataset.length}
      </Counter>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  button {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  &:hover button {
    opacity: 0.8;
  }
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
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const LeftButton = styled(Button)`
  left: 24px;
`;

const RightButton = styled(Button)`
  right: 24px;
`;

const Counter = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 50px;
  height: 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
`;
