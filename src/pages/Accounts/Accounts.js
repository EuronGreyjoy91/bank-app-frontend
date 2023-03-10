import React, { Fragment, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { userIsClient, userIsLogged } from '../../Commons';

import AccountsSearchBox from '../../components/AdminComponents/Accounts/AccountsSearchBox';
import AddIcon from '@mui/icons-material/Add';
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import AlertWithTimer from "../../components/Commons/AlertWithTimer";
import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function Accounts() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');

        if (userIsClient())
            navigate('/forbidden');
    }, []);

    return <Fragment>
        <AdminNavbar></AdminNavbar>
        {
            searchParams.get('alertStatus') && <AlertWithTimer severity={searchParams.get('alertStatus')} message={searchParams.get('message')}></AlertWithTimer>
        }
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
        </Container>
    </Fragment>
};

export default Accounts;