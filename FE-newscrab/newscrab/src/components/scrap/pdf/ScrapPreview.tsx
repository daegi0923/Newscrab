import React, { useRef } from 'react';
import ScrapPdfTemplate from './ScrapPdfTemplate';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';

type handleChangePage = {
  funcChangePage : () => void;
}


const ScrapPreview: React.FC<handleChangePage> = ({ funcChangePage }) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrapList, isSelectedPdf } = useSelector((state: RootState) => state.scrap);
  
  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    
    for (let i = 0; i < scrapList.length; i++) {
      const content = contentRefs.current[i];
      if (content) {
        const canvas = await html2canvas(content, {
          scale: 2,  // 고정된 스케일 값 설정
        });
        const imgData = canvas.toDataURL('image/png');

        // 첫 페이지가 아니면 새로운 페이지 추가
        if (i > 0) {
          pdf.addPage();
        }

        // PDF 페이지에 이미지 크기를 조정하여 잘리지 않도록 설정
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
    width:'1000px',
    paddingTop:'100px',
  },
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
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;
export default ScrapPreview;
