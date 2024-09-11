// NewsCommon 컴포넌트를 All, Filter, Rcmd, Scrap, View 페이지에 뿌릴거임
// Nav, Header, Tab, Pagination은 @components/common에서 가져옴
// Rcmd 페이지에는 Pagination안함

// common
import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import { tabOptions } from "@components/common/TabOptions";

const NewsCommon: React.FC = () => {
  return (
    <div>
      <Header />
      <Tab options={tabOptions} />
    </div>
  );
};

export default NewsCommon;
