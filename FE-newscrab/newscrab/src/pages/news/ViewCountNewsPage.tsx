import Tab from "../../components/common/Tab";
import { tabOptions } from "../../components/common/TabOptions";

const ViewCountNewsPage: React.FC = () => {
  return (
    <div>
      <h1>조회수순 뉴스 페이지</h1>
      <Tab options={tabOptions} />
    </div>
  );
};

export default ViewCountNewsPage;
