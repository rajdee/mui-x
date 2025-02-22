import * as React from 'react';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { useMovieData } from '@mui/x-data-grid-generator';
import Rating from '@mui/material/Rating';

const COLUMNS = [
  { field: 'title', headerName: 'Title', width: 200, groupable: false },
  {
    field: 'imdbRating',
    headerName: 'Rating',
    type: 'number',
    width: 180,
    private_availableAggregationFunctions: ['min', 'max', 'avg', 'size'],
    // Imdb rating is on a scale from 0 to 10, the MUI rating component is on a scale from 0 to 5
    renderCell: (params) => {
      if (params.aggregation && !params.aggregation.hasCellUnit) {
        return params.formattedValue;
      }

      return (
        <Rating
          name={params.row.title}
          value={params.value / 2}
          readOnly
          precision={0.5}
        />
      );
    },
  },
];

export default function AggregationRenderCell() {
  const data = useMovieData();

  // We take movies with the highest and lowest rating to have a visual difference
  const rows = React.useMemo(() => {
    const sortedRows = [...data.rows].sort((a, b) => b.imdbRating - a.imdbRating);

    return [...sortedRows.slice(0, 2), ...sortedRows.slice(-1)];
  }, [data.rows]);

  return (
    <DataGridPremium
      // The 2 following props are here to avoid scroll in the demo while we don't have pinned rows
      rows={rows}
      autoHeight
      columns={COLUMNS}
      initialState={{
        private_aggregation: {
          model: {
            imdbRating: 'avg',
          },
        },
      }}
      experimentalFeatures={{
        private_aggregation: true,
      }}
    />
  );
}
