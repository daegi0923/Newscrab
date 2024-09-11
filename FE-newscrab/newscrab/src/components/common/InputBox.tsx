import styled from 'styled-components';

// 여러 타입의 인풋 필드를 받을 수 있도록 타입 정의
interface InputBoxProps {
  label: string;
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'date';
}

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);  /* 그림자 설정 */
  border: none;
  padding: 10px;
  font-size: 14px;
  width: 100%;  /* 입력 필드의 너비를 전체로 설정 */
  height: 10px; /* 인풋 필드의 높이 */
  outline: none;

  &:focus {
    box-shadow: inset 2px 3px 3px rgba(0, 0, 0, 0.25), 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const InputBox: React.FC<InputBoxProps> = ({label, placeholder, type}) => {
  return (
    <InputBoxContainer>
      <InputLabel>{label}</InputLabel>
      <InputField type={type} placeholder={placeholder} />
    </InputBoxContainer>
  );
};

export default InputBox;