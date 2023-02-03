import React, { Fragment, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import CompleteDataForm from '../../components/ClientComponents/CompleteDataForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LoginNavbar from '../../components/Commons/LoginNavbar';
import { Typography } from '@mui/material';
import { userIsLogged } from '../../Commons';

const CompleteData = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');
    }, []);
    
    return (
        <Fragment>
            <LoginNavbar></LoginNavbar>
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            Completar informaci&oacute;n
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <CompleteDataForm></CompleteDataForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default CompleteData;