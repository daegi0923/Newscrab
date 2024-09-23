import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { words } from "@components/voca/VocaList";
import axios from 'axios';

const SignUpContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 2%;
    text-align: center;
  }
  h3 {
    margin-left: 5%;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div<{ isHidden: boolean }>`
  width: 120px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: grab;
  position: relative;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')}; /* 카드가 선택되면 숨기기 */
  img {
    width: 100%;
    height: 100%;
  }
  h4 {
    position: absolute;
    top: -8%;
    left: 6%;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
  }
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  margin-right: 50px;
`;

const DropArea = styled.div`
  width: 120px;
  height: 160px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  h4 {
    position: absolute;
    top: -8%;
    left: 6%;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #ffbe98;
  border: none;
  font-size: 14px;
  border-radius: 10px;
  height: 40px;
  width: 80px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    background-color: #e09520;
  }
`;

const SignUpPage2: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signupForm } = location.state; // 앞에서 전달 받은 form
  const [selectedIndustries, setSelectedIndustries] = useState<Array<{ img: string, industryId: number, industryName: string } | null>>([null, null, null]);
  const [availableIndustries, setAvailableIndustries] = useState(words.filter((industry) => industry.industryId !== 16));

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, industry: { img: string, industryId: number, industryName: string }) => {
    event.dataTransfer.setData('industry', JSON.stringify(industry)); // 객체를 JSON으로 직렬화하여 전달
 
    const dragImg = new Image();
    dragImg.src = industry.img;
    dragImg.onload = () => {
      event.dataTransfer.setDragImage(dragImg, dragImg.width / 2, dragImg.height / 2); // 드래그 시 선명한 이미지 표시
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const industry = JSON.parse(event.dataTransfer.getData('industry')); // JSON으로 역직렬화하여 객체로 변환
    const newSelectedIndustries = [...selectedIndustries];
    newSelectedIndustries[index] = industry;
    setSelectedIndustries(newSelectedIndustries);

    // 선택된 카드는 CardContainer에서 사라지도록
    setAvailableIndustries(availableIndustries.filter((item) => item.industryId !== industry.industryId));
  };

  const handleRemoveIndustry = (index: number) => {
    const newSelectedIndustries = [...selectedIndustries];
    const removedIndustry = newSelectedIndustries[index];
    newSelectedIndustries[index] = null;
    setSelectedIndustries(newSelectedIndustries);

    // 선택 취소된 카드를 다시 availableIndustries에 추가
    const removedIndustryObj = words.find((item) => item.img === removedIndustry?.img);
    if (removedIndustryObj) {
      setAvailableIndustries([...availableIndustries, removedIndustryObj]);
    }
  };

  // Save 버튼 클릭 시 선택된 산업군을 콘솔에 출력
  const handleSave = async () => {
    console.log("선택된 산업군:", selectedIndustries.filter(Boolean));
    const filteredIndustries = selectedIndustries.filter(Boolean) as { img: string, industryId: number, industryName: string }[];
    const updatedSignupForm = {
      ...signupForm,
      userIndustry: filteredIndustries.map((industry, index) => ({
        industryId: industry.industryId,
        industryName: industry.industryName,
        preRank: index + 1, // Store the order as preRank (1 for first, 2 for second, etc.)
    })),
    };
    console.log("회원가입 데이터:", updatedSignupForm);

    try {
      const response = await axios.post('https://newscrab.duckdns.org/api/v1/users/join', {
        loginId: updatedSignupForm.loginId,
        password: updatedSignupForm.password,
        name: updatedSignupForm.nickname,
        email: updatedSignupForm.email,
        birthday: updatedSignupForm.birthday,
        gender: updatedSignupForm.gender,
        userIndustry: updatedSignupForm.userIndustry
      });

      // 회원가입 성공 시, 다른 페이지로 이동
      if (response.status === 200) {
        alert('회원가입 성공!');
        navigate('/mainNews'); // 예시로 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <SignUpContainer>
      <h3>2단계 2/2</h3>
      <h2>✅ 좋아하는 산업군을 3개 선택하세요</h2>
      
      <CardContainer>
        <IndustryGrid>
          {availableIndustries.map((industry) => (
            <Card
              key={industry.industryId}
              draggable
              onDragStart={(event) => handleDragStart(event, industry)}
              isHidden={selectedIndustries.some(selected => selected?.img === industry.img)} // 선택된 카드는 숨기기
            >
              <h4>{industry.industryName}</h4>
              <img src={industry.img} alt={industry.industryName} />
            </Card>
          ))}
        </IndustryGrid>

        <DropContainer>
          {selectedIndustries.map((industry, index) => (
            <DropArea key={index} 
              onDrop={(event) => handleDrop(event, index)} 
              onDragOver={(event) => event.preventDefault()}
              onClick={() => handleRemoveIndustry(index)}>
              {industry ? (
                <>
                  <img src={industry.img} alt={`순위 ${index + 1}`} />
                  <h4>{industry.industryName}</h4> {/* 산업 이름 표시 */}
                </>
              ) : (
                <p>{index + 1}순위</p>
              )}
            </DropArea>
          ))}
        </DropContainer>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </CardContainer>
    </SignUpContainer>
  );
};

export default SignUpPage2;
