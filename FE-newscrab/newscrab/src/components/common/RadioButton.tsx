import styled from 'styled-components';

interface RadioButtonProps {
  name: string;
  options: { value: string; label: string }[];
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

const RadioButton: React.FC<RadioButtonProps> = ({ name, options }) => {
  return (
    <RadioContainer>
      {options.map((option) => (
        <label key={option.value}>
          <input type="radio" name={name} value={option.value} />
          {option.label}
        </label>
      ))}
    </RadioContainer>
  );
};

export default RadioButton;
