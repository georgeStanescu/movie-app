import {fireEvent, render} from '@testing-library/react';
import { MatrixButtonId, MatrixReloadedButtonId, MatrixRevolutionsButtonId } from '@/constants/testIdentifiers';
import Movies from './Movies';
import axios from 'axios';
import { SearchResponse } from '@/api/models';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, {shallow: true});

describe('<Movies>', () => {
  test('should render expected elements', () => {

    const {getByTestId} = render(<Movies />);

    const matrixButton = getByTestId(MatrixButtonId);
    expect(matrixButton).toBeDefined();

    const matrixReloadedButton = getByTestId(MatrixReloadedButtonId);
    expect(matrixReloadedButton).toBeDefined();

    const matrixRevolutionsButton = getByTestId(MatrixRevolutionsButtonId);
    expect(matrixRevolutionsButton).toBeDefined();
  });

  test('should fire data fetching when pressing the buttons', () => {

    const {getByTestId} = render(<Movies />);

    const mockedAxiosGet = jest.fn();
    mockedAxiosGet.mockReturnValue(
      Promise.resolve<SearchResponse>({
        Response: true,
        Search: [],
        totalResults: 0
      })
    );
    mockedAxios.get = mockedAxiosGet;

    const matrixButton = getByTestId(MatrixButtonId);
    fireEvent.click(matrixButton);
    expect(mockedAxiosGet).toHaveBeenCalled();
  });
});
