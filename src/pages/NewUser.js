import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react';
import LoginNavbar from '../components/Commons/LoginNavbar';
import UserForm from '../components/Commons/UserForm';

const NewUser = () => {
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
                <UserForm></UserForm>
            </Container>
        </Fragment>
    )
};

export default NewUser;