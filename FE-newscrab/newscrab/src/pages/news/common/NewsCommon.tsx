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
