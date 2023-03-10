import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Accounts from './pages/Accounts/Accounts';
import Clients from './pages/Clients/Clients';
import CompleteData from './pages/Users/CompleteData';
import Forbidden from './pages/Forbidden';
import Home from './pages/Home';
import LoginNewUser from './pages/Users/LoginNewUser';
import MyAccounts from './pages/Accounts/MyAccounts';
import MyMovements from './pages/Movements/MyMovements';
import MyNewAccount from './pages/Accounts/MyNewAccount';
import NewAccount from './pages/Accounts/NewAccount';
import NewClient from './pages/Clients/NewClient';
import NewExtractionDeposit from './pages/Movements/NewExtractionDeposit';
import NewTransfer from './pages/Movements/NewTransfer';
import NewUser from './pages/Users/NewUser';
import PageNotFound from './pages/PageNotFound.js';
import Users from './pages/Users/Users';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cuentas" element={<Accounts />} />
                <Route path="/cuentas/nueva" element={<NewAccount />} />
                <Route path="/cuentas/:accountId/editar" element={<NewAccount />} />
                <Route path="/clientes" element={<Clients />} />
                <Route path="/clientes/nuevo" element={<NewClient />} />
                <Route path="/clientes/:clientId/editar" element={<NewClient />} />
                <Route path="/:clientId/cuentas" element={<MyAccounts />} />
                <Route path="/:clientId/cuentas/nueva" element={<MyNewAccount />} />
                <Route path="/:clientId/cuentas/:accountId/editar" element={<MyNewAccount />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/usuarios/:userId/editar" element={<NewUser />} />
                <Route path="/usuarios/nuevo" element={<NewUser />} />
                <Route path="/login/usuarios/nuevo" element={<LoginNewUser />} />
                <Route path="/:userId/completar-datos" element={<CompleteData />} />
                <Route path="/:clientId/movimientos" element={<MyMovements />} />
                <Route path="/:clientId/movimientos/nuevo" element={<NewExtractionDeposit />} />
                <Route path="/:clientId/transferencias/nueva" element={<NewTransfer />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
