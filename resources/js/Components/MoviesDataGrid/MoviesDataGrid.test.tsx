import {render} from '@testing-library/react';
import { MoviesDataGridId } from '@/constants/testIdentifiers';
import MoviesDataGrid from './MoviesDataGrid';

describe('MoviesDataGrid', () => {
  test('should render expected elements', () => {

    const {getByTestId} = render(<MoviesDataGrid movies={[]} />);

    const dataGrid = getByTestId(MoviesDataGridId);
    expect(dataGrid).toBeDefined();
  });
});
