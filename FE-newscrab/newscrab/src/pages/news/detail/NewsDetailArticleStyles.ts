import styled from "styled-components";
import scrollbar from "@common/ScrollBar";

export const NewsContent = styled.div`
  width: 60%;
  padding-right: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 100px;
  background-color: #fff;
  max-height: 770px;
  min-height: 77px;
  overflow: auto;
  // position: relative;
  margin-bottom: 20px;

  ${scrollbar}
  user-select: text;
`;

export const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const IndustryId = styled.div`
  font-size: 12px;
  color: #555;
  padding: 2px 8px;
  border: 1px solid #555;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const OriginalNews = styled.div`
  font-size: 12px;
  color: #007bff; /* 링크 스타일처럼 색상 변경 */
  padding: 2px 8px;
  border: 1px solid #007bff;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  cursor: pointer; /* 클릭 가능한 요소로 설정 */

  &:hover {
    color: #0056b3; /* 호버 시 색상 변경 */
  }
`;

export const MetaInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Info = styled.div`
  color: #888;
  font-size: 14px;
`;

export const Stats = styled.div`
  display: flex;
  gap: 10px;
  color: #888;
  font-size: 14px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ViewIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const ScrapCntIcon = styled.img`
  width: 13px;
  height: 16px;
`;

export const NewsText = styled.div`
  line-height: 1.6;
  font-size: 16px;
  margin-bottom: 80px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
`;

export const NewsDetailRcmdWrapper = styled.div`
  position: absolute;
  right: 460px; /* 오른쪽으로 추가 이동 */
  top: 910px;
  // background-color: #fff; /* 백그라운드 색상을 추가하여 명확히 보이도록 설정 */
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  padding: 15px;
  border-radius: 8px; /* 둥근 모서리 */
  overflow: visible; /* 내부 텍스트가 잘리지 않도록 설정 */
`;
