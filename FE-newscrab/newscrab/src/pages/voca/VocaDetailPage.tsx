import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import { VocaWithImages } from "@components/voca/VocaTypes";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VocaDetail from "@components/voca/VocaDetail";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import ArticleRcmd from "@components/voca/ArticleRcmd";
import { fetchVocaDetailThunk, updateVocaThunk, deleteVocaThunk  } from '@store/voca/vocaSlice';
import { RootState, AppDispatch } from "@store/index";
import { useEffect, useState } from "react";
import VocaEditModal from "@components/voca/VocaEditModal";
import { words } from "@components/voca/VocaList";

const VocaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border: solid 1px black;
  height: 80vh;
`;

const NewsContainer = styled.div`
  // border: solid 1px black;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  width: 55%;
  height: 17%;
`;

// 이전/다음 단어 컨테이너
// const WordsContainer = styled.div`
//   position: absolute;
//   top: 40%;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   justify-content: space-between;
//   width: 70%;
// `;

// const WordCard = styled.div`
//   background-color: #f4f4f9;
//   border-radius: 10px;
//   padding: 10px;
//   width: 120px;
//   text-align: center;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

const BackButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 12%;
  left: 10%;
  padding: 10px 15px;
  background-color: #FFBE98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  // font-weight: bold;
  color: white;
  &:hover {
    background-color: #FF8F4D;
  }
`;

const EditButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 12%;
  left: 20%;
  padding: 10px 15px;
  background-color: #FFBE98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  // font-weight: bold;
  color: white;
  &:hover {
    background-color: #FF8F4D;
  }
`;

const DelButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 12%;
  left: 28%;
  padding: 10px 15px;
  background-color: #FFBE98;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  // font-weight: bold;
  color: white;
  &:hover {
    background-color: #FF8F4D;
  }
`;

const VocaDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { vocaId } = useParams<{ vocaId: string }>();
  const dispatch: AppDispatch = useDispatch();

  // Redux store에서 selectedVoca 가져오기
  const selectedVoca = useSelector((state: RootState) => state.voca.selectedVoca);
  const loading = useSelector((state: RootState) => state.voca.loading);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  
  useEffect(() => {
    if (vocaId) {
      const numericVocaId = parseInt(vocaId, 10);  // 문자열을 숫자로 변환
      dispatch(fetchVocaDetailThunk(numericVocaId)); // 해당 단어의 상세 정보 API 호출
    }
  }, [dispatch, vocaId]);

  useEffect(() => {
    if (selectedVoca) {
      console.log("불러온 Voca 상세 정보:", selectedVoca); // 콘솔에 데이터를 출력
    }
  }, [selectedVoca]);


  // const mappedWords = mapWordsWithImages(mockWords);
  // const { word } = location.state as { word: VocaWithImages };
  // const [currentWord, setCurrentWord] = useState(word);

  const handleEditClick = () => {
    setIsModalOpen(true); // 수정 버튼 클릭 시 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 단어 수정 처리
  const handleUpdateVoca = async (updatedWord: {
    vocaId: number;
    vocaName: string;
    vocaDesc: string;
    sentence: string;
    newsId: number;
    industryId: number;
  }) => {
    const updatedData = {
      newsId: selectedVoca.originNewsId, 
      vocaName: updatedWord.vocaName,
      vocaDesc: updatedWord.vocaDesc,
      sentence: updatedWord.sentence,
      industryId: updatedWord.industryId,
    };

    await dispatch(updateVocaThunk({
      vocaId: updatedWord.vocaId,
      updatedData
    }));
    setIsModalOpen(false); 

    // voca 수정 후 데이터 다시 불러오기
  await dispatch(fetchVocaDetailThunk(updatedWord.vocaId));
  };

  // 단어 삭제 처리
  const handleDeleteVoca = async () => {
    if (vocaId) {
      await dispatch(deleteVocaThunk(parseInt(vocaId))); // DELETE 요청으로 단어 삭제
      navigate('/voca'); // 삭제 후 단어 리스트 페이지로 이동
    }
  };

  if (loading) {
    return <div>로딩 중...😵</div>; // 로딩 중일 때 표시
  }

  if (!selectedVoca) {
    return <div>단어 정보가 없습니다 😢</div>; // 데이터가 없을 때 표시
  }

  // industryId로 industryName과 img 매핑
  const industryData = words.find(word => word.industryId === selectedVoca.industryId);

  // 단어 클릭 시 해당 단어로 변경
  // const handleWordClick = (id: number) => {
  //   const newWord = mappedWords.find(w => w.vocaId === id);
  //   if (newWord) {
  //     setCurrentWord(newWord); // 단어 변경
  //     navigate(/voca/${id});
  //   }
  // };

  // const prevWord = mockWords.find(w => w.vocaId === currentWord.vocaId - 1);
  // const nextWord = mockWords.find(w => w.vocaId === currentWord.vocaId + 1);

  return (
    <div>
      <GlobalStyle />
      <VocaCommon />
      <BackButton onClick={() => navigate('/voca')}>돌아가기</BackButton>
      <EditButton onClick={handleEditClick}>수정</EditButton>
      <DelButton onClick={handleDeleteVoca}>삭제</DelButton>

      <VocaContainer>
        {/* <WordsContainer>
          {prevWord && (
            <WordCard onClick={() => handleWordClick(prevWord.vocaId)}>
              {prevWord.vocaName}
            </WordCard>
          )}
          {nextWord && (
            <WordCard onClick={() => handleWordClick(nextWord.vocaId)}>
              {nextWord.vocaName}
            </WordCard>
          )}
        </WordsContainer> */}
        {/* <VocaDetail word={selectedVoca} /> */}
        <VocaDetail
          img={industryData?.img || null}
          industryName={industryData?.industryName || null}
          vocaName={selectedVoca.vocaName}
          vocaDesc={selectedVoca.vocaDesc}
          sentence={selectedVoca.sentence}
        />

        <NewsContainer>
          {selectedVoca.relatedNews1 && <ArticleRcmd relatedNews={selectedVoca.relatedNews1} />}
          {selectedVoca.relatedNews2 && <ArticleRcmd relatedNews={selectedVoca.relatedNews2} />}
          {selectedVoca.relatedNews3 && <ArticleRcmd relatedNews={selectedVoca.relatedNews3} />}
        </NewsContainer>
      </VocaContainer>

      {isModalOpen && (
        <VocaEditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          word={selectedVoca}
          onUpdate={handleUpdateVoca} // 단어 수정 핸들러
        />
      )}
    </div>
  );
};

export default VocaDetailPage;