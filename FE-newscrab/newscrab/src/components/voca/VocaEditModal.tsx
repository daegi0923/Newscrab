// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import DropDown from "@components/common/DropDown";
// import { words } from "@components/voca/VocaList";
// import Swal from 'sweetalert2';

// interface VocaModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   word: {
//     vocaId: number;
//     vocaName: string;
//     vocaDesc: string;
//     sentence: string;
//     newsId: number;
//     industryId: number;
//   };
//   onUpdate: (updatedWord: {
//     vocaId: number;
//     vocaName: string;
//     vocaDesc: string;
//     sentence: string;
//     newsId: number;
//     industryId: number;
//   }) => void;
// }

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 100;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 2%;
//   border-radius: 20px;
//   max-width: 400px;
//   width: 100%;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   position: relative;
//   animation: fadeIn 0.3s ease-in-out;

//   @keyframes fadeIn {
//     from { opacity: 0; transform: scale(0.95); }
//     to { opacity: 1; transform: scale(1); }
//   }
// `;

// const Button = styled.button`
//   margin: 10px;
//   border: none;
//   padding: 9px 20px;
//   border-radius: 25px;
//   background-color: #ff914d;
//   color: white;
//   font-size: 14px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
  
//   &:hover {
//     background-color: #e07b3a;
//   }
// `;

// const Input = styled.input`
//   width: 80%;
//   padding: 12px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 14px;
//   transition: border-color 0.3s ease;

//   &:focus {
//     border-color: #ff914d;
//   }
// `;

// const TextArea = styled.textarea`
//   width: 80%;
//   height: 150px;
//   padding: 12px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   resize: none;
//   font-size: 14px;
//   transition: border-color 0.3s ease;

//   &:focus {
//     border-color: #ff914d;
//   }
// `;

// const SelectedIndustry = styled.div`
//   margin: 5px 0 8px 7.8%;
//   // margin-left: 7.5%;
//   padding: 8px;
//   width: 80%;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   background-color: #f9f9f9;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
  
//   &:hover {
//     background-color: #ff914d;
//     color: white;
//   }
// `;

// const DropdownWrapper = styled.div`
//   position: absolute;
//   top: 75%;
//   width: 80%;
//   left: 10%;
//   background: white;
//   border-radius: 5px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   z-index: 10;
// `;

// const VocaEditModal: React.FC<VocaModalProps> = ({
//   isOpen,
//   onClose,
//   word,
//   onUpdate,
// }) => {
//   const [vocaName, setVocaName] = useState(word.vocaName);
//   const [vocaDesc, setVocaDesc] = useState(word.vocaDesc);
//   const [sentence, setSentence] = useState(word.sentence);
//   const [, setNewsId] = useState(word.newsId);
//   const [industryId, setIndustryId] = useState(word.industryId);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const selectedIndustryName =
//     words.find((ind) => ind.industryId === industryId)?.industryName ||
//     "산업을 선택하세요";

//   useEffect(() => {
//     setVocaName(word.vocaName);
//     setVocaDesc(word.vocaDesc);
//     setSentence(word.sentence);
//     setNewsId(word.newsId);
//     setIndustryId(word.industryId);
//   }, [word]);

//   if (!isOpen) return null;

//   const handleSave = () => {
//     if (!vocaName || !vocaDesc || !industryId) {
//       Swal.fire({
//         icon: 'warning',
//         title: '입력 오류',
//         text: '모든 필드를 채워주세요!',
//       });
//       return;
//     }
  
//     onUpdate({
//       vocaId: word.vocaId,
//       vocaName,
//       vocaDesc,
//       sentence,
//       newsId: word.newsId,
//       industryId,
//     });
  
//     // SweetAlert2 수정 완료 메시지
//     Swal.fire({
//       icon: 'success',
//       title: '수정 완료',
//       text: '단어 수정이 완료되었습니다!',
//     });
  
//     onClose();
//   };

//   const handleIndustrySelect = (id: number) => {
//     setIndustryId(id); // Update the selected industry ID
//     setIsDropdownOpen(false); // Close the dropdown after selection
//   };

//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <h1>단어 수정</h1>
//         {/* <div>
//           <Input
//             type="text"
//             value={vocaName}
//             onChange={(e) => setVocaName(e.target.value)}
//             placeholder="단어 이름을 입력하세요"
//           />
//         </div> */}
//         <h3>{vocaName}</h3>
//         <div>
//           <TextArea
//             value={vocaDesc}
//             onChange={(e) => setVocaDesc(e.target.value)}
//             placeholder="단어 설명을 입력하세요"
//           />
//         </div>
//         {/* <div>
//           <Input
//             type="number"
//             value={industryId}
//             onChange={(e) => setIndustryId(Number(e.target.value))}
//             placeholder="산업 ID를 입력하세요"
//           />
//         </div> */}
//         <SelectedIndustry onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//           {/* Show the selected industry or prompt */}
//           {selectedIndustryName}
//         </SelectedIndustry>
//         {isDropdownOpen && (
//           <DropdownWrapper>
//             <DropDown
//               dropdownIndustries={words}
//               handleIndustrySelect={handleIndustrySelect}
//             />
//           </DropdownWrapper>
//         )}

//         <div>
//           <Button onClick={onClose}>닫기</Button>
//           <Button onClick={handleSave}>수정하기</Button>
//         </div>
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default VocaEditModal;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "@components/common/DropDown";
import { words } from "@components/voca/VocaList";
import Swal from "sweetalert2";

interface VocaModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: {
    vocaId: number;
    vocaName: string;
    vocaDesc: string;
    sentence: string;
    newsId: number;
    industryId: number;
  };
  onUpdate: (updatedWord: {
    vocaId: number;
    vocaName: string;
    vocaDesc: string;
    sentence: string;
    newsId: number;
    industryId: number;
  }) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2%;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Button = styled.button`
  margin: 10px;
  border: none;
  padding: 9px 20px;
  border-radius: 25px;
  background-color: #ff914d;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e07b3a;
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff914d;
  }
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 150px;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff914d;
  }
`;

const SelectedIndustryWrapper = styled.div`
  display: flex;
  // margin-left: 50%;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const SelectedIndustry = styled.div`
  padding: 3px 8px;
  // background-color: #f1f1f1;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff914d;
    color: white;
  }
`;

const WordName = styled.h3`
  margin: 0;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 26%;
  width: 80%;
  left: 34%;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const VocaEditModal: React.FC<VocaModalProps> = ({
  isOpen,
  onClose,
  word,
  onUpdate,
}) => {
  const [vocaName, setVocaName] = useState(word.vocaName);
  const [vocaDesc, setVocaDesc] = useState(word.vocaDesc);
  const [sentence, setSentence] = useState(word.sentence);
  const [, setNewsId] = useState(word.newsId);
  const [industryId, setIndustryId] = useState(word.industryId);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedIndustryName =
    words.find((ind) => ind.industryId === industryId)?.industryName ||
    "산업을 선택하세요";

  useEffect(() => {
    setVocaName(word.vocaName);
    setVocaDesc(word.vocaDesc);
    setSentence(word.sentence);
    setNewsId(word.newsId);
    setIndustryId(word.industryId);
  }, [word]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!vocaName || !vocaDesc || !industryId) {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: "모든 필드를 채워주세요!",
      });
      return;
    }

    onUpdate({
      vocaId: word.vocaId,
      vocaName,
      vocaDesc,
      sentence,
      newsId: word.newsId,
      industryId,
    });

    Swal.fire({
      icon: "success",
      title: "수정 완료",
      text: "단어 수정이 완료되었습니다!",
    });

    onClose();
  };

  const handleIndustrySelect = (id: number) => {
    setIndustryId(id); // Update the selected industry ID
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h1>단어 수정</h1>
        <SelectedIndustryWrapper>
          <SelectedIndustry onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedIndustryName}
          </SelectedIndustry>
          <WordName>{vocaName}</WordName>
        </SelectedIndustryWrapper>

        <div>
          <TextArea
            value={vocaDesc}
            onChange={(e) => setVocaDesc(e.target.value)}
            placeholder="단어 설명을 입력하세요"
          />
        </div>

        {isDropdownOpen && (
          <DropdownWrapper>
            <DropDown
              dropdownIndustries={words}
              handleIndustrySelect={handleIndustrySelect}
            />
          </DropdownWrapper>
        )}

        <div>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={handleSave}>수정하기</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default VocaEditModal;
