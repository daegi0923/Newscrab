import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // URL 파라미터 가져오기
import styled from "styled-components";

import { getArticleDetail } from "@apis/article/articleDetailApi"; // 상세 API 호출
import { ArticleDetailItem } from "../../../types/articleTypes";

import Header from "@common/Header";
import ArticleScrapDetailArticle from "./ArticleScrapDetailArticle";
import ArticleScrapDetailVoca from "./ArticleScrapDetailVoca";

const ScrapDetailContainer = styled.div`
  margin: 0px 100px;
  margin-bottom: 30px;
  position: relative;
`;

const ScrapWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 50px;
`;

const BackButton = styled.button`
  z-index: 2;
  position: absolute;
  top: 9.2%;
  left: 0%;
  padding: 10px 15px;
  background-color: #fdfaf8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: #ff8f4d;
  }
`;

const ArticleScrapDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>(); // URL에서 articleId 가져오기
  const [articleDetail, setArticleDetail] = useState<ArticleDetailItem | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleDetail = async () => {
      if (articleId) {
        const data = await getArticleDetail(Number(articleId));
        setArticleDetail(data);
      }
    };

    fetchArticleDetail();
  }, [articleId]);

  if (!articleDetail) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate("/article");
  };

  return (
    <div>
      <ScrapDetailContainer>
        <Header />
        <BackButton onClick={handleBackClick}>게시글 목록</BackButton>
        <ScrapWrapper>
          <ArticleScrapDetailArticle articleId={Number(articleId)} />
          <ArticleScrapDetailVoca articleId={Number(articleId)} />
        </ScrapWrapper>
      </ScrapDetailContainer>
    </div>
  );
};

export default ArticleScrapDetailPage;
