import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getScrapDetail } from "@apis/scrap/scrapDetailApi";
import {
  ScrapDetailVocaListResponse,
  ScrapDetailResponse,
} from "../../types/scrapTypes"; // 새 타입 불러옴
import scrollbar from "@components/common/ScrollBar";

const Sidebar = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  height: 680px; /* 스크롤을 위한 고정 높이 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  ${scrollbar}
  user-select: text;
  overflow-y: auto; /* 세로 스크롤바 */
`;

const VocaItem = styled.div`
  margin-bottom: 20px;
`;

const VocaTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const VocaDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

// ScrapDetailVoca가 scrapId를 props로 받음
const ScrapDetailVoca: React.FC<{ scrapId: number }> = ({ scrapId }) => {
  const [vocalist, setVocalist] = useState<ScrapDetailVocaListResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (scrapId !== 0) {
        try {
          const response: ScrapDetailResponse = await getScrapDetail(scrapId);

          // vocalist 배열을 updatedAt을 기준으로 정렬
          const sortedVocalist = response.vocalist.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );

          setVocalist(sortedVocalist); // 정렬된 vocalist 데이터 설정
        } catch (error) {
          console.error("Error fetching scrap detail:", error);
        }
      }
    };

    fetchData();
  }, [scrapId]); // scrapId가 변경될 때마다 데이터를 다시 가져옴

  return (
    <Sidebar>
      {vocalist.map((voca) => (
        <VocaItem key={voca.vocaId}>
          <VocaTitle>💡 {voca.vocaName}</VocaTitle>
          <VocaDescription>{voca.vocaDesc}</VocaDescription>
        </VocaItem>
      ))}
    </Sidebar>
  );
};

export default ScrapDetailVoca;
