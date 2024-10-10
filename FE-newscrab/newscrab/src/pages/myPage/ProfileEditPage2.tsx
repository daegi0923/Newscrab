import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { words } from "@components/voca/VocaList";
import API from '@apis/apiClient';  // API 호출 시 사용
import Swal from 'sweetalert2';
import BgImage from "@assets/landing/bgImage.png";

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

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 2rem;
  position: relative;
  z-index: 2;
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

const Card = styled.div<{ $isHidden: boolean, $isTransparent: boolean }>`
  width: 120px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: grab;
  position: relative;
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  opacity: ${({ $isTransparent }) => ($isTransparent ? 0.3 : 1)};  /* 선택된 카드를 투명하게 */
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
  background-color: #2d9cdb;
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
  right: 45%;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #4e54c8, #2a72e5);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background: linear-gradient(90deg, #354b99, #1f60c4);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
const BackButton = styled.button`
  background-color: #2d9cdb;
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
  right: 52%;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #4e54c8, #2a72e5);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background: linear-gradient(90deg, #354b99, #1f60c4);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SignUpPage2: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signupForm = location.state?.signupForm || {
    loginId: "",
    password: "",
    name: "",
    email: "",
    birthday: "",
    gender: ""
  };

  // 이전에 선택한 산업군 받아오기
  const selectedIndustriesFromProfile = location.state?.selectedIndustries || [];

  // 우선순위에 맞게 정렬된 상태로 설정
  const sortedIndustries = Array(3).fill(null);
  selectedIndustriesFromProfile.forEach((industry: any) => {
    sortedIndustries[industry.preRank - 1] = {
      ...industry,
      img: words.find((item) => item.industryId === industry.industryId)?.img || ''
    };
  });

  // 선택된 산업군 상태 관리 (최대 3개를 유지)
  const [selectedIndustries, setSelectedIndustries] = useState<Array<{ img: string, industryId: number, industryName: string } | null>>(sortedIndustries);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(selectedIndustriesFromProfile.map((industry: any) => industry.industryId))  // 이미 선택된 항목의 ID 설정
  );

  // 드래그 시작 시 데이터 저장
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, industry: { img: string, industryId: number, industryName: string }) => {
    event.dataTransfer.setData('industry', JSON.stringify(industry));
  };

  // 드롭된 카드 처리
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const industry = JSON.parse(event.dataTransfer.getData('industry'));
    const newSelectedIndustries = [...selectedIndustries];
    const existingIndustry = newSelectedIndustries[index];

    // 기존 선택된 카드 취소
    if (existingIndustry) {
      setSelectedIds((prev) => {
        const updated = new Set(prev);
        updated.delete(existingIndustry.industryId);
        return updated;
      });
    }

    // 새로운 카드 드롭
    newSelectedIndustries[index] = industry;
    setSelectedIndustries(newSelectedIndustries);
    setSelectedIds((prev) => new Set(prev).add(industry.industryId));  // 드롭된 카드 ID 추가
  };

  // 카드 선택 취소
  const handleRemoveIndustry = (index: number) => {
    const newSelectedIndustries = [...selectedIndustries];
    const removedIndustry = newSelectedIndustries[index];

    // 선택 취소 시 카드 복구
    if (removedIndustry) {
      setSelectedIds((prev) => {
        const updated = new Set(prev);
        updated.delete(removedIndustry.industryId);  // 투명도 복구
        return updated;
      });
    }

    newSelectedIndustries[index] = null;  // 자리는 비워둠
    setSelectedIndustries(newSelectedIndustries);
  };

  const handleBack = async () => {
    navigate('/mypage')
  };

  // 저장 버튼 클릭 처리
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
        preRank: index + 1,  // 우선순위 설정
      })),
    };

    try {
      const response = await API.put("/user/userindustry", {
        userIndustry: updatedSignupForm.userIndustry,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '성공!',
          text: '정보가 업데이트되었습니다.',
        });
        navigate('/mypage');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '잘못된 요청',
          text: '다시 확인해 주세요.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '나중에 다시 시도해 주세요.',
        });
      }
    }
  };

  return (
    <BackgroundContainer>
      <ContentWrapper>
        <SignUpContainer>
          <TitleContainer>✅ 좋아하는 산업군을 1개 이상 우선 순위에 넣어주세요.</TitleContainer>
          {/* <p></p> */}
          <CardContainer>
            <IndustryGrid>
              {/* 선택 가능한 산업군 리스트 */} 
              {words.filter((industry) => industry.industryId !== 16).map((industry) => (
                <Card
                  key={industry.industryId}
                  draggable={!selectedIds.has(industry.industryId)}  // 이미 선택된 카드라면 드래그 불가
                  onDragStart={(event) => handleDragStart(event, industry)}
                  $isHidden={false}
                  $isTransparent={selectedIds.has(industry.industryId)}  // 선택된 카드는 투명하게
                >
                  <h4>{industry.industryName}</h4>
                  <img src={industry.img} alt={industry.industryName} />
                </Card>
              ))}
            </IndustryGrid>

            <DropContainer>
              {/* 드롭된 산업군 표시, 항상 3개 공간을 유지 */}
              {selectedIndustries.map((industry, index) => (
                <DropArea
                  key={index}
                  onDrop={(event) => handleDrop(event, index)}
                  onDragOver={(event) => event.preventDefault()}
                  onClick={() => handleRemoveIndustry(index)}
                  style={{
                    backgroundColor: '#fff',
                    border: '2px dashed #ccc',
                    borderRadius: '10px',
                    height: '160px',
                    width: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {industry ? (
                    <>
                      <img src={industry.img} alt={`순위 ${index + 1}`} />
                      <h4>{industry.industryName}</h4>
                    </>
                  ) : (
                    <p>{index + 1}순위</p>  // 텍스트를 중앙에 배치
                  )}
                </DropArea>
              ))}
            </DropContainer>
            <BackButton onClick={handleBack}>돌아가기</BackButton>
            <SaveButton onClick={handleSave}>저장</SaveButton>
          </CardContainer>
        </SignUpContainer>
      </ContentWrapper>
    </BackgroundContainer>
  );
};

export default SignUpPage2;
