import React from 'react';
import styled from 'styled-components';
import { ScrapData, Vocalist } from '../../../types/scrapTypes'; // ScrapData 및 Vocalist 타입 import

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
  height : 300px;
`;

const ScrapPdfTemplate: React.FC<{ scrap: ScrapData }> = ({ scrap }) => {
  return (
    <ScrapDetail>
      <Table>
        {/* 맨 위칸: 기사 제목과 날짜 */}
        <thead>
          <TitleRow>
            <Th colSpan={3}>
              {scrap.newsTitle} - {new Date(scrap.createdAt).toLocaleDateString()}{/* 날짜 표시 */}
            </Th>
          </TitleRow>
        </thead>
        <tbody>
          {/* 기사 내용 */}
          <tr>
            <Td colSpan={2}>기사내용</Td>
            <Td>형광펜칠한문단만 넣어!!!!</Td>
            {/* <Td dangerouslySetInnerHTML={{ __html: scrap.newsContent }} /> */}
            
          </tr>
          {/* 요약 */}
          <tr>
            <Td colSpan={2}>요약</Td>
            <Td>{scrap.scrapSummary}</Td>
          </tr>
          {/* 의견 */}
          <tr>
            <Td colSpan={2}>의견</Td>
            <Td>{scrap.comment}</Td>
          </tr>
          {/* 단어 정리 */}
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
          ) : null}{/* vocalist가 비어있을 때는 null을 반환 */}
        </tbody>
      </Table>
    </ScrapDetail>
  );
};

export default ScrapPdfTemplate;
