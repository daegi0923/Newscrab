import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrapData, Vocalist, Highlight } from '../../../types/scrapTypes'; // ScrapData 및 Vocalist 타입 import

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  padding: 12px;
  font-size: 18px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  vertical-align: top;
  background-color: #f9f9f9;
`;

const TitleRow = styled.tr`
  background-color: #ecf0f1;
`;

const ScrapDetail = styled.div`
  display: flex;
  justify-content: center;
`;

const letterToColorMap = {
  R: '#fde2e4', // Red
  Y: '#ffffb5', // Yellow
  G: '#d1e6d3', // Green
  B: '#cddafd', // Blue
} as const;

const applyHighlightsToContent = (content: string, highlights: Highlight[] | null | undefined): string => {
  if (!highlights || highlights.length === 0) {
    // 하이라이트 목록이 비어 있으면 메시지 반환
    return "형광펜 친 문장이 없습니다.";
  }

  // <br/> 태그로 문단 나누기
  const paragraphs = content.split(/<br\s*\/?>/);

  // 각 문단에 하이라이트 적용
  const highlightedParagraphs = paragraphs.map(paragraph => {
    let modifiedParagraph = paragraph;

    highlights.forEach(({ startPos, endPos, color }) => {
      const highlightStart = Math.max(startPos, 0);
      const highlightEnd = Math.min(endPos, paragraph.length);

      if (highlightStart < highlightEnd) {
        // 하이라이트 적용
        modifiedParagraph =
          modifiedParagraph.slice(0, highlightStart) +
          `<span style="background-color:${letterToColorMap[color]};">` +
          modifiedParagraph.slice(highlightStart, highlightEnd) +
          `</span>` +
          modifiedParagraph.slice(highlightEnd);
      }
    });

    return modifiedParagraph;
  });

  // 하이라이트가 포함된 문단만 필터링
  const filteredParagraphs = highlightedParagraphs.filter(paragraph => {
    return paragraph.includes("<span");
  });

  // 필터링된 문단을 합쳐서 반환
  return filteredParagraphs.join("<br/>");
};



const ScrapPdfTemplate: React.FC<{ scrap: ScrapData }> = ({ scrap }) => {
  const newsContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrap && scrap.newsContent && scrap.highlightList) {
      const highlightedContent = applyHighlightsToContent(scrap.newsContent, scrap.highlightList);
      if (newsContentRef.current) {
        newsContentRef.current.innerHTML = highlightedContent;
      }
    }
  }, [scrap]);

  return (
    <ScrapDetail>
      <Table>
        <thead>
          <TitleRow>
            <Th colSpan={3}>
              {scrap.newsTitle} - {new Date(scrap.createdAt).toLocaleDateString()}
            </Th>
          </TitleRow>
        </thead>
        <tbody>
          <tr>
            <Td colSpan={2}>기사내용</Td>
            <Td>
              <div
                ref={newsContentRef}
                dangerouslySetInnerHTML={{ __html: applyHighlightsToContent(scrap.newsContent, scrap.highlightList) }}
              ></div>{' '}
              {/* 하이라이트가 적용된 기사 내용 표시 */}
            </Td>
          </tr>
          <tr>
            <Td colSpan={2}>요약</Td>
            <Td>{scrap.scrapSummary}</Td>
          </tr>
          <tr>
            <Td colSpan={2}>의견</Td>
            <Td>{scrap.comment}</Td>
          </tr>
          {scrap.vocalist && scrap.vocalist.length > 0 ? (
            <>
              <tr>
                <Td rowSpan={scrap.vocalist.length}>단어</Td>
                <Td>{scrap.vocalist[0].vocaName}</Td>
                <Td>{scrap.vocalist[0].vocaDesc}</Td>
              </tr>
              {scrap.vocalist.slice(1).map((voca: Vocalist) => (
                <tr key={voca.vocaId}>
                  <Td>{voca.vocaName}</Td>
                  <Td>{voca.vocaDesc}</Td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </Table>
    </ScrapDetail>
  );
};

export default ScrapPdfTemplate;
