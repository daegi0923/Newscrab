// import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Highlight Popup 스타일링
const HighlightPopup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 5px 10px;
  z-index: 100;
  gap: 1px;
  width: 120px;
`;

const HighlightButton = styled.button<{ color?: string }>`
  background-color: ${({ color }) => (color ? color : "#fff")};
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  outline: none;
`;

const CloseButton  = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
`;

type HighlightComponentProps = {
  applyHighlight: (color: string) => void;
  closePopup: () => void;
  style?: React.CSSProperties;
};

const HighlightComponent: React.FC<HighlightComponentProps> = ({
  applyHighlight,
  closePopup,
  style,
}) => {
  return (
    <HighlightPopup style={style}>
      <HighlightButton
        color="#fde2e4"
        onClick={() => applyHighlight("#fde2e4")}
      />
      <HighlightButton
        color="#ffffb5"
        onClick={() => applyHighlight("#ffffb5")}
      />
      <HighlightButton
        color="#d1e6d3"
        onClick={() => applyHighlight("#d1e6d3")}
      />
      <HighlightButton
        color="#cddafd"
        onClick={() => applyHighlight("#cddafd")}
      />
      <CloseButton  onClick={closePopup}>x</CloseButton >
    </HighlightPopup>
  );
};

export default HighlightComponent;
