import axios from 'axios'
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react'
import User from './User';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";

function Users() {

    const [users, setUsers] = useState([]);
    const [usersDisplay, setUsersDisplay] = useState([]);
    const searchData = (e) => {
        let filterUsers = users.filter(user => user.email.includes(e.target.value) || user.name.includes(e.target.value));
        setUsersDisplay(filterUsers);
    }
    useEffect(async () => {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(resp.data);
        setUsersDisplay(resp.data);
    }, [])

    return (
        <div className="App">

            <Typography variant="h3">
                Users List
            </Typography><br />
            <form noValidate autoComplete="off">
                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={searchData} />
                    </Box>
                    <Button variant="contained" color="secondary">
                        Add
                    </Button>
                </Box>
            </form> <br />

            {
                usersDisplay.map((user) => {
                    return <User userData={user} key={user.id} />
                })
            }

        </div>
    );
}

export default Users;