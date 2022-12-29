import Button from "@material-ui/core/Button";
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AccountsSearchBox from '../components/Admin/AccountsSearchBox';
import AccountsTable from '../components/Admin/AccountsTable';
import AdminNavbar from '../components/Admin/AdminNavbar';

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