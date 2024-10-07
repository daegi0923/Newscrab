import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

// transformY 함수를 숫자에 맞게 CSS 변환값을 설정하는 함수
const transformY = (size: number, css: React.CSSProperties = {}) => ({
  transform: `translate3d(0, ${size}px, 0)`,
  ...css,
});

let firstLoad = true;

// Digit 컴포넌트 타입 정의
interface DigitProps {
  currentDigit: number; // 현재 보여줄 숫자
  isIncreasing: boolean;
}

const Digit: React.FC<DigitProps> = ({ currentDigit, isIncreasing }) => {
  useEffect(() => {
    firstLoad = false;
  }, []);

  const getFrom = () => {
    if (firstLoad) {
      return transformY(0);
    }

    // 숫자가 증가할 때
    if (isIncreasing) {
      return transformY(-20 * (currentDigit + 10)); // 이전 숫자에서 다음 숫자로 내려가는 애니메이션
    }

    // 숫자가 감소할 때
    return transformY(0);
  };

  const getTo = () => {
    if (firstLoad) {
      return transformY(0);
    }

    // 숫자가 증가할 때
    if (isIncreasing) {
      return transformY(0); // 목표 숫자로 이동
    }

    // 숫자가 감소할 때
    return transformY(-20 * (currentDigit + 10)); // 이전 숫자에서 다음 숫자로 내려가는 애니메이션
  };

  const from = getFrom();
  const to = getTo();

  const props = useSpring({
    from,
    to,
    config: { duration: 1000 }, // 애니메이션 속도 조절
  });

  return (
    <animated.span
      style={{
        ...props,
        display: "inline-block", // 숫자가 한 줄에 나오도록 설정
      }}
    >
      {currentDigit}
    </animated.span>
  );
};

// Counter 컴포넌트 타입 정의
interface CounterProps {
  from: number;
  to: number;
}

// useCounter 훅 대신 임시로 createCounterMap을 구현해 사용
const useCounter = () => {
  const createCounterMap = (from: number, to: number) => {
    const fromStr = String(from).padStart(2, '0');
    const toStr = String(to).padStart(2, '0');

    return fromStr.split('').map((digit, i) => {
      const start = parseInt(digit, 10);
      const end = parseInt(toStr[i], 10);

      const isIncreasing = end >= start;

      return { currentDigit: end, isIncreasing };
    });
  };

  return { createCounterMap };
};

const Counter: React.FC<CounterProps> = ({ from, to }) => {
  const { createCounterMap } = useCounter();

  const counterTransitionMap = createCounterMap(from, to);

  return (
    <span>
      <span>
        {counterTransitionMap.map(({ currentDigit, isIncreasing }, i) => {
          return (
            <Digit
              key={from !== to ? i : `${i}-${Math.random()}`}
              currentDigit={currentDigit}
              isIncreasing={isIncreasing}
            />
          );
        })}
      </span>
    </span>
  );
};

export default Counter;
