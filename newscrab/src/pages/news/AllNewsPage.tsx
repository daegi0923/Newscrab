import React from "react";
import Tab, { tabOptions } from "../../components/news/Tab";

const AllNewsPage: React.FC = () => {
  return (
    <div>
      <h1>전체 뉴스 페이지</h1>
      <Tab options={tabOptions} />
    </div>
  );
};

export default AllNewsPage;
