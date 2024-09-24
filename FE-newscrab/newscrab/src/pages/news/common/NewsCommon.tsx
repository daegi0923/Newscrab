import React from "react";
import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import { tabOptions } from "@components/common/TabOptions";

interface NewsCommonProps {
  showFilter: boolean;
  selectedIndustry: string;
  isDropdownOpen: boolean;
  onFilterTabClick?: () => void;
  onIndustrySelect?: (industryId: number) => void;
}

const NewsCommon: React.FC<NewsCommonProps> = ({
  showFilter,
  selectedIndustry,
  isDropdownOpen,
  onFilterTabClick = () => {}, // 기본값 제공
  onIndustrySelect = () => {}, // 기본값 제공
}) => {
  return (
    <>
      <Header />
      <Tab
        options={tabOptions}
        selectedIndustry={selectedIndustry}
        isDropdownOpen={isDropdownOpen}
        onFilterTabClick={showFilter ? onFilterTabClick : () => {}}
        onIndustrySelect={showFilter ? onIndustrySelect : () => {}}
      />
    </>
  );
};

export default NewsCommon;
