import {render} from '@testing-library/react';
import { MoviesGridContainerId } from '@/constants/testIdentifiers';
import MoviesDataGrid from './MoviesDataGrid';

describe('<MoviesDataGrid>', () => {
  test('should render expected elements', () => {

    const {getByTestId} = render(<MoviesDataGrid movies={[]} />);

    const dataGrid = getByTestId(MoviesGridContainerId);
    expect(dataGrid).toBeDefined();
  });
});
