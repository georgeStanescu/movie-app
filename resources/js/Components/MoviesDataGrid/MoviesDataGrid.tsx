import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Movie } from '@/api/models';
import { MoviesDataGridId } from '@/constants/testIdentifiers';

const columns: GridColDef[] = [
  { field: 'Poster', headerName: 'Poster', width: 100, sortable: false,
    renderCell: (params) => <img src={params.value} />
  },
  { field: 'Title', headerName: 'Title', width: 300 },
  { field: 'Year', headerName: 'Year', width: 100 },
];

export interface MoviesDataGridProps {
    movies: Movie[];
}

const MoviesDataGrid: FC<MoviesDataGridProps> = ({movies}) => {

  const rows = movies.map(movie => { return { id: movie.imdbID, ...movie }; });

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }} data-testid={MoviesDataGridId}>
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </div>
    </div>
  );
};

export default MoviesDataGrid;
