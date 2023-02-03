import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';

const renderActionsButton = (params) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Fragment>
            <Tooltip title="Editar">
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        window.location.replace(`/${user.clientId}/cuentas/${params.row._id}/editar`);
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </Fragment>
    )
}

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        flex: 1
    },
    {
        field: 'description',
        headerName: 'Tipo de cuenta',
        flex: 0.5,
        valueGetter: (params) => {
            return params.row.accountType.description;
        }
    },
    {
        field: 'creationDate',
        headerName: 'Fecha creacion',
        flex: 1,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm"),
    },
    {
        field: 'alias',
        headerName: 'Alias',
        flex: 1,
    },
    {
        field: 'number',
        headerName: 'Numero',
        type: 'number',
        flex: 0.5,
    },
    {
        field: 'balance',
        headerName: 'Saldo',
        flex: 1,
        valueGetter: (params) => {
            return `$ ${params.row.balance}`;
        }
    },
    {
        field: 'offLimitAmount',
        headerName: 'Descubierto limite',
        flex: 1,
        valueGetter: (params) => {
            return `$ ${params.row.offLimitAmount}`;
        }
    },
    {
        field: 'actions',
        headerName: 'Acciones',
        sortable: false,
        flex: 0.5,
        renderCell: renderActionsButton,
        disableClickEventBubbling: true,
    },
];

function MyAccountsTable({ accounts }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid style={{ paddingTop: "40px" }} item xs={12}>
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={accounts}
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

export default MyAccountsTable;