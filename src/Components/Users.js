import { pink, blue } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react'
import User from './User';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";
import UserUtils from '../Utils/UserUtils';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const theme = createTheme({
    spacing: value => value ** 2,
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: pink[500],
        },
    },
});

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    addUser: {
        minWidth: 275,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    }

});

function Users() {


    const [users, setUsers] = useState([]);
    const [usersDisplay, setUsersDisplay] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserStreet, setUserStreet] = useState("");
    const [UserCity, setUserCity] = useState("");
    const [Userzipcode, setUserzipcode] = useState("");

    const searchData = (e) => {
        let filterUsers = users.filter(user => user.email.includes(e.target.value) || user.name.includes(e.target.value));
        setUsersDisplay(filterUsers);
    }
    useEffect(async () => {
        let resp = await UserUtils.getAllUsers();
        setUsers(resp.data);
        setUsersDisplay(resp.data);
    }, [])

    const showAddUsers = () => {
        setShowAddUser(true);
    }
    const cancel = () => {
        setShowAddUser(false);
    }

    const addNewUser = async () => {
        let newUser = { name: UserName, email: UserEmail, address: { street: UserStreet, city: UserCity, zipcode: Userzipcode } };
        console.log(newUser);
        let resp = await UserUtils.addUser(newUser);
        let addedUser = resp.data;
        setUsers([...users, addedUser]);
        setUsersDisplay([...usersDisplay, addedUser]);
        console.log(users);
        setShowAddUser(false);
    }


    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className="App">

            <Typography color="primary" variant="h3">
                Users List
            </Typography><br />
            <form noValidate autoComplete="off">
                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={searchData} />
                    </Box>
                    <Button variant="contained" color="secondary" onClick={showAddUsers}>
                        Add
                    </Button>
                </Box>
            </form> <br />
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>
                    {
                        usersDisplay.map((user) => {
                            return <User userData={user} key={user.id} showAddUser={showAddUser}
                                UpdateCallback={async (updatedUser) => {
                                    let id = user.id;
                                    let resp = await UserUtils.updateUser(id, updatedUser);
                                    let filteredUsers = users.filter(user => user.id != id);
                                    setUsers([...filteredUsers, updatedUser]);
                                    setUsersDisplay([...filteredUsers, updatedUser]);

                                }}

                                DeleteCallback={async () => {
                                    let id = user.id;
                                    let resp = await UserUtils.deleteUser(id);
                                    let filteredUsers = users.filter(user => user.id != id);
                                    setUsersDisplay(filteredUsers);
                                    setUsers(filteredUsers);

                                }} />
                        })
                    }
                </div>
                {
                    showAddUser &&
                    <div className={classes.addUser}>
                        <ThemeProvider theme={theme} >
                            <Card style={{ boxShadow: '2px 5px 7px 4px rgba(0, 0, 255, .7)' }}>
                                <CardContent>
                                    <Box style={{ marginRight: '30px' }}>
                                        <Typography variant="h6">
                                            Add New User
                                        </Typography>
                                        <br />
                                        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setUserName(e.target.value)} />
                                        <br /> <br />
                                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={e => setUserEmail(e.target.value)} />
                                        <br /> <br />
                                        <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                            <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                                <Button size="small" variant="contained" color="secondary" onClick={addNewUser}>
                                                    Add
                                                </Button><br /><br />
                                            </Box>
                                            <Button size="small" variant="contained" color="primary" onClick={cancel} >
                                                Cancel
                                            </Button><br /><br />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </ThemeProvider >
                    </div>
                }
            </div>
        </div>
    );
}

export default Users;
