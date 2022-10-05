import styled from '@emotion/styled';
import { useState } from 'react';

export interface CalendarProps {
  year: number;
  month: number;
}

export default function Calendar({
  year: defaultYear,
  month: defaultMonth,
}: CalendarProps): JSX.Element {
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from(Array(daysInMonth).keys()).map((i) => i + 1);

  const startDateDay = new Date(year, month - 1, 1).getDay();
  const endOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const prevMonthDays = Array.from(Array(startDateDay).keys())
    .map((i) => endOfPrevMonth - i)
    .reverse();

  const endDateDay = new Date(year, month, 0).getDay();
  const nextMonthDays = Array.from(Array(6 - endDateDay).keys()).map(
    (i) => i + 1,
  );

  const handleClickLeftBtn = () => {
    if (month === 0) {
      setMonth(12);
      setYear((prev) => prev - 1);
      return;
    }
    setMonth((prev) => prev - 1);
  };

  const handleClickRightBtn = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
      return;
    }
    setMonth((prev) => prev + 1);
  };

  return (
    <Container>
      <Header>
        <Button onClick={handleClickLeftBtn}>&lt;</Button>
        <div>
          <Month>{month}</Month>
          <Year>{year}</Year>
        </div>
        <Button onClick={handleClickRightBtn}>&gt;</Button>
      </Header>
      <DayList>
        {prevMonthDays.map((day) => (
          <DayListItem key={day} className="day-list-item">
            {day}
            <Blur />
          </DayListItem>
        ))}
        {days.map((day) => (
          <DayListItem key={day} className="day-list-item">
            {day}
          </DayListItem>
        ))}
        {nextMonthDays.map((day) => (
          <DayListItem key={day} className="day-list-item">
            {day}
            <Blur />
          </DayListItem>
        ))}
      </DayList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 200px;
  height: 80px;
`;

const Month = styled.span`
  font-size: 64px;
  font-weight: 800;
`;

const Year = styled.span`
  margin-left: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  background-color: transparent;
`;

const DayList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: calc(100% - 80px);
  border: 1px solid rgb(200, 200, 200);
  border-right: none;
  border-bottom: none;

  .day-list-item:nth-of-type(7n) {
    color: blue;
  }
  .day-list-item:nth-of-type(7n + 1) {
    color: red;
  }
`;

const DayListItem = styled.div`
  position: relative;
  padding: 5px;
  border: 1px solid rgb(200, 200, 200);
  border-top: none;
  border-left: none;
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;
