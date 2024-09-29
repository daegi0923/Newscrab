import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchScrapListThunk } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';




const ScrapPdfTemplate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList } = useSelector((state: RootState) => state.scrap);

  useEffect(() => {
    console.log('불러와짐');
    dispatch(fetchScrapListThunk()); // Voca 리스트 API 요청
    // console.log(scrapList);
  }, [dispatch]);

  return (
    <div>
      <h1>스크랩 pdf 개별 컴포넌트</h1>
    </div>
  );
};

export default ScrapPdfTemplate;
