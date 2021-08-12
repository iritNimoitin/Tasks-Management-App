import { useEffect, useState } from 'react'
import axios from 'axios'
import Tasks from './Tasks'
import "./Users.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, green, pink } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField, Typography } from "@material-ui/core";
import TasksUtil from '../Utils/TasksUtil';


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
    button: {
        primary: {
            main: green[500],
        },

    }
});
const useStyles = makeStyles({
    root: {
        minWidth: 400,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    },
    provider: {
        display: 'flex',
        flexDirection: 'row'
    },
    tasks: {
        marginLeft: '70px'
    }

});

function User(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [todos, setTodos] = useState([])
    const [color, setColor] = useState('2px 5px 7px 4px rgba(255, 0, 0, .7)');
    const [beckColor, setBeckColor] = useState('white');
    const [completed, setCompleted] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [user, setUser] = useState(props.userData);


    useEffect(async () => {
        let resp = await TasksUtil.getAllTasks();
        let allTasks = resp.data;
        let userTasks = allTasks.filter(x => x.userId == props.userData.id);
        setTodos(userTasks);
        setShowTasks(false);
        if (userTasks.reduce((acc, task) => acc && task.Completed, true)) {
            setColor('2px 5px 7px 4px rgba(0, 255, 0, .7)');
            setCompleted(true);
        }
    }, [])

    const checkCompleted = (tasks) => {
        if (tasks.reduce((acc, task) => acc && task.completed, true)) {
            setColor('2px 5px 7px 4px rgba(0, 255, 0, .7)');
            setBeckColor('rgba(0, 255, 0, .7)');
            setCompleted(true);
        }
    }

    const showInfo = () => {
        if (showDetails) {
            setShowDetails(false);
        } else {
            setShowDetails(true);
        }

    }

    const UpdateUser = async (e) => {
        e.preventDefault();
        props.UpdateCallback(user);
    }

    const DeleteUser = async (e) => {
        e.preventDefault();
        props.DeleteCallback();
    }

    const showTodos = () => {
        if (!props.showAddUser) {
            if (beckColor === 'white') {
                if (completed === true) {
                    setBeckColor('rgba(0, 255, 0, .7)');
                } else {
                    setBeckColor('rgba(255, 0, 0, .7)');
                }
                setShowTasks(true);
            } else {
                setBeckColor('white');
                setShowTasks(false);
            }
        }

    }


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.provider}>
                <Card style={{ boxShadow: color, backgroundColor: beckColor }} className={classes.root} >
                    <CardContent>
                        <div  >
                            <div className="ContactUs">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-between"
                                }}>
                                    <span onClick={showTodos}> User ID : {props.userData.id}</span>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <Button variant="contained" color="primary" onClick={showTodos}>
                                        Tasks
                                    </Button><br /><br />
                                </div>
                                <form >

                                    <TextField label="Name" variant="outlined" className="TextBox" value={user.name}
                                        onChange={e => setUser({ ...user, name: e.target.value })} />
                                    <br /><br />

                                    <TextField label="Email" variant="outlined" type="email" className="TextBox" value={user.email}
                                        onChange={e => setUser({ ...user, email: e.target.value })} />
                                    <br /><br />

                                    <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                        <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                            <Button variant="contained" color="primary" onClick={UpdateUser}>
                                                Update
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={DeleteUser} >
                                                Delete
                                            </Button>
                                        </Box>
                                        <Button variant="contained" onClick={showInfo} >
                                            Other Data
                                        </Button>
                                    </Box>

                                </form>

                            </div>
                        </div>

                        <br />
                        {
                            showDetails ? <div id="details" style={{ border: '1px solid black', margin: '30px 30px 30px 30px', padding: '20px 20px 20px 20px', borderRadius: '20px' }} >
                                <form >
                                    <TextField label="Street" variant="outlined" className="TextBox" value={user.address.street} onChange={e => setUser({ ...user, address: { ...user.address, street: e.target.value } })} />
                                    <br /><br />

                                    <TextField label="City" variant="outlined" className="TextBox" value={user.address.city} onChange={e => setUser({ ...user, address: { ...user.address, city: e.target.value } })} />
                                    <br /><br />

                                    <TextField label="Zip Code" variant="outlined" className="TextBox" value={user.address.zipcode} onChange={e => setUser({ ...user, address: { ...user.address, zipcode: e.target.value } })} />
                                    <br /><br />
                                </form>
                            </div> : null
                        }


                    </CardContent>
                </Card>
                <div className={classes.tasks}>

                    {
                        showTasks &&
                        <Tasks todos={todos} user={user}
                            UpdateTaskCallback={async (updatedTask) => {
                                console.log(updatedTask)
                                let id = updatedTask.id;
                                await TasksUtil.updateTask(id, updatedTask);
                                let filteredTasks = todos.filter(task => task.id != id);
                                setTodos([...filteredTasks, updatedTask]);
                                checkCompleted([...filteredTasks, updatedTask]);
                            }}
                            AddTaskCallback={async (newTask) => {
                                console.log(newTask);
                                let resp = await TasksUtil.addTask(newTask);
                                console.log(resp.data);
                                setTodos([...todos, newTask]);
                                setShowTasks(true);


                            }}

                        />

                    }
                </div>
            </div>
        </ThemeProvider >
    );
}

export default User;
