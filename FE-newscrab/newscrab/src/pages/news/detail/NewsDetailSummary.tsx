import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  height: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #007BFF" : "1px solid #ddd"};
`;

const SummaryText = styled.div`
  p {
    margin-bottom: 10px;
  }
`;

const NewsDetailSummary: React.FC = () => {
  return (
    <Sidebar>
      <TabMenu>
        <TabButton $active>요약</TabButton>
        <TabButton>의견</TabButton>
        <TabButton>단어장</TabButton>
      </TabMenu>

      <SummaryText>
        <p>
          <strong>서론:</strong> 부산 지역의 트리콜마트가 납품업체에 대금을
          제대로 지급하지 않아 소규모 업체들이 피해를 호소하고 있습니다.
        </p>
        <p>
          <strong>본론:</strong> 일부 업체는 수개월 동안 대금을 받지 못했고,
          본사는 법적 해결을 요구하며 소극적인 태도를 보였습니다.
        </p>
        <p>
          <strong>결론:</strong> 영세 납품업체들은 대금 지급 지연으로 생계에 큰
          어려움을 겪고 있으며, 법적 대응 비용이 부담되어 상황이 더욱 악화되고
          있습니다.
        </p>
      </SummaryText>
    </Sidebar>
  );
};

export default NewsDetailSummary;
