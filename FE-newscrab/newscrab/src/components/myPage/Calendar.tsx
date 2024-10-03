import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
// import left from '@assets/common/left.png'
import { fetchGrassInfoThunk } from "@store/myPage/grassSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@store/index";


const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDayOfWeek = startOfMonth.getDay();
  const dispatch: AppDispatch = useDispatch();
  const activityInfo = useSelector((state: RootState) => state.grass.grassInfo);
  const currentYM = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`

  useEffect(() => {
    // 현재 달의 활동정보가 없으면grassInfo API 호출
    console.log(currentYM)
    if(!activityInfo[currentYM]){
      dispatch(fetchGrassInfoThunk(currentYM))
      .unwrap()
      .then((res) => {
        console.log("잔디 데이터 불러옴:", res);
      })
      .catch((error) => {
        console.error("잔디 불러오기 오류:", error);
      });
    
    }
    console.log(activityInfo[currentYM])
  }, [currentYM, activityInfo, dispatch]);
  // const activityData = activityInfo[currentYM].data.data.map(e => e.date)
  // 날짜 배열 생성
  const daysInMonth = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    daysInMonth.push(null); // 첫 주 빈 칸 채우기
  }
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getActivityLevel = (day: number | null) => {
    if (!day) return 'transparent';
    // console.log(currentYM);
    // console.log(day, activityInfo[currentYM])
    // console.log(day, activityInfo[currentYM]?.[day])
    const activity = activityInfo[currentYM]?.[day] || 0;
    const intensity = Math.min(activity / 15, 1); // 최대 15 활동 기준으로 그라데이션
    return `rgba(30, 144, 255, ${intensity})`; // 녹색 그라데이션
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton onClick={handlePrevMonth}>&lt;</NavButton>
        <MonthLabel>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </MonthLabel>
        {/* <NavButton onClick={handleNextMonth}>&gt;</NavButton> */}
        <NavButton onClick={handleNextMonth}>&gt;</NavButton>
      </CalendarHeader>
      <WeekDaysContainer>
        {weekDays.map((day, index) => (
          <WeekDay key={index}>{day}</WeekDay>
        ))}
      </WeekDaysContainer>
      <CalendarGrid>
        {daysInMonth.map((day, index) => (
          <CalendarDay
            key={index}
            isEmpty={!day}
            backgroundColor={getActivityLevel(day)}
          >
            {day}
          </CalendarDay>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;

export const CalendarContainer = styled.div`
  // width: 82%;
  width: 300px;
  // max-width: 600px;
  // margin: 20px auto;
  padding: 10px;
  background-color: #ffffff; /* 배경을 흰색으로 설정 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  border: 1px solid #ccc;
  text-align: center;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

export const NavButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #ddd;
  }
`;

export const MonthLabel = styled.h2`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

export const WeekDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 5px;
`;

export const WeekDay = styled.div`
  font-weight: bold;
  color: #888;
  text-align: center;
  padding: 5px 0;
  font-size: 0.8rem;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
`;

// 개별 날짜
export const CalendarDay = styled.div<{ isEmpty: boolean; backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  // border: 1px solid #ddd;
  // padding: 0px 0;
  text-align: center;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ isEmpty }) => (isEmpty ? 'transparent' : '#000')};
  border-radius: 4px;

  &:hover {
    background-color: ${({ isEmpty }) => (isEmpty ? 'transparent' : '#e0f7e9')};
    cursor: ${({ isEmpty }) => (isEmpty ? 'default' : 'pointer')};
  }
`;