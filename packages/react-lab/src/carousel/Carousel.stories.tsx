import React from 'react';
import { ComponentStory } from '@storybook/react';

import Carousel from './Carousel';
import styled from '@emotion/styled';

export default {
  component: 'Carousel',
  title: 'Carousel',
};

const Container = styled.div`
  width: 100%;
  height: 500px;
`;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Container>
    <Carousel {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  dataset: [
    {
      src: 'https://cdn.pixabay.com/photo/2022/07/10/19/28/mountains-7313638_960_720.jpg',
      alt: '산',
      link: '/',
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/03/12/09/38/cat-2136663_960_720.jpg',
      alt: '문과 고양이',
      link: '/',
    },
    {
      src: 'https://cdn.pixabay.com/photo/2022/08/08/19/36/landscape-7373484_960_720.jpg',
      alt: '무지개',
      link: '/',
    },
  ],
  interval: 3000,
};
