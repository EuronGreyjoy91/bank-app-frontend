import React, { useEffect, useState } from 'react';

import { BASE_CLIENTS_URL } from '../../../Commons';
import MyAccountsTable from './MyAccountsTable';
import axios from 'axios';

function MyAccountsSearchBox() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios(`${BASE_CLIENTS_URL}/63c42da141fc849de18096f6/accounts`)
            .then((response) => {
                setAccounts(response.data);
            })
    }, []);

    return (
        <MyAccountsTable accounts={accounts}></MyAccountsTable>
    );
}

export default MyAccountsSearchBox;