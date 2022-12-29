import React from 'react';
import { Fragment } from 'react';
import AdminNavbar from '../components/Admin/AdminNavbar';
import AccountsSearchBox from '../components/Admin/AccountsSearchBox';
import AccountsTable from '../components/Admin/AccountsTable';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Accounts = () => (
    <Fragment>
        <AdminNavbar></AdminNavbar>
        <Container maxWidth={false}>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={8}>
                    <Typography variant="h4">
                        Cuentas
                    </Typography>
                </Grid>
                <Grid style={{ paddingTop: "40px" }} item xs={4}>
                    <Box textAlign='right'>
                        <Button component={Link} to="/cuentas/nueva" variant="contained" color="primary">
                            Nueva cuenta <AddIcon></AddIcon>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <AccountsSearchBox></AccountsSearchBox>
            <br></br>
            <AccountsTable></AccountsTable>
        </Container>
    </Fragment>
);

export default Accounts;