import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { Fragment } from 'react';
import { BASE_ACCOUNTS_URL } from '../../Commons';

const patchAccount = (account) => {
    axios
        .patch(`${BASE_ACCOUNTS_URL}/${account.accountId}`, account)
        .then((response) => {
            if (response.status === 200) {
                window.location.replace("/cuentas?alertStatus=success&message=Cuenta modificada con exito");
            }
        });
}

const renderActionsButton = (params) => {
    return (
        <Fragment>
            <Tooltip title={params.row.enable ? "Desactivar" : "Activar"}>
                <IconButton
                    variant="contained"
                    color={params.row.enable ? "error" : "success"}
                    onClick={() => {
                        patchAccount({ accountId: params.row._id, enable: !params.row.enable });
                    }}
                >
                    {params.row.enable ? <DisabledByDefaultIcon /> : <CheckBoxIcon />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        window.location.replace(`/cuentas/${params.row._id}/editar`);
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
        field: 'name',
        headerName: 'Cliente',
        flex: 1,
        valueGetter: (params) => {
            return `${params.row.client.name} ${params.row.client.lastName}`;
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
        flex: 1,
    },
    {
        field: 'enable',
        headerName: 'Activa?',
        description: 'This column has a value getter and is not sortable.',
        type: 'boolean',
        sortable: true,
        flex: 0.5,
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

function AccountsTable({ accounts }) {
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

export default AccountsTable;