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
  max-height: 680px;
  min-height: 680px;
  overflow: auto;
  position: relative;

  ${scrollbar}
  user-select: text;
`;

export const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer; /* 클릭 가능한 요소로 설정 */
  color: #007bff; /* 링크 스타일처럼 색상 변경 */
  text-decoration: underline; /* 밑줄 추가 */

  &:hover {
    color: #0056b3; /* 호버 시 색상 변경 */
  }
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
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
`;
