import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import closedCookie from '@assets/common/forcoo.png';
import openCookieImage from '@assets/common/forkie.png';
import quotes from '../../../public/quotes.json'; // 파일 경로에 맞게 수정
import { darken } from 'polished';
import { useNavigate } from "react-router-dom";

// 빛나는 효과
const shine = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
`;
const flyIn = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0; // 처음에는 투명하게
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1; // 애니메이션이 완료되면 보이게
  }
`;

const MessagePaper = styled(animated.div)`
  width: 500px;
  height: 110px;
  padding: 35px;
  animation: ${flyIn} 2s forwards;
  color: #333; // 글자색
  text-align: center; // 내용 가운데 정렬
  background-image: url(image_slip.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// 쿠키가 열릴 때 스케일 애니메이션
const cookieAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

// 포춘 쿠키 이미지 (흔들림 애니메이션 적용)
const FortuneCookieImage = styled(animated.img)<{ $isSelected: boolean }>`
  width: 200px;
  height: 200px;
  margin: 40px;
  cursor: pointer;
  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      animation: ${shine} 3s infinite ease-in-out;
    `}
`;

const OpenedCookieImage = styled(animated.img)`
  width: 300px;
  height: 300px;
  animation: ${cookieAnimation} 1s forwards;
`;

const CookieCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 50px;
  overflow: hidden;
  width: 100px;
  background-color: #fff; /* 숫자 배경을 흰색으로 설정 */
  border: 3px solid #ccc; /* 슬롯 테두리를 회색으로 설정 */
  border-radius: 10px; /* 슬롯 모서리를 둥글게 처리 */
`;

const CookieCountNumber = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
`;

const Number = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border-radius: 5px; /* 숫자 부분의 모서리도 약간 둥글게 */
  color: #000; /* 숫자 텍스트 색상 */
  width: 80px; /* 슬롯 숫자 배경의 너비를 설정 */
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
  line-height: 1.5;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ResetButton = styled.button<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor}; /* props로 받은 배경색 */
  border: none; /* 테두리 없애기 */
  color: white; /* 텍스트 색상 */
  padding: 10px 20px; /* 여백 */
  text-align: center; /* 텍스트 가운데 정렬 */
  text-decoration: none; /* 밑줄 없애기 */
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer; /* 마우스 포인터 */
  border-radius: 5px; /* 둥근 테두리 */
  opacity: 0; /* 초기 투명 상태 */
  transition: opacity 2s ease, background-color 0.3s ease; /* 서서히 나타나는 효과 (2초 동안) + 배경색 전환 */
  animation: fadeIn 1s ease 1s forwards; /* 1초 후 서서히 나타나기 시작 */

  &:hover {
    background-color: ${({ $bgColor }) => darken(0.1, $bgColor)}; /* 호버 시 조금 더 어두운 색상 */
  }

  &:active {
    background-color: ${({ $bgColor }) => darken(0.2, $bgColor)}; /* 클릭 시 더 어두운 색상 */
  }

  @keyframes fadeIn {
    0% {
      opacity: 0; /* 완전 투명 */
    }
    100% {
      opacity: 1; /* 완전 불투명 */
    }
  }
`;

const FortuneCookieContent: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState<string | null>(null);
  const [fortuneAuthor, setFortuneAuthor] = useState<string | null>(null);
  const [cookieCount, setCookieCount] = useState(5); // 시작 숫자
  const [isShaking, setIsShaking] = useState(false); // 흔들림 상태 관리
  const [animateCount, setAnimateCount] = useState(false); // 숫자 애니메이션 상태 관리
  const [isSelected, setIsSelected] = useState(false); //
  const navigate = useNavigate();

  const openCookie = async () => {
    const idx = Math.floor(Math.random() * quotes.length);
    setFortuneMessage(quotes[idx].message);
    setFortuneAuthor(`${quotes[idx].author}`);
  };

  // 숫자가 올라가는 애니메이션 (한 칸씩 위로 이동)
  const countSpring = useSpring({
    from: { transform: `translateY(0px)` },
    to: { transform: `translateY(-50px)` }, // 숫자가 한 칸 위로 올라가도록 설정
    config: { tension: 200, friction: 20 }, // 애니메이션 속도
    reset: true, // 항상 처음 상태로부터 애니메이션 시작
    immediate: !animateCount, // handleClick이 발생할 때만 애니메이션 적용
  });

  const shakeSpring = useSpring({
    from: { transform: 'translateX(0px)' }, // 시작점
    to: { transform: 'translateX(20px)' }, // 끝점: 한번만 떨리도록 설정
    config: { tension: 1000, friction: 20 }, // 빠르게 떨리도록 설정
    reset: true, // 상태를 리셋해서 중복 떨림 방지
    onRest: () => setIsShaking(false), // 떨림이 끝나면 흔들림 멈춤
  });

  const hitCookie = () => {
    setIsShaking(true); // 흔들림 상태 true
    setAnimateCount(true); // 숫자 애니메이션을 실행하도록 설정

    if (cookieCount > 1) {
      setCookieCount(cookieCount - 1);
    } else {
      openCookie();
      setIsOpened(true);
    }
  };

  const handleClick = () => {
    console.log('click');
    if (isShaking) {
      return;
    }
    if (!isSelected) {
      setIsSelected(true);
    }
    console.log('hit');
    hitCookie();
    setTimeout(() => {
      setAnimateCount(false); // 애니메이션이 완료된 후 비활성화
    }, 200); // 애니메이션 지속 시간에 맞춰 비활성화
  };
  const handleClickReset = () => {
    setIsOpened(false);
    setIsSelected(false);
    setFortuneMessage(null);
    setFortuneAuthor(null);
    setCookieCount(5);
  };
  const openCookieSpring = useSpring({
    opacity: isOpened ? 1 : 0,
    transform: isOpened ? 'scale(1)' : 'scale(0)',
  });

  const handleClickBackButton = () => {
    navigate('/mypage');


  }
  return (
    <PageContainer>
      {!isOpened ? (
        <>
          <CookieCountContainer>
            <CookieCountNumber style={countSpring}>
              <Number>{cookieCount}</Number>
              <Number>{cookieCount}</Number>
            </CookieCountNumber>
          </CookieCountContainer>
          <FortuneCookieImage
            style={shakeSpring}
            $isSelected={isSelected}
            src={closedCookie}
            alt="Closed Fortune Cookie"
            onClick={handleClick}
          />
          <Description>
            바삭바삭한 포춘 쿠키 안에는
            <br />
            오늘 당신을 위한 메시지가 숨어 있습니다.
            <br />
            불안과 고민이 날아가도록
            <br />
            포춘 쿠키를 신나게 부숴 볼까요?!
          </Description>
        </>
      ) : (
        <>
          <OpenedCookieImage style={openCookieSpring} src={openCookieImage} alt="Open Fortune Cookie" />
          {fortuneMessage && (
            <>
              <MessagePaper>
                <p style={styles.fortuneMessage}>{fortuneMessage}</p>
                <p>{fortuneAuthor}</p>
              </MessagePaper>
              <div>
                <ResetButton $bgColor={'#4CAF50'} onClick={handleClickReset}>
                  새 포춘쿠키 열기
                </ResetButton>
                <ResetButton $bgColor={'#888'} onClick={handleClickBackButton}>
                  돌아가기
                </ResetButton>
              </div>
            </>
          )}
        </>
      )}
    </PageContainer>
  );
};

const styles = {
  fortuneMessage: {
    fontSize: '18px',
    fontWeight: 'bold',
    width: '80%',
  },
};
export default FortuneCookieContent;
