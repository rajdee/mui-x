import * as React from 'react';
import {
  DataGridPremium,
  PRIVATE_GRID_AGGREGATION_FUNCTIONS,
  GridColDef,
} from '@mui/x-data-grid-premium';
import { useMovieData } from '@mui/x-data-grid-generator';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const COLUMNS: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200, groupable: false },
  {
    field: 'gross',
    headerName: 'Gross',
    type: 'number',
    width: 150,
    groupable: false,
    valueFormatter: ({ value }) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },
];

export default function AggregationRemoveFunctionAllColumns() {
  const data = useMovieData();

  return (
    <DataGridPremium
      // The 2 following props are here to avoid scroll in the demo while we don't have pinned rows
      rows={data.rows.slice(0, 3)}
      autoHeight
      columns={COLUMNS}
      private_aggregationFunctions={Object.fromEntries(
        Object.entries(PRIVATE_GRID_AGGREGATION_FUNCTIONS).filter(
          ([name]) => name !== 'sum',
        ),
      )}
      initialState={{
        private_aggregation: {
          model: {
            gross: 'max',
          },
        },
      }}
      experimentalFeatures={{
        private_aggregation: true,
      }}
    />
  );
}
