import React, { useRef } from 'react';
import ScrapPdfTemplate from './ScrapPdfTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';
import { ScrapData } from '../../../types/scrapTypes';


// 모달 스타일 적용
const ModalBody = styled.section`
  padding: 24px 0;
  overflow-y: auto;
  max-height: 60vh;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const ModalFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface PreviewProps {
  selectedScraps: number[]; // 선택된 스크랩 ID 리스트
  scrapList: ScrapData[]; // 전체 스크랩 리스트
}

const ScrapPreview: React.FC<PreviewProps> = ({ selectedScraps, scrapList }) => {
  const templateRef = useRef<HTMLDivElement>(null); // PDF로 만들 요소 참조

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    const element = templateRef.current;

    if (element) {
      for (let i = 0; i < selectedScraps.length; i++) {
        const scrapId = selectedScraps[i];
        const scrap = scrapList.find((item) => item.scrapId === scrapId);

        if (scrap) {
          const canvas = await html2canvas(element);
          const imgData = canvas.toDataURL('image/png');
          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 5, canvas.height / 5);
        }
      }

      pdf.save('scrap_list.pdf');
    }
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle>PDF 미리보기</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div ref={templateRef}>
          {selectedScraps.map((scrapId) => {
            const scrap = scrapList.find((item) => item.scrapId === scrapId);
            return scrap ? <ScrapPdfTemplate key={scrap.scrapId} scrap={scrap} /> : null;
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleDownloadPdf}>PDF 다운로드</Button>
      </ModalFooter>
    </>
  );
};

export default ScrapPreview;
