import styled from '@emotion/styled';

export interface CalendarProps {
  year: number;
  month: number;
}

export default function Calendar({ year, month }: CalendarProps): JSX.Element {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from(Array(daysInMonth).keys()).map((i) => i + 1);
  const startDateDay = new Date(year, month - 1, 1).getDay();
  const startEmptyDays = Array.from(Array(startDateDay).keys());
  const endDateDay = new Date(year, month, 0).getDay();
  const endEmptyDays = Array.from(Array(6 - endDateDay).keys());

  return (
    <Container>
      <Header>
        <Month>{month}</Month>
        <Year>{year}</Year>
      </Header>
      <DayList>
        {startEmptyDays.map((day) => (
          <DayListItem key={day} className="day-list-item" />
        ))}
        {days.map((day) => (
          <DayListItem key={day} className="day-list-item">
            {day}
          </DayListItem>
        ))}
        {endEmptyDays.map((day) => (
          <DayListItem key={day} className="day-list-item" />
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
  margin: 0 auto;
  height: 80px;
`;

const Month = styled.span`
  font-size: 64px;
  font-weight: 800;
`;

const Year = styled.span`
  font-size: 16px;
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
  padding: 5px;
  border: 1px solid rgb(200, 200, 200);
  border-top: none;
  border-left: none;
`;
