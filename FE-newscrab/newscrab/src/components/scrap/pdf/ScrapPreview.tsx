import React, { useRef } from 'react';
import ScrapPdfTemplate from './ScrapPdfTemplate';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';


const ScrapPreview: React.FC = () => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrapList, isSelectedPdf } = useSelector((state: RootState) => state.scrap);
  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    for (let i = 0; i < scrapList.length; i++) {
      const content = contentRefs.current[i];
      if (content) {
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');

        // 첫 페이지가 아니면 새로운 페이지 추가
        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 5, canvas.height / 5);
      }
    }

    pdf.save('scrap_list.pdf');
  };

  return (
    <>
      <div>
        {scrapList.map((scrap, idx) => {
          return isSelectedPdf[scrap.scrapId] ? (
            <div
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
            >
              <ScrapPdfTemplate key={scrap.scrapId} scrap={scrap} />
            </div>
          ) : null;
        })}
      </div>
      <Button onClick={handleDownloadPdf}>PDF 다운로드</Button>

    </>
  );
};
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
export default ScrapPreview;
