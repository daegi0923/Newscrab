import styled from 'styled-components'

const StyledButton = styled.button`
  margin-top: 5%;
  background-color: #ffbe98;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  width: 65px;
  height: 35px;
  box-shadow: 3px 3px 3px #00000059;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode; // 버튼 안에 들어갈 요소
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button;
