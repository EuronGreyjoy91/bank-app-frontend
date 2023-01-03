import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Fragment } from 'react';
import LoginNavbar from '../components/Commons/LoginNavbar';

const NewUser = () => (
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
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="name-input"
                        name="name"
                        label="Usuario"
                        type="text"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="age-input"
                        name="age"
                        label="Contraseña"
                        type="password"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="age-input"
                        name="age"
                        label="Reingresar contraseña"
                        type="password"
                    />
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "40px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={4}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Registrarse
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Fragment>
);

export default NewUser;