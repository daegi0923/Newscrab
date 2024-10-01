import { useDispatch, useSelector } from 'react-redux';
import { toggleIsSelectedPdf } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';


const ScrapChecklist: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList, isSelectedPdf } = useSelector((state: RootState) => state.scrap);


  const handleCheckboxChange = (scrapId: number) => {
    dispatch(toggleIsSelectedPdf(scrapId))
  };


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
    </>
  );
};

export default ScrapChecklist;
