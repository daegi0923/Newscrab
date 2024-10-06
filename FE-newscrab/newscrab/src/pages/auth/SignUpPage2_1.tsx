import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { words } from "@components/voca/VocaList";
import axios from 'axios';
import BgImage from "@assets/landing/bgImage.png";
import Swal from 'sweetalert2';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 2rem;
  position: relative;
  z-index: 2; /* 오버레이보다 위에 표시 */
`;

const StepIndicator = styled.div`
  width: 100%;
  text-align: left;  
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;  
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SignUpContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 2px 15px 55px;
  width: 70%;
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
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
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
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
  grid-gap: 30px;
  margin-right: 50px;
`;

const DropArea = styled.div`
  width: 120px;
  height: 160px;
  border: 2px dashed rgba(0, 0, 0, 0.5);
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
  background-color: #2d9cdb;; /* 새로운 블루 그라데이션 */
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: white;
  border-radius: 50px;
  height: 34px;
  width: 70px;
  cursor: pointer;
  position: absolute;
  top: 90.5%; 
  right: 48%;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15); /* 부드러운 그림자 */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #4e54c8, #2a72e5); /* 호버 시 조금 더 어두운 톤 */
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25); /* 살짝 진해지는 그림자 */
  }

  &:active {
    background: linear-gradient(90deg, #354b99, #1f60c4); /* 클릭 시 더 진해짐 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 축소 */
  }
`;

const BackgroundContainer = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); 
  z-index: 1; /* 가장 아래 */
`;

const SignUpPage2: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { signupForm } = location.state; // 앞에서 전달 받은 form
  const signupForm = location.state?.signupForm || {
    loginId: "",
    password: "",
    name: "",
    email: "",
    birthday: "",
    gender: ""
  };
  const [selectedIndustries, setSelectedIndustries] = useState<Array<{ img: string, industryId: number, industryName: string } | null>>([null, null, null]);
  const [availableIndustries, setAvailableIndustries] = useState(words.filter((industry) => industry.industryId !== 16));

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, industry: { img: string, industryId: number, industryName: string }) => {
    event.dataTransfer.setData('industry', JSON.stringify(industry));
    const dragImg = new Image();
    dragImg.src = industry.img;
    dragImg.onload = () => {
      event.dataTransfer.setDragImage(dragImg, dragImg.width / 2, dragImg.height / 2);
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const industry = JSON.parse(event.dataTransfer.getData('industry'));
    const newSelectedIndustries = [...selectedIndustries];
    newSelectedIndustries[index] = industry;
    setSelectedIndustries(newSelectedIndustries);

    setAvailableIndustries(availableIndustries.filter((item) => item.industryId !== industry.industryId));
  };

  const handleRemoveIndustry = (index: number) => {
    const newSelectedIndustries = [...selectedIndustries];
    const removedIndustry = newSelectedIndustries[index];
    newSelectedIndustries[index] = null;
    setSelectedIndustries(newSelectedIndustries);

    const removedIndustryObj = words.find((item) => item.img === removedIndustry?.img);
    if (removedIndustryObj) {
      setAvailableIndustries([...availableIndustries, removedIndustryObj]);
    }
  };

  const handleSave = async () => {
    const filteredIndustries = selectedIndustries.filter(Boolean) as { img: string, industryId: number, industryName: string }[];
    
    if (filteredIndustries.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: '선택 오류',
        text: '최소 1개의 산업군을 선택해야 합니다.',
      });
      return;
    }

    const updatedSignupForm = {
      ...signupForm,
      userIndustry: filteredIndustries.map((industry, index) => ({
        industryId: industry.industryId,
        industryName: industry.industryName,
        preRank: index + 1,
      })),
    };
    
    try {
      const response = await axios.post('https://newscrab.duckdns.org/api/v1/user/join', {
        loginId: updatedSignupForm.loginId,
        password: updatedSignupForm.password,
        name: updatedSignupForm.name,
        email: updatedSignupForm.email,
        birthday: updatedSignupForm.birthday,
        gender: updatedSignupForm.gender,
        userIndustry: updatedSignupForm.userIndustry
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: '로그인 페이지로 이동합니다.',
        });
        navigate('/login1');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '회원가입 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <BackgroundContainer>
      <Overlay/>
      <ContentWrapper>
        <StepIndicator>2단계 2/2</StepIndicator>
        <SignUpContainer>
          <TitleContainer>✅ 좋아하는 산업군을 1개 이상 선택하세요</TitleContainer>
          <CardContainer>
            <IndustryGrid>
              {availableIndustries.map((industry) => (
                <Card
                  key={industry.industryId}
                  draggable
                  onDragStart={(event) => handleDragStart(event, industry)}
                  isHidden={selectedIndustries.some(selected => selected?.img === industry.img)}
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
                      <h4>{industry.industryName}</h4>
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
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default SignUpPage2;