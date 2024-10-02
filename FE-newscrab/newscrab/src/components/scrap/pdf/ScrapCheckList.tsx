import { useDispatch, useSelector } from 'react-redux';
import { toggleIsSelectedPdf } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';
import styled from 'styled-components';

type handleChangePage = {
  funcChangePage : () => void;
}


const ScrapChecklist: React.FC<handleChangePage> = ({funcChangePage}) => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList, isSelectedPdf } = useSelector((state: RootState) => state.scrap);

  const handleCheckboxChange = (scrapId: number) => {
    dispatch(toggleIsSelectedPdf(scrapId));
  };
  const handleClickNextButton = () => 
    {
      console.log(Object.keys(isSelectedPdf).length)
      if(Object.values(isSelectedPdf).filter(value => value===true).length > 0){

        funcChangePage();
      }
      else{
        alert("다운로드할 스크랩을 선택하세요.");
        return;
      }

    }
  return (
    <>
      <ul>
        {scrapList.map((scrap) => (
          <li key={scrap.scrapId}>
            <label>
              <input
                type="checkbox"
                checked={isSelectedPdf[scrap.scrapId]}
                onChange={() => handleCheckboxChange(scrap.scrapId)}
              />
              {scrap.newsTitle}
            </label>
          </li>
        ))}
      </ul>
      <ModalFooter>
        <div></div>
        <Button onClick = {handleClickNextButton}>다음</Button>
      </ModalFooter>
    </>
  );
};
const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;
const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ScrapChecklist;
