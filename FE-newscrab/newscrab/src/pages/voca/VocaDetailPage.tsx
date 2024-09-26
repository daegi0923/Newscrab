import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import { VocaWithImages } from "@components/voca/VocaTypes";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VocaDetail from "@components/voca/VocaDetail";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import ArticleRcmd from "@components/voca/ArticleRcmd";
import { fetchVocaDetailThunk } from '@store/voca/vocaSlice';
import { RootState, AppDispatch } from "@store/index";
import { useEffect } from "react";

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

// // 데이터 매핑 함수: mockWords의 industryId와 words 배열의 industryId를 매칭
// const mapWordsWithImages = (mockWords: VocaResponseDto[]): VocaWithImages[] => {
//   return mockWords.map((mockWord) => {
//     return { 
//       ...mockWord, 
//       img: `img_for_${mockWord.vocaId}.png`,
//       industryName: `${mockWord.vocaId}`,
//     }
//   });
// };

const VocaDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { vocaId } = useParams<{ vocaId: string }>();
  const dispatch: AppDispatch = useDispatch();

  // Redux store에서 selectedVoca 가져오기
  const selectedVoca = useSelector((state: RootState) => state.voca.selectedVoca);
  const loading = useSelector((state: RootState) => state.voca.loading);
  
  useEffect(() => {
    if (vocaId) {
      const numericVocaId = parseInt(vocaId, 10);  // 문자열을 숫자로 변환
      dispatch(fetchVocaDetailThunk(numericVocaId)); // 해당 단어의 상세 정보 API 호출
    }
  }, [dispatch, vocaId]);


  // const mappedWords = mapWordsWithImages(mockWords);
  const { word } = location.state as { word: VocaWithImages };
  // const [currentWord, setCurrentWord] = useState(word);

  const handleBackClick = () => {
    navigate('/voca');
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  if (!selectedVoca) {
    return <div>단어 정보를 불러오지 못했습니다.</div>; // 데이터가 없을 때 표시
  }

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
      <BackButton onClick={handleBackClick}>돌아가기</BackButton>

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
        <VocaDetail word={word} />
        <NewsContainer>
          {selectedVoca.relatedNews1 && <ArticleRcmd relatedNews={selectedVoca.relatedNews1} />}
          {selectedVoca.relatedNews2 && <ArticleRcmd relatedNews={selectedVoca.relatedNews2} />}
          {selectedVoca.relatedNews3 && <ArticleRcmd relatedNews={selectedVoca.relatedNews3} />}
        </NewsContainer>
      </VocaContainer>
    </div>
  );
};

export default VocaDetailPage;