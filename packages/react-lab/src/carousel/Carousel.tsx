import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

export interface CarouselProps {
  dataset: {
    src: string;
    alt: string;
  }[];
}

export default function Carousel({ dataset }: CarouselProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef?.current) return;
    carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    carouselRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const onClickButton = (direction: number) => () => {
    const value = currentSlide + direction;
    if (value < 0) {
      setCurrentSlide(dataset.length);
      return;
    }
    if (value >= dataset.length) {
      setCurrentSlide(0);
      return;
    }
    setCurrentSlide(value);
  };

  return (
    <Container>
      <ImageContainer ref={carouselRef}>
        {dataset.map(({ src, alt }, index) => (
          <Image key={alt + index} src={src} alt={alt} />
        ))}
      </ImageContainer>
      <LeftButton onClick={onClickButton(-1)}>&lt;</LeftButton>
      <RightButton onClick={onClickButton(+1)}>&gt;</RightButton>
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
