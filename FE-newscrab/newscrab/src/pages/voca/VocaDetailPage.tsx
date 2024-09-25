import GlobalStyle from "@components/GlobalStyle";
import VocaCommon from "@pages/voca/VocaCommon";
import { VocaWithImages } from "@components/voca/VocaTypes";
import { useLocation, useNavigate } from 'react-router-dom';
import VocaDetail from "@components/voca/VocaDetail";
import styled from "styled-components";
import ArticleRcmd from "@components/voca/ArticleRcmd";

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
  border: solid 1px black;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  width: 54%;
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
  // const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  
  // const mappedWords = mapWordsWithImages(mockWords);
  const { word } = location.state as { word: VocaWithImages };
  // const [currentWord, setCurrentWord] = useState(word);

  const handleBackClick = () => {
    navigate('/voca');
  };

  // 단어 클릭 시 해당 단어로 변경
  // const handleWordClick = (id: number) => {
  //   const newWord = mappedWords.find(w => w.vocaId === id);
  //   if (newWord) {
  //     setCurrentWord(newWord); // 단어 변경
  //     navigate(`/voca/${id}`);
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
          <ArticleRcmd newsId={word.relatedNewsId1} />
          <ArticleRcmd newsId={word.relatedNewsId2} />
          <ArticleRcmd newsId={word.relatedNewsId3} />
        </NewsContainer>
      </VocaContainer>
    </div>
  );
};

export default VocaDetailPage;
