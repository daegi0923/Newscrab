import Tab from "../../components/common/Tab";
import { tabOptions } from "../../components/common/TabOptions";

const RcmdNewsPage: React.FC = () => {
  return (
    <div>
      <h1>추천 뉴스 페이지</h1>
      <Tab options={tabOptions} />
    </div>
  );
};

export default RcmdNewsPage;
