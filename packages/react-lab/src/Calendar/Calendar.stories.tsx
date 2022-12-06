import { ComponentStory } from '@storybook/react';

import Calendar from './Calendar';
import styled from '@emotion/styled';

export default {
  component: 'Calendar',
  title: 'Calendar',
};

const Container = styled.div`
  width: 100%;
  height: 500px;
`;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Container>
    <Calendar {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  year: 2022,
  month: 10,
};
