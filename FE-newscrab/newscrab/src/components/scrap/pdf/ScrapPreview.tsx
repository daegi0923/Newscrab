import React, { useRef } from 'react';
import ScrapPdfTemplate from './ScrapPdfTemplate';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';

type handleChangePage = {
  funcChangePage: () => void;
};

const ScrapPreview: React.FC<handleChangePage> = ({ funcChangePage }) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrapList, isSelectedPdf } = useSelector((state: RootState) => state.scrap);

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    for (let i = 0; i < scrapList.length; i++) {
      const content = contentRefs.current[i];
      if (content) {
        const canvas = await html2canvas(content, {
          scale: 1.5, // 적절한 스케일 값 설정
          width: content.offsetWidth,
          height: content.offsetHeight,
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;

        let position = 0; // 페이지 상단부터 시작
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight; // 다음 페이지의 이미지 시작 위치 조정
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }
    }

    pdf.save('scrap_list.pdf');
  };

  return (
    <>
      <div style={styles.body}>
        {scrapList.map((scrap, idx) => {
          return isSelectedPdf[scrap.scrapId] ? (
            <div
              key={scrap.scrapId} // 고유한 key 값 추가
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
            >
              <ScrapPdfTemplate key={scrap.scrapId} scrap={scrap} />
            </div>
          ) : null;
        })}
      </div>
      <ModalFooter>
        <Button onClick={funcChangePage}>이전</Button>
        <Button onClick={handleDownloadPdf}>PDF 다운로드</Button>
      </ModalFooter>
    </>
  );
};

const styles = {
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '64vh',
    overflowY: 'scroll', // overflowY 속성을 'scroll'로 명시적으로 지정
  } as const,
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

const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  bottom: 0;
  border-top: 1px solid #ddd;
  padding: 15px;
`;

export default ScrapPreview;
