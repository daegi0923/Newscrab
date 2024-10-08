import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { getScrapData, postScrap, putScrap, getScrap } from "@apis/scrap/scrapApi"; // postScrap 함수 import
import { addVocaThunk, updateVocaThunk, deleteVocaThunk } from "@store/voca/vocaSlice";
import DropDown from "@components/common/DropDown";
import { words } from "@components/voca/VocaList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import addIcon from "@assets/common/add.png";
import removeIcon from "@assets/common/remove.png";
import NewsDetailAISummary from "./NewsDetailAISummary";
import NewsDetailAIQuestion from "./NewsDetailAIQuestion";
import Swal from "sweetalert2";
import { Vocalist } from "../../../types/scrapTypes";

const Sidebar = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  height: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* SaveButton의 절대 위치를 위한 relative 설정 */
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background-color: ${({ $active }) => ($active ? "#007BFF" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  min-height: 40px;
  box-sizing: border-box;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"};

  &:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledTextarea = styled.textarea<{ $isOverflowing: boolean }>`
  font-family: "SUIT Variable", sans-serif; /* 폰트 적용 */
  width: 100%;
  height: auto;
  max-height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
  resize: none;
  background-color: #fff;
  margin-top: 10px;
  white-space: pre-wrap;
  overflow-y: ${({ $isOverflowing }) => ($isOverflowing ? "auto" : "hidden")};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  clip-path: inset(0 round 8px);
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  position: absolute; /* 위치를 고정 */
  bottom: -50px; /* 아래에서 10px 띄움 */
  right: 0px; /* 오른쪽에서 10px 띄움 */

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #45a049ㄹ;
  }
`;

const SelectedIndustry = styled.div`
  padding: 3px 7px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden;
  text-overflow: ellipsis; /* 긴 텍스트 생략 */
`;

const VocaSection = styled.div`
  border: 1px solid #818181;
  border-radius: 12px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 85%;
  position: relative; /* Remove 버튼 위치를 위한 설정 */
`;

const VocaInputWrapper = styled.div`
  font-family: "SUIT Variable", sans-serif; /* 폰트 적용 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  padding: 10px;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #818181; /* 실선 색상 */
  margin: 5px 0; /* 위아래 여백 */
`;

const IndustryDropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  // margin-bottom: 10px; /* 아래 여백 */
`;

const StyledInput = styled.input`
  font-family: "SUIT Variable", sans-serif; /* 폰트 적용 */
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;
`;

const RemoveButton = styled.img`
  position: absolute;
  top: 50%; /* 중앙정렬을 위해 top을 50%로 */
  right: -40px; /* 오른쪽 옆에 배치 */
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: translateY(-50%); /* 수직 중앙정렬 */
`;

const AddButton = styled.img`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const SelectedIndustryWrapper = styled.div`
  position: relative;
  padding: 5px 10px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 20%; /* 선택된 산업 바로 아래에 드롭다운을 배치 */
  right: 50%;
  width: 100%; /* 드롭다운 너비를 SelectedIndustry와 동일하게 */
  z-index: 10; /* 다른 요소 위에 표시 */
  background-color: white; /* 드롭다운이 분명하게 보이도록 배경색 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가로 시각적인 분리 */
`;

interface VocaUpdate {
  vocaId: number;
  newsId: number;
  vocaName: string;
  vocaDesc: string;
  industryId: number;
}

interface VocaAdd {
  newsId: number;
  vocaName: string;
  vocaDesc: string;
  industryId: number;
}

interface Voca {
  vocaId: number;
  vocaName: string;
  vocaDesc: string;
  industryId: number;
}

const NewsDetailScrap: React.FC<{ newsId: number }> = ({ newsId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [scrapId, setScrapId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [summaryText, setSummaryText] = useState("");
  const [opinionText, setOpinionText] = useState("");
  const [wordListText, setWordListText] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  // const [vocaList, setVocaList] = useState<{ vocaName: string; vocaDesc: string, industryId: number }[]>([]);

  // vocaSections 배열에 드롭다운 상태도 포함
  const [vocaSections, setVocaSections] = useState<
    {
      word: string;
      desc: string;
      industryId: number | null;
      isDropdownOpen: boolean;
    }[]
  >([{ word: "", desc: "", industryId: null, isDropdownOpen: false }]);
  // Voca 섹션 추가 함수
  const handleAddSection = () => {
    setVocaSections([
      ...vocaSections,
      { word: "", desc: "", industryId: null, isDropdownOpen: false },
    ]);
  };

  const handleRemoveSection = async (index: number) => {
    const section = vocaSections[index];
    const newSections = vocaSections.filter((_, i) => i !== index);
      setVocaSections(newSections);

    if (section.word && scrapId) {
      try {
        // Scrap 데이터를 가져와서 existingWords로 설정
        const existingWords = await getScrap(scrapId);
        const existingVoca = existingWords.vocalist.find(
          (voca: Voca) => voca.vocaName === section.word
        );
  
        if (existingVoca && existingVoca.vocaId) {
          await dispatch(deleteVocaThunk(existingVoca.vocaId));
          Swal.fire({
            icon: "success",
            title: "삭제 완료",
            text: "단어가 성공적으로 삭제되었습니다.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "삭제 실패",
          text: "단어 삭제 중 오류가 발생했습니다.",
        });
      }
    }
  };

  // Redux에서 하이라이트(highlight) 정보 가져오기
  const highlights = useSelector(
    (state: RootState) => state.highlight.highlights
  );

  const summaryTextareaRef = useRef<HTMLTextAreaElement>(null);
  const opinionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const wordListTextareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setIsOverflowing(textarea.scrollHeight > 300);
    }
  };

  // 요약 텍스트를 업데이트하는 함수
  const handleTransferText = (newSummary: string) => {
    setSummaryText((prevSummary) => prevSummary + "\n\n" + newSummary); // 기존 요약에 새 텍스트를 추가
  };

  // 의견 텍스트를 업데이트하는 함수
  const handleTransferOpinionText = (newOpinion: string) => {
    setOpinionText((prevOpinion) => prevOpinion + "\n\n" + newOpinion); // 기존 의견에 새 텍스트를 추가
  };

  // getScrapData를 이용해 서버에서 데이터를 불러오기
  useEffect(() => {
    const fetchScrapData = async () => {
      try {
        const data = await getScrapData(); // 필요한 경우, page와 size를 인자로 전달
        // console.log("Fetched data!:", data);

        const selectedScrap = data.data.data.find(
          (item) => item.newsId === newsId
        );

        if (selectedScrap) {
          // console.log("Selected Scrap:", selectedScrap); // selectedScrap 확인
          // console.log("News ID:", selectedScrap.newsId); // 찾은 뉴스 ID 확인
          // console.log("Scrap ID:", selectedScrap.scrapId); // 찾은 scrapId 확인

          setScrapId(selectedScrap.scrapId || null); // scrapId 설정
          setSummaryText(selectedScrap.scrapSummary || "");
          setOpinionText(selectedScrap.comment || "");
          setWordListText(selectedScrap.vocalist?.join(", ") || ""); // vocalist 배열을 문자열로 변환
        } else {
          // console.log("No scrap data found for this newsId:", newsId);
        }
      } catch (error) {
        // console.error("Error fetching scrap data:", error);
      }
    };

    fetchScrapData();
  }, [newsId]);
  
  useEffect(() => {
    const fetchGetScrapData = async () => {
      if (scrapId !== null) {
        try {
          const data = await getScrap(scrapId);
          console.log("Fetched data!!!:", data);
  
          if (data && data.vocalist) {
            console.log("Selected Scrap:", data); // 스크랩 데이터 확인
  
            // vocalist 배열을 사용해 기본 단어 섹션 값을 설정
            const VocaList = data.vocalist.map((vocaItem) => ({
              industryId: vocaItem.industryId || null, // industryId를 사용 (필요 시)
              word: vocaItem.vocaName || "", // 기본 단어 값 설정
              desc: vocaItem.vocaDesc || "", // 기본 설명 값 설정
              isDropdownOpen: false, // 드롭다운 기본값
            }));
  
            setVocaSections(VocaList); // vocaSections 상태를 업데이트하여 기본값 설정
          }
        } catch (error) {
          console.error("Error fetching scrap data:", error);
        }
      }
    };
  
    fetchGetScrapData();
  }, [scrapId]); // scrapId가 변경될 때마다 호출
    
  useEffect(() => {
    adjustHeight(summaryTextareaRef.current);
    adjustHeight(opinionTextareaRef.current);
    adjustHeight(wordListTextareaRef.current);
  }, [summaryText, opinionText, wordListText, activeTab]);

  const handleSave = async () => {
    // 선택된 단어들 중 산업이 선택되지 않은 경우 체크
    const hasEmptyIndustry = vocaSections.some(
      (section) => section.industryId === null && section.word !== ""
    );
  
    const postscrapData = {
      newsId: newsId,
      comment: opinionText,
      scrapSummary: summaryText.trim() === "<서론>\n\n<본론>\n\n<결론>" ? "" : summaryText,
      highlights: highlights,
    };
  
    // 단어가 입력된 항목만 추가 (빈 단어 제외)
    const vocaAddList = vocaSections
      .filter((section) => section.word.trim() !== "")
      .map((section) => ({
        newsId: newsId,
        vocaName: section.word,
        vocaDesc: section.desc,
        industryId: section.industryId!,
      }));
  
    // 단어가 입력되었는데 산업이 선택되지 않은 경우 오류 처리
    if (hasEmptyIndustry) {
      Swal.fire({
        icon: "warning",
        title: "저장 오류",
        html: '<p style="line-height: 1.2;">단어를 입력했을 때는 반드시 산업을 선택해야 합니다.</p>',
      });
      return;
    }
  
    try {
      Swal.fire({
        title: "단어 추가 중...👩‍💻",
        html: "단어 추가를 확인 중입니다. 잠시만 기다려 주세요.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      if (scrapId !== null) {
        const existingWords = await getScrap(scrapId);
        console.log('단어 뭉탱 있음~~~', existingWords.vocalist)
        
        // 기존 단어 수정 또는 새로운 단어 추가
        for (const section of vocaSections) {
          const existingWord = existingWords.vocalist.find(
            (voca: Voca) => voca.vocaName === section.word
          );
          console.log('단어 있음~~~', existingWord)
          if (existingWord && existingWord.vocaId) {
            // 기존 단어가 있고, 설명이나 산업이 달라졌을 경우 수정 요청
            if (
              existingWord.vocaDesc !== section.desc ||
              existingWord.industryId !== section.industryId
            ) {
              console.log("수정 단어:", existingWord, existingWord.vocaId);
  
              // const updatedData = {
              //   newsId: newsId,
              //   vocaName: section.word,
              //   vocaDesc: section.desc,
              //   industryId: section.industryId ?? 0,
              // };
              try {
                await dispatch(
                  updateVocaThunk({
                    vocaId: existingWord.vocaId, // 해당 단어 ID
                    updatedData : {
                      newsId: newsId,
                      vocaName: section.word,
                      vocaDesc: section.desc,
                      industryId: section.industryId ?? 0,
                    }
                  })
                );
                console.log('수정 성공!!');
              } catch (error) {
                console.error('수정 오류 발생!!', error);
                throw error; // 오류가 발생하면 상위 catch로 넘김
              }
            }
          } else if (section.word.trim() !== "") {
            // 새로운 단어일 경우 추가 리스트에 포함
            const newWordData = {
              newsId: newsId,
              vocaName: section.word,
              vocaDesc: section.desc,
              industryId: section.industryId ?? 0,
            };
            console.log('새단어@@', newWordData);
  
            console.log("새로운 단어 추가:", section.word);
  
            try {
              // 새로운 단어를 바로 추가
              const result = await dispatch(addVocaThunk({ vocaAddList: [newWordData] }));
              if (addVocaThunk.rejected.match(result)) {
                throw new Error(result.payload || "단어 추가 중 문제가 발생했습니다.");
              }
              console.log("새 단어 추가 성공!");
            } catch (error) {
              console.error('단어 추가 중 오류 발생!!', error);
              throw error; // 오류가 발생하면 상위 catch로 넘김
            }
          }
        }
  
        await putScrap(scrapId, postscrapData);
      } else {
        // scrapId가 null인 경우: 새로 저장하는 로직
        const result = await dispatch(addVocaThunk({ vocaAddList }));
        if (addVocaThunk.rejected.match(result)) {
          throw new Error(result.payload || "단어 추가 중 문제가 발생했습니다.");
        }
        await postScrap(postscrapData); // 새 스크랩 데이터 저장
      }
  
      Swal.close();
  
      Swal.fire({
        icon: "success",
        title: "저장 완료",
        text: scrapId ? "수정이 완료되었습니다." : "스크랩이 성공적으로 저장되었습니다.",
      });
    } catch (error: any) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "저장 실패",
        text: error.message || "저장 중 오류가 발생했습니다.",
      });
    }
  };

  // Industry 선택 함수
  const handleIndustrySelectVoca = (index: number, id: number) => {
    const newSections = [...vocaSections];
    newSections[index].industryId = id; // 선택한 industryId 저장
    newSections[index].isDropdownOpen = false; // 드롭다운 닫기
    setVocaSections(newSections);
  };

  // 드롭다운 열기/닫기 함수
  const toggleDropdown = (index: number) => {
    const newSections = [...vocaSections];
    newSections[index].isDropdownOpen = !newSections[index].isDropdownOpen;
    setVocaSections(newSections);
  };

  // const summaryPlaceholder = `<서론>\n\n<본론>\n\n<결론>`;

  return (
    <Sidebar>
      <TabMenu>
        <TabButton
          $active={activeTab === "summary"}
          onClick={() => setActiveTab("summary")}
        >
          요약
        </TabButton>
        <TabButton
          $active={activeTab === "opinion"}
          onClick={() => setActiveTab("opinion")}
        >
          의견
        </TabButton>
        <TabButton
          $active={activeTab === "wordlist"}
          onClick={() => setActiveTab("wordlist")}
        >
          단어장
        </TabButton>
      </TabMenu>

      {activeTab === "summary" && (
        <>
          <StyledTextarea
            ref={summaryTextareaRef}
            value={summaryText || "<서론>\n\n<본론>\n\n<결론>"}
            onChange={(e) => setSummaryText(e.target.value)}
            $isOverflowing={isOverflowing}
          />

          <NewsDetailAISummary
            newsId={newsId}
            onTransferText={handleTransferText}
          />
        </>
      )}

      {activeTab === "opinion" && (
        <>
          <StyledTextarea
            ref={opinionTextareaRef}
            value={opinionText}
            onChange={(e) => setOpinionText(e.target.value)}
            placeholder="의견을 작성하세요."
            $isOverflowing={isOverflowing}
          />
          <NewsDetailAIQuestion
            newsId={newsId}
            summaryText={summaryText}
            onTransferText={handleTransferOpinionText}
          />
        </>
      )}

      {activeTab === "wordlist" && (
        <>
            {vocaSections.map((section, index) => (
            <VocaSection key={index}>
              <IndustryDropdownWrapper>
                <SelectedIndustryWrapper>
                  <SelectedIndustry onClick={() => toggleDropdown(index)}>
                    {section.industryId
                      ? words.find(
                          (item) => item.industryId === section.industryId
                        )?.industryName || "산업"
                      : "산업"}
                  </SelectedIndustry>

                  {section.isDropdownOpen && (
                    <DropdownWrapper>
                      <DropDown
                        dropdownIndustries={words}
                        handleIndustrySelect={(id) =>
                          handleIndustrySelectVoca(index, id)
                        } // 선택된 값 전달
                      />
                    </DropdownWrapper>
                  )}
                </SelectedIndustryWrapper>
              </IndustryDropdownWrapper>

              <VocaInputWrapper>
                <StyledInput
                  value={section.word} // vocaName 값을 불러와서 입력 필드에 적용
                  onChange={(e) => {
                    const newSections = [...vocaSections];
                    newSections[index].word = e.target.value;
                    setVocaSections(newSections);
                  }}
                  placeholder="💡 단어를 입력하세요."
                />
                <Divider />
                <StyledInput
                  value={section.desc} // vocaDesc 값을 불러와서 입력 필드에 적용
                  onChange={(e) => {
                    const newSections = [...vocaSections];
                    newSections[index].desc = e.target.value;
                    setVocaSections(newSections);
                  }}
                  placeholder="설명을 입력하세요."
                />
              </VocaInputWrapper>
              {index >= 0 && (
                <RemoveButton
                  src={removeIcon}
                  onClick={() => handleRemoveSection(index)}
                />
              )}
            </VocaSection>

          ))}
          <AddButton src={addIcon} onClick={handleAddSection} />
        </>
      )}
      <SaveButton onClick={handleSave}>저장</SaveButton>
    </Sidebar>
  );
};

export default NewsDetailScrap;
