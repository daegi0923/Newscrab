import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getArticleDetail } from "@apis/article/articleDetailApi"; // 기사 상세 API로 수정
import { ArticleDetailItem } from "../../../types/articleTypes"; // 새로운 데이터 타입 가져오기
import scrollbar from "@components/common/ScrollBar";

const Sidebar = styled.div`
  width: 30%;
  border-radius: 8px;
  padding-right: 5px;
  background-color: #fdfaf8;
  height: 712px; /* 스크롤을 위한 고정 높이 */
  position: relative;
  ${scrollbar}
  user-select: text;
  overflow-y: auto; /* 세로 스크롤바 */
`;

const Wrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* 카드 스타일을 위한 흰색 배경 */

  &:last-child {
    margin-bottom: 5px; /* 마지막 요소의 margin-bottom 제거 */
  }
`;

const VocaItem = styled.div`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const VocaTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const VocaDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid black;
  margin: 10px 0;
`;

// scrapId를 props로 받음
const ArticleScrapDetailVoca: React.FC<{ articleId: number }> = ({
  articleId,
}) => {
  const [vocalist, setVocalist] = useState<
    ArticleDetailItem["data"]["scrapResponseDto"]["vocalist"]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (articleId !== 0) {
        try {
          const response: ArticleDetailItem | null = await getArticleDetail(
            articleId
          );

          if (response) {
            // vocalist 배열을 updatedAt을 기준으로 정렬
            const sortedVocalist = response.data.scrapResponseDto.vocalist.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );

            setVocalist(sortedVocalist); // 정렬된 vocalist 데이터 설정
          }
        } catch (error) {
          console.error("Error fetching article detail:", error);
        }
      }
    };

    fetchData();
  }, [articleId]); // articleId가 변경될 때마다 데이터를 다시 가져옴

  return (
    <Sidebar>
      {vocalist.length > 0 ? (
        vocalist.map((voca) => (
          <Wrapper key={voca.vocaId}>
            <VocaItem>
              <VocaTitle>💡 {voca.vocaName}</VocaTitle>
              <Divider />
              <VocaDescription>{voca.vocaDesc}</VocaDescription>
            </VocaItem>
          </Wrapper>
        ))
      ) : (
        <Wrapper>
          <VocaItem>
            <VocaTitle>💡 단어가 없습니다.</VocaTitle>
            <Divider />
            <VocaDescription>단어를 등록해 주세요.</VocaDescription>
          </VocaItem>
        </Wrapper>
      )}
    </Sidebar>
  );
};

export default ArticleScrapDetailVoca;
