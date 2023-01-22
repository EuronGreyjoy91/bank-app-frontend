import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function AdminNavbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="auto">
                <Toolbar disableGutters>
                    <AccountBalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BANK APP |
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem component="a" href="/cuentas" key={'Cuentas'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Cuentas</Typography>
                            </MenuItem>
                            <MenuItem component="a" href="/clientes" key={'Clientes'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Clientes</Typography>
                            </MenuItem>
                            <MenuItem component="a" href="/usuarios" key={'Usuarios'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Usuarios</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AccountBalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BANK-APP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={Link} to="/cuentas"
                            key={'Cuentas'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cuentas&nbsp;
                            <SavingsIcon style={{ verticalAlign: "middle" }}></SavingsIcon>
                        </Button>
                        <Button
                            component={Link} to="/clientes"
                            key={'Clientes'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Clientes&nbsp;
                            <ManageAccountsIcon style={{ verticalAlign: "middle" }}></ManageAccountsIcon>
                        </Button>
                        <Button
                            component={Link} to="/usuarios"
                            key={'Usuarios'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Usuarios
                            <FaceIcon style={{ verticalAlign: "middle" }}></FaceIcon>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AdminNavbar;