import styled from 'styled-components';

interface RadioButtonProps {
  name: string;
  options: { value: string; label: string }[];
  value: string; // 현재 선택된 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값이 변경될 때 호출되는 함수
}

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: 5px;
  label {
    margin-right: 8px;
    cursor: pointer;
    font-size: 12px;
  }
  input[type='radio'] {
    margin-right: 5px;
  }
`;

const RadioButton: React.FC<RadioButtonProps> = ({ name, options, value, onChange }) => {
  return (
    <RadioContainer>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange} // 값이 변경되면 다시 전달
          />
          {option.label}
        </label>
      ))}
    </RadioContainer>
  );
};

export default RadioButton;
