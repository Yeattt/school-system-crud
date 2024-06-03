import * as React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {
  fields: GridColDef[];
  rows: any;
}

export const DataTable: React.FC<Props> = ({ fields, rows: rowsTable }) => {
  const columns = fields;
  const rows = rowsTable;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      sx={{
        backgroundColor: '#FFFF',
        border: 'none',
        paddingLeft: 5,
        paddingRight: 5,
        width: '100%',
        '& .MuiDataGrid-row': {
          fontSize: '15',
          fontWeight: '500',
        },
      }}
    />
  );
}