// common
import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import { tabOptions } from "@components/common/TabOptions";

const AllNewsPage: React.FC = () => {
  return (
    <div>
      <h1>전체 뉴스 페이지</h1>
      <Header />
      <Tab options={tabOptions} />
    </div>
  );
};

export default AllNewsPage;
