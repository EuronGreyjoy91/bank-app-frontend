import Container from '@mui/material/Container';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import LoginNavbar from '../../components/Commons/LoginNavbar';
import LoginUserForm from '../../components/ClientComponents/LoginUserForm';
import { Typography } from '@mui/material';

const LoginNewUser = () => {
    return (
        <Fragment>
            <LoginNavbar />
            <Container>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12}>
                        <Typography align="center" variant="h3">
                            Nuevo usuario
                        </Typography>
                    </Grid>
                </Grid>
                <LoginUserForm></LoginUserForm>
            </Container>
        </Fragment>
    )
};

export default LoginNewUser;