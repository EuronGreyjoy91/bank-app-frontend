import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import moment from 'moment';

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        flex: 0.5
    },
    {
        field: 'movementType',
        headerName: 'Tipo de movimiento',
        flex: 0.5,
        valueGetter: (params) => {
            return params.row.movementType.description;
        }
    },
    {
        field: 'concept',
        headerName: 'Concepto',
        flex: 1
    },
    {
        field: 'creationDate',
        headerName: 'Fecha creacion',
        flex: 1,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm"),
    },
    {
        field: 'amount',
        headerName: 'Monto',
        flex: 1,
        valueGetter: (params) => {
            return `$ ${params.row.amount}`;
        }
    },
    {
        field: 'originAccount',
        headerName: 'Origen',
        flex: 1,
        valueGetter: (params) => {
            return `${params.row.originAccount.number} - ${params.row.originAccount.alias}`
        }
    },
    {
        field: 'destinyAccount',
        headerName: 'Destino',
        flex: 1,
        valueGetter: (params) => {
            return `${params.row.destinyAccount.number} - ${params.row.destinyAccount.alias}`
        }
    }
];

function MyMovementsTable({ movements }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid style={{ paddingTop: "40px" }} item xs={12}>
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={movements}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row._id}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default MyMovementsTable;