import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ScrapData, Vocalist } from '../../../types/scrapTypes'; // ScrapData 및 Vocalist 타입 import
import { Highlight } from '../../../types/scrapTypes';

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  color: #333;
  table-layout: fixed; // 고정 레이아웃 설정
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  padding: 12px;
  font-size: 18px;
  text-align: left;
`;

const Td = styled.td`
  width:0px;
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
  width: 1000px;
  padding-top: 30px;
`;

const letterToColorMap = {
  R: '#fde2e4', // Red
  Y: '#ffffb5', // Yellow
  G: '#d1e6d3', // Green
  B: '#cddafd', // Blue
} as const;

const applyHighlightsFromApi = (contentElement: HTMLElement, highlights: Highlight[]): string[] => {
  const highlightedTexts: string[] = [];
  highlights.forEach(({ startPos, endPos, color }) => {
    const walker = document.createTreeWalker(contentElement, NodeFilter.SHOW_TEXT, null);
    let currentPos = 0;
    let startNode: Node | null = null;
    let endNode: Node | null = null;
    let startOffset = 0;
    let endOffset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nodeLength = node.textContent?.length || 0;

      if (currentPos <= startPos && currentPos + nodeLength > startPos) {
        startNode = node;
        startOffset = startPos - currentPos;
      }
      if (currentPos < endPos && currentPos + nodeLength >= endPos) {
        endNode = node;
        endOffset = endPos - currentPos;
        break;
      }
      currentPos += nodeLength;
    }

    if (startNode && endNode) {
      const range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);

      // span 태그 생성 및 스타일 적용
      const span = document.createElement('span');
      span.style.backgroundColor = letterToColorMap[color];
      span.textContent = range.toString(); // range에서 추출된 텍스트를 사용

      highlightedTexts.push(span.outerHTML); // span 요소의 외부 HTML을 배열에 추가
    }
  });

  return highlightedTexts;
};

const ScrapPdfTemplate: React.FC<{ scrap: ScrapData }> = ({ scrap }) => {
  const [highlightedContent, setHighlightedContent] = React.useState<string[]>([]);

  useEffect(() => {
    if (scrap && scrap.newsContent && scrap.highlightList) {
      const contentElement = document.createElement('div');
      contentElement.innerHTML = scrap.newsContent;

      const highlightedParagraphs = applyHighlightsFromApi(contentElement, scrap.highlightList);
      setHighlightedContent(highlightedParagraphs);
    }
  }, [scrap]);

  return (
    <ScrapDetail>
      <Table>
        <thead>
          <TitleRow>
            <Th colSpan={8}>
              {scrap.newsTitle} - {new Date(scrap.createdAt).toLocaleDateString()}
            </Th>
          </TitleRow>
        </thead>
        <tbody>
          <tr>
            <Td colSpan={2}>기사내용</Td>
            <Td colSpan = {6}>
              {highlightedContent.length > 0 ? (
                highlightedContent.map((content, idx) => (
                  <div key={idx} dangerouslySetInnerHTML={{ __html: content }} />
                ))
              ) : (
                <div>형광펜이 적용된 문장이 없습니다.</div>
              )}
            </Td>
          </tr>
          <tr>
            <Td colSpan={2}>요약</Td>
            <Td colSpan={6}>{scrap.scrapSummary}</Td>
          </tr>
          <tr>
            <Td colSpan={2}>의견</Td>
            <Td colSpan={6}>{scrap.comment}</Td>
          </tr>
          {scrap.vocalist && scrap.vocalist.length > 0 ? (
            <>
              <tr>
                <Td colSpan={1} rowSpan={scrap.vocalist.length}>
                  단어
                </Td>
                <Td>{scrap.vocalist[0].vocaName}</Td>
                <Td colSpan={6}>{scrap.vocalist[0].vocaDesc}</Td>
              </tr>
              {scrap.vocalist.slice(1).map((voca: Vocalist) => (
                <tr key={voca.vocaId}>
                  <Td >{voca.vocaName}</Td>
                  <Td colSpan={6}>{voca.vocaDesc}</Td>
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
