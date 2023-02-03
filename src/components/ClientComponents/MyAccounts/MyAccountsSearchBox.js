import { BASE_CLIENTS_URL, authHeader } from '../../../Commons';
import React, { useEffect, useState } from 'react';

import MyAccountsTable from './MyAccountsTable';
import axios from 'axios';

function MyAccountsSearchBox() {
    const [accounts, setAccounts] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios(`${BASE_CLIENTS_URL}/${user.clientId}/accounts`, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setAccounts(response.data);
        })
    }, []);

    return (
        <MyAccountsTable accounts={accounts}></MyAccountsTable>
    );
}

export default MyAccountsSearchBox;