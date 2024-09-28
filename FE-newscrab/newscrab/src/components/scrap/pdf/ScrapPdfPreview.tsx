import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchScrapListThunk } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';


const ScrapPdfPreview: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList } = useSelector((state: RootState) => state.scrap);

  useEffect(() => {
    console.log('불러와짐')
    dispatch(fetchScrapListThunk()); // Voca 리스트 API 요청
  }, [dispatch]);
  return (
    <div>
      <h1>pdf 미리보기</h1>
    </div>
  );
};

export default ScrapPdfPreview;
