import styled from 'styled-components';

// 여러 타입의 인풋 필드를 받을 수 있도록 타입 정의
interface InputBoxProps {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'date';
  value: string; // 추가된 value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러 추가
  error?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  padding-right: 3%;
  padding-left: 8%;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #93939;
`;

const InputField = styled.input`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  padding: 10px;
  font-size: 14px;
  width: 85%;  /* 입력 필드의 너비를 전체로 설정 */
  height: 13px; /* 인풋 필드의 높이 */
  outline: none;

  &:focus {
    box-shadow: inset 2px 3px 3px rgba(0, 0, 0, 0.25), 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorMessage = styled.p`
  position: absolute; /* 오류 메시지를 입력 필드 아래에 겹쳐 띄움 */
  bottom: -52%; /* 인풋 필드 바로 아래에 위치하도록 */
  left: 9%;
  color: red;
  font-size: 12px;
  z-index: 1; /* z-index로 겹침 우선순위 설정 */
  width: 200%;
`;

const InputBox: React.FC<InputBoxProps> = ({name, label, placeholder, type, value, onChange, error}) => {
  return (
    <InputBoxContainer>
      <InputLabel>{label}</InputLabel>
      <InputField name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputBoxContainer>
  );
};

export default InputBox;