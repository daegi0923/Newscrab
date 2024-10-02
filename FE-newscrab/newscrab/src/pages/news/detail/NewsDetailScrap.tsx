import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { getScrapData, postScrap, putScrap } from "@apis/scrap/scrapApi"; // postScrap 함수 import
import { addVocaThunk } from "@store/voca/vocaSlice";
import DropDown from "@components/common/DropDown";
import { words } from "@components/voca/VocaList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/index";
import addIcon from "@assets/common/add.png";
import removeIcon from "@assets/common/remove.png";
import NewsDetailAISummary from "./NewsDetailAISummary";
import NewsDetailAIQuestion from "./NewsDetailAIQuestion";

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
  width: 100%;
  height: auto;
  max-height: 570px;
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
  background-color: #f0c36d;
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
    background-color: #d9a654;
  }

  &:active {
    background-color: #c89640;
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

const NewsDetailScrap: React.FC<{ newsId: number }> = ({ newsId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [scrapId, setScrapId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [summaryText, setSummaryText] = useState("");
  const [opinionText, setOpinionText] = useState("");
  const [wordListText, setWordListText] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  // const [wordText, setWordText] = useState("");
  // const [descriptionText, setDescriptionText] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [industryId, setIndustryId] = useState<number | null>(null);

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
  // Voca 섹션 삭제 함수
  const handleRemoveSection = (index: number) => {
    const newSections = vocaSections.filter((_, i) => i !== index);
    setVocaSections(newSections);
  };

  // Industry 선택 함수
  // const handleIndustrySelect = (index: number, id: number) => {
  //   const newSections = [...vocaSections];
  //   newSections[index].industryId = id;
  //   setVocaSections(newSections);
  // };

  // 형광펜 정보 저장하는 ref (리렌더링 없이 데이터 유지)
  const highlightsRef = useRef<
    { startPos: number; endPos: number; color: string }[]
  >([]);

  // Redux에서 하이라이트(highlight) 정보 가져오기
  // const highlights = useSelector(
  //   (state: RootState) => state.highlight.highlights
  // );

  const summaryTextareaRef = useRef<HTMLTextAreaElement>(null);
  const opinionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const wordListTextareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setIsOverflowing(textarea.scrollHeight > 615);
    }
  };

  // 요약 텍스트를 업데이트하는 함수
  const handleTransferText = (newSummary: string) => {
    setSummaryText((prevSummary) => prevSummary + "\n" + newSummary); // 기존 요약에 새 텍스트를 추가
  };

  // 의견 텍스트를 업데이트하는 함수
  const handleTransferOpinionText = (newOpinion: string) => {
    setOpinionText((prevOpinion) => prevOpinion + "\n" + newOpinion); // 기존 의견에 새 텍스트를 추가
  };

  // getScrapData를 이용해 서버에서 데이터를 불러오기
  useEffect(() => {
    const fetchScrapData = async () => {
      try {
        const data = await getScrapData(); // 필요한 경우, page와 size를 인자로 전달
        console.log("Fetched data:", data);

        const selectedScrap = data.data.data.find(
          (item) => item.newsId === newsId
        );

        if (selectedScrap) {
          console.log("Selected Scrap:", selectedScrap); // selectedScrap 확인
          console.log("News ID:", selectedScrap.newsId); // 찾은 뉴스 ID 확인
          console.log("Scrap ID:", selectedScrap.scrapId); // 찾은 scrapId 확인

          setScrapId(selectedScrap.scrapId || null); // scrapId 설정
          setSummaryText(selectedScrap.scrapSummary || "");
          setOpinionText(selectedScrap.comment || "");
          setWordListText(selectedScrap.vocalist?.join(", ") || ""); // vocalist 배열을 문자열로 변환
        } else {
          console.log("No scrap data found for this newsId:", newsId);
        }
      } catch (error) {
        console.error("Error fetching scrap data:", error);
      }
    };

    fetchScrapData();
  }, [newsId]);

  useEffect(() => {
    adjustHeight(summaryTextareaRef.current);
    adjustHeight(opinionTextareaRef.current);
    adjustHeight(wordListTextareaRef.current);
  }, [summaryText, opinionText, wordListText, activeTab]);

  const handleSave = async () => {
    // scrapData 생성: 요약, 의견, 형광펜 데이터를 저장할 객체
    const scrapData = {
      newsId: newsId,
      comment: opinionText, // 의견 탭의 데이터
      scrapSummary: summaryText, // 요약 탭의 데이터
      highlights: highlightsRef.current, // 형광펜 정보
    };

    // wordlist 데이터를 vocaAddList로 변환
    const vocaAddList = vocaSections.map((section) => ({
      newsId: newsId,
      vocaName: section.word,
      vocaDesc: section.desc,
      industryId: section.industryId!, // 선택된 industryId 저장
    }));

    console.log("Scrap Data!!:", scrapData);
    console.log("vocaAddList!!:", vocaAddList);

    try {
      // 먼저 scrapData 저장 (요약, 의견, 형광펜 정보)
      if (scrapId) {
        // scrapId가 있으면 업데이트 (put 요청)
        await putScrap(scrapId, scrapData);
        console.log("put 요청 완료");
      } else {
        // scrapId가 없으면 새로 생성 (post 요청)
        await postScrap(scrapData);
        console.log("post 요청 완료");
      }

      // vocaAddList가 존재할 경우 단어도 저장
      if (vocaAddList.length > 0) {
        await dispatch(addVocaThunk({ vocaAddList })); // wordlist 데이터 전송
        console.log("단어 추가 완료!");
      }

      // 성공 시 알림
      alert("저장되었습니다!");
    } catch (error) {
      // 실패 시 오류 처리
      console.error("저장 중 오류 발생:", error);
      alert("저장에 실패했습니다.");
    }
  };
  // const handleSave = async () => {
  //   if (activeTab === "wordlist") {
  //     if (industryId === null) {
  //       alert("산업을 선택해주세요.");
  //       return;
  //     }

  //     const VocaData = {
  //       newsId: newsId,
  //       vocaName: wordText, // 사용자가 입력 한 단어
  //       vocaDesc: descriptionText, // 사용자가 입력한 설명
  //       industryId: industryId, // 선택한 industryId
  //     };

  //     try {
  //       // Redux Thunk를 사용하여 단어 추가
  //       await dispatch(addVocaThunk(VocaData));
  //       console.log(VocaData);
  //       alert("단어가 추가되었습니다!");
  //     } catch (error) {
  //       console.error("단어 추가 실패:", error);
  //       alert("단어 추가에 실패했습니다.");
  //     }
  //   } else {
  //     const scrapData = {
  //       newsId: newsId,
  //       comment: opinionText,
  //       scrapSummary: summaryText,
  //       highlights: highlightsRef.current,
  //     };
  //     console.log("Scrap Data:", scrapData);
  //     console.log("Scrap ID:", scrapId); // scrapId 확인용

  //     try {
  //       if (scrapId) {
  //         // scrapId가 있으면 put 요청 (업데이트)
  //         await putScrap(scrapId, scrapData);
  //         console.log("put요청 완료");
  //         alert("업데이트되었습니다!");
  //       } else {
  //         // scrapId가 없으면 post 요청 (새로 생성)
  //         await postScrap(scrapData);
  //         console.log("post요청 완료");
  //         alert("저장되었습니다!");
  //       }
  //     } catch (error) {
  //       console.error("Error saving scrap:", error);
  //       alert("저장에 실패했습니다.");
  //     }
  //   }
  // };

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

          <NewsDetailAISummary onTransferText={handleTransferText} />
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
          <NewsDetailAIQuestion onTransferText={handleTransferOpinionText} />
        </>
      )}

      {/* {activeTab === "wordlist" && (
        <>
        <VocaSection>
          <IndustryDropdown>
              <SelectedIndustry
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {industryId
                  ? words.find((item) => item.industryId === industryId)
                      ?.industryName || "산업"
                  : "산업"}
              </SelectedIndustry>
              {isDropdownOpen && (
                <DropDown
                  dropdownIndustries={words}
                  handleIndustrySelect={handleIndustrySelect}
                />
              )}
            </IndustryDropdown>
            <VocaSection1>
          <StyledTextarea
            value={wordText}
            onChange={(e) => setWordText(e.target.value)}
            placeholder="단어를 입력하세요."
            $isOverflowing={false}
          />
          <StyledTextarea
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            placeholder="설명을 입력하세요."
            $isOverflowing={false}
          />
          </VocaSection1>
          </VocaSection>
        </>
      )} */}
      {activeTab === "wordlist" && (
        <>
          {vocaSections.map((section, index) => (
            <VocaSection key={index}>
              <IndustryDropdownWrapper>
                <SelectedIndustry onClick={() => toggleDropdown(index)}>
                  {section.industryId
                    ? words.find(
                        (item) => item.industryId === section.industryId
                      )?.industryName || "산업"
                    : "산업"}
                </SelectedIndustry>

                {/* 드롭다운 상태가 true일 때만 보여줌 */}
                {section.isDropdownOpen && (
                  <DropDown
                    dropdownIndustries={words}
                    handleIndustrySelect={(id) =>
                      handleIndustrySelectVoca(index, id)
                    } // 선택된 값 전달
                  />
                )}
              </IndustryDropdownWrapper>

              <VocaInputWrapper>
                <StyledInput
                  value={section.word}
                  onChange={(e) => {
                    const newSections = [...vocaSections];
                    newSections[index].word = e.target.value;
                    setVocaSections(newSections);
                  }}
                  placeholder="💡 단어를 입력하세요."
                />
                <Divider />
                <StyledInput
                  value={section.desc}
                  onChange={(e) => {
                    const newSections = [...vocaSections];
                    newSections[index].desc = e.target.value;
                    setVocaSections(newSections);
                  }}
                  placeholder="설명을 입력하세요."
                />
              </VocaInputWrapper>
              {index > 0 && (
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
      {/* 저장 버튼을 이곳에 추가 */}
      <SaveButton onClick={handleSave}>저장</SaveButton>
    </Sidebar>
  );
};

export default NewsDetailScrap;
