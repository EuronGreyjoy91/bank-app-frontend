import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';
import { clientHasMissingData, userIsAdmin, userIsLogged } from '../../Commons';

import AddIcon from '@mui/icons-material/Add';
import AlertWithTimer from "../../components/Commons/AlertWithTimer";
import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import ClientNavbar from '../../components/ClientComponents/ClientNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyAccountsSearchBox from '../../components/ClientComponents/MyAccounts/MyAccountsSearchBox';
import { Typography } from '@mui/material';

function MyAccounts() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');

        if (userIsAdmin())
            navigate('/forbidden');

        if (clientHasMissingData())
            navigate('/completar-datos');
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Fragment>
            <ClientNavbar></ClientNavbar>
            {
                searchParams.get('alertStatus') && <AlertWithTimer severity={searchParams.get('alertStatus')} message={searchParams.get('message')}></AlertWithTimer>
            }
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            Mis cuentas
                        </Typography>
                    </Grid>
                    <Grid style={{ paddingTop: "40px" }} item xs={4}>
                        <Box textAlign='right'>
                            <Button component={Link} to={`/${user.clientId}/cuentas/nueva`} variant="contained" color="primary">
                                Abrir cuenta <AddIcon></AddIcon>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <MyAccountsSearchBox></MyAccountsSearchBox>
            </Container>
        </Fragment>
    )
};

export default MyAccounts;