import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { fetchScrapListThunk } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';
import ScrapPdfTemplate from './ScrapPdfTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ScrapPdfPreview: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList } = useSelector((state: RootState) => state.scrap);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    console.log('불러와짐');
    dispatch(fetchScrapListThunk()); // Scrap 리스트 API 요청
  }, [dispatch]);

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
        <h1>PDF 미리보기</h1>
        {
          scrapList.length === 0 ? (
            <div>
              <p>스크랩된 PDF가 없습니다.</p>
            </div>
          ) : (
            <div>
              {scrapList.map((scrap, index) => (
                <div
                  key={scrap.scrapId}
                  ref={(el) => (contentRefs.current[index] = el)} // 각 항목의 ref 저장
                >
                  <ScrapPdfTemplate scrap={scrap} />
                </div>
              ))}
            </div>
          )
        }
        <button onClick={handleDownloadPdf}>PDF 다운로드</button>
      </div>
    </>
  );
};

export default ScrapPdfPreview;
