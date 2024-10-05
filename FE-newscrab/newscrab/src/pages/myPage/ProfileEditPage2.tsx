// import styled from "styled-components";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "@apis/apiClient";
// import { words } from "@components/voca/VocaList";
// import { AxiosError } from "axios"; // AxiosError 타입을 불러옴

// const SignUpContainer = styled.div`
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   h2 {
//     margin-bottom: 2%;
//     text-align: center;
//   }
//   h3 {
//     margin-left: 5%;
//   }
// `;

// const CardContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
// `;

// const Card = styled.div<{ isHidden: boolean }>`
//   width: 120px;
//   background-color: #f9f9f9;
//   border-radius: 10px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   cursor: grab;
//   position: relative;
//   visibility: ${({ isHidden }) =>
//     isHidden ? "hidden" : "visible"}; /* 카드가 선택되면 숨기기 */
//   img {
//     width: 100%;
//     height: 100%;
//   }
//   h4 {
//     position: absolute;
//     top: -8%;
//     left: 6%;
//     font-size: 15px;
//     font-weight: bold;
//     border-radius: 5px;
//   }
// `;

// const IndustryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   grid-gap: 20px;
//   margin-right: 50px;
// `;

// const DropArea = styled.div`
//   width: 120px;
//   height: 160px;
//   border: 2px dashed #ccc;
//   border-radius: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;
//   cursor: pointer;
//   position: relative;
//   h4 {
//     position: absolute;
//     top: -8%;
//     left: 6%;
//     font-size: 14px;
//     font-weight: bold;
//     border-radius: 5px;
//   }
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const DropContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SaveButton = styled.button`
//   background-color: #ffbe98;
//   border: none;
//   font-size: 14px;
//   border-radius: 10px;
//   height: 40px;
//   width: 80px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   &:hover {
//     background-color: #e09520;
//   }
// `;
// // Types for Industry
// interface Industry {
//   img: string;
//   industryId: number;
//   industryName: string;
// }


// const ProfileEdit2: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedIndustries, setSelectedIndustries] = useState<
//     Array<{ img: string; industryId: number; industryName: string } | null>
//   >([null, null, null]);
//   const [availableIndustries, setAvailableIndustries] = useState(
//     words.filter((industry) => industry.industryId !== 16)
//   );

//   const handleDragStart = (
//     event: React.DragEvent<HTMLDivElement>,
//     industry: { img: string; industryId: number; industryName: string }
//   ) => {
//     event.dataTransfer.setData("industry", JSON.stringify(industry));
//     const dragImg = new Image();
//     dragImg.src = industry.img;
//     dragImg.onload = () => {
//       event.dataTransfer.setDragImage(
//         dragImg,
//         dragImg.width / 2,
//         dragImg.height / 2
//       );
//     };
//   };

//   const handleDrop = (
//     event: React.DragEvent<HTMLDivElement>,
//     index: number
//   ) => {
//     const industry = JSON.parse(event.dataTransfer.getData("industry"));
//     const newSelectedIndustries = [...selectedIndustries];
//     newSelectedIndustries[index] = industry;
//     setSelectedIndustries(newSelectedIndustries);
//     setAvailableIndustries(
//       availableIndustries.filter(
//         (item) => item.industryId !== industry.industryId
//       )
//     );
//   };

//   const handleRemoveIndustry = (index: number) => {
//     const newSelectedIndustries = [...selectedIndustries];
//     const removedIndustry = newSelectedIndustries[index];
//     newSelectedIndustries[index] = null;
//     setSelectedIndustries(newSelectedIndustries);
//     const removedIndustryObj = words.find(
//       (item) => item.img === removedIndustry?.img
//     );
//     if (removedIndustryObj) {
//       setAvailableIndustries([...availableIndustries, removedIndustryObj]);
//     }
//   };

//   // PUT 요청으로 사용자 정보 업데이트
//   const handleSave = async () => {
//     console.log("선택된 산업군:", selectedIndustries.filter(Boolean));
//     const filteredIndustries = selectedIndustries.filter(Boolean) as {
//       img: string;
//       industryId: number;
//       industryName: string;
//     }[];

//     const updatedEditForm = {
//       userIndustry: filteredIndustries.map((industry, index) => ({
//         industryId: industry.industryId,
//         industryName: industry.industryName,
//         preRank: index + 1, // 산업 순위를 저장
//       })),
//     };

//     console.log("수정할 사용자 데이터:", updatedEditForm);

//     try {
//       const response = await API.put("/user/userindustry", {
//         userIndustry: updatedEditForm.userIndustry,
//       });

//       // 성공적으로 정보가 업데이트되었을 때 처리
//       if (response.status === 200) {
//         alert("사용자 정보가 성공적으로 업데이트되었습니다.");
//         navigate("/mainNews"); // 업데이트 후 메인 페이지로 이동
//       }
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response && error.response.status === 400) {
//           alert("잘못된 요청입니다. 다시 확인해주세요.");
//         } else {
//           alert("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
//         }
//       } else {
//         console.error("알 수 없는 오류:", error);
//         alert("알 수 없는 오류가 발생했습니다.");
//       }
//     }
//   };

//   return (
//     <SignUpContainer>
//       <h3>2단계 2/2</h3>
//       <h2>✅ 좋아하는 산업군을 3개 선택하세요</h2>

//       <CardContainer>
//         <IndustryGrid>
//           {availableIndustries.map((industry) => (
//             <Card
//               key={industry.industryId}
//               draggable
//               onDragStart={(event) => handleDragStart(event, industry)}
//               isHidden={selectedIndustries.some(
//                 (selected) => selected?.img === industry.img
//               )}
//             >
//               <h4>{industry.industryName}</h4>
//               <img src={industry.img} alt={industry.industryName} />
//             </Card>
//           ))}
//         </IndustryGrid>

//         <DropContainer>
//           {selectedIndustries.map((industry, index) => (
//             <DropArea
//               key={index}
//               onDrop={(event) => handleDrop(event, index)}
//               onDragOver={(event) => event.preventDefault()}
//               onClick={() => handleRemoveIndustry(index)}
//             >
//               {industry ? (
//                 <>
//                   <img src={industry.img} alt={`순위 ${index + 1}`} />
//                   <h4>{industry.industryName}</h4>
//                 </>
//               ) : (
//                 <p>{index + 1}순위</p>
//               )}
//             </DropArea>
//           ))}
//         </DropContainer>
//         <SaveButton onClick={handleSave}>저장</SaveButton>
//       </CardContainer>
//     </SignUpContainer>
//   );
// };

// export default ProfileEdit2;

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "@apis/apiClient";
import { words } from "@components/voca/VocaList";
import { AxiosError } from "axios";

// 스타일 정의
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
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
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

interface Industry {
  img: string;
  industryId: number;
  industryName: string;
}

const ProfileEdit2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIndustriesFromProfile = location.state?.selectedIndustries || [];

  // 초기 데이터 콘솔로 확인
  useEffect(() => {
    console.log("Props로 받아온 데이터:", selectedIndustriesFromProfile);
  }, [selectedIndustriesFromProfile]);

  const [selectedIndustries, setSelectedIndustries] = useState<
    Array<{ img: string; industryId: number; industryName: string } | null>
  >(
    selectedIndustriesFromProfile.length > 0
      ? selectedIndustriesFromProfile.map((industry: Industry) => ({
          ...industry,
          img: words.find((item) => item.industryId === industry.industryId)?.img || '', // 이미지 매핑
        }))
      : [null, null, null]
  );

  const [availableIndustries, setAvailableIndustries] = useState(
    words.filter((industry) =>
      industry.industryId !== 16 && // '기타' 제외
      !selectedIndustriesFromProfile.some(
        (selectedIndustry: Industry) =>
          selectedIndustry.industryId === industry.industryId
      )
    )
  );

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    industry: { img: string; industryId: number; industryName: string }
  ) => {
    event.dataTransfer.setData("industry", JSON.stringify(industry));
    const dragImg = new Image();
    dragImg.src = industry.img;
    dragImg.onload = () => {
      event.dataTransfer.setDragImage(
        dragImg,
        dragImg.width / 2,
        dragImg.height / 2
      );
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const industry = JSON.parse(event.dataTransfer.getData("industry"));
    const newSelectedIndustries = [...selectedIndustries];
    newSelectedIndustries[index] = industry;
    setSelectedIndustries(newSelectedIndustries);
    setAvailableIndustries(
      availableIndustries.filter(
        (item) => item.industryId !== industry.industryId
      )
    );
  };

  const handleRemoveIndustry = (index: number) => {
    const newSelectedIndustries = [...selectedIndustries];
    const removedIndustry = newSelectedIndustries[index];
    newSelectedIndustries[index] = null; // 빈공간 유지
    setSelectedIndustries(newSelectedIndustries);

    // 삭제된 아이템을 다시 선택 가능한 리스트로 복귀
    const removedIndustryObj = words.find(
      (item) => item.industryId === removedIndustry?.industryId
    );
    if (removedIndustryObj) {
      setAvailableIndustries([...availableIndustries, removedIndustryObj]);
    }
  };

  const handleSave = async () => {
    const filteredIndustries = selectedIndustries.filter(Boolean) as {
      img: string;
      industryId: number;
      industryName: string;
    }[];

    const updatedEditForm = {
      userIndustry: filteredIndustries.map((industry, index) => ({
        industryId: industry.industryId,
        industryName: industry.industryName,
        preRank: index + 1, // 순위를 저장
      })),
    };

    try {
      const response = await API.put("/user/userindustry", {
        userIndustry: updatedEditForm.userIndustry,
      });

      if (response.status === 200) {
        alert("사용자 정보가 성공적으로 업데이트되었습니다.");
        navigate("/mainNews");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          alert("잘못된 요청입니다. 다시 확인해주세요.");
        } else {
          alert("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        }
      } else {
        console.error("알 수 없는 오류:", error);
        alert("알 수 없는 오류가 발생했습니다.");
      }
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
              isHidden={selectedIndustries.some(
                (selected) => selected?.img === industry.img
              )}
            >
              <h4>{industry.industryName}</h4>
              <img src={industry.img} alt={industry.industryName} />
            </Card>
          ))}
        </IndustryGrid>

        <DropContainer>
          {selectedIndustries.map((industry, index) => (
            <DropArea
              key={index}
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onClick={() => handleRemoveIndustry(index)}
            >
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
  );
};

export default ProfileEdit2;
