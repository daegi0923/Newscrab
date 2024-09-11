import Tab from "../../components/common/Tab";
import { tabOptions } from "../../components/common/TabOptions";

const ScrapCountNewsPage: React.FC = () => {
  return (
    <div>
      <h1>스크랩순 뉴스 페이지</h1>
      <Tab options={tabOptions} />
    </div>
  );
};

export default ScrapCountNewsPage;
