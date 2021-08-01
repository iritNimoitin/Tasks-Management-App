import { useEffect, useState } from 'react'
import axios from 'axios'
import Tasks from './Tasks'
import "./Users.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField, Typography } from "@material-ui/core";
// const theme = createTheme({
//     palette: {

//     },
// });
const theme = createTheme({
    spacing: value => value ** 2,
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: blue[500],
        },
        secondary: {
            // This is green.A700 as hex.
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

});

function User(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [titles, setTitles] = useState([])
    const [color, setColor] = useState('2px 5px 7px 4px rgba(255, 0, 0, .7)');
    const [Completed, setCompleted] = useState(true)
    const [showTasks, setShowTasks] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(async () => {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
        let allTasks = resp.data;

        let userTasks = allTasks.filter(x => x.userId == props.userData.id);
        let allTitles = userTasks.map(x => x.title);
        let titles = allTitles.slice(0, 3);
        setTitles(titles);
        setShowTasks(true);
        if (userTasks.reduce((acc, task) => acc && task.Completed, true)) {
            setColor('2px 5px 7px 4px rgba(0, 255, 0, .7)');
            setCompleted(true);
        }
    }, [])

    const showInfo = () => {
        setShowDetails(true);
    }
    const closeInfo = () => {
        setShowDetails(false);
    }
    return (
        // <div className="Box">
        <ThemeProvider theme={theme}>

            <Card style={{ boxShadow: color }} className={classes.root}>
                <CardContent>
                    <div className="ContactUs">

                        User ID : {props.userData.id} <br /><br />
                        <TextField label="Name" variant="outlined" className="TextBox" value={props.userData.name} />
                        <br /><br />

                        <TextField label="Email" variant="outlined" type="email" className="TextBox" value={props.userData.email} />
                        <br /><br />

                        <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                            <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                <Button variant="contained" color="primary">
                                    Update
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </Box>
                            <Button variant="contained" onMouseOver={showInfo} >
                                Other Data
                            </Button>
                        </Box>

                        {/* {
                            showTasks && <Tasks titles={titles} />

                        } */}
                    </div>
                    <br />
                    {
                        showDetails ? <div id="details" style={{ border: '1px solid black', margin: '30px 30px 30px 30px', padding: '20px 20px 20px 20px', borderRadius: '20px' }} onClick={closeInfo}>
                            <TextField label="Street" variant="outlined" className="TextBox" value={props.userData.address.street} />
                            <br /><br />

                            <TextField label="City" variant="outlined" className="TextBox" value={props.userData.address.city} />
                            <br /><br />

                            <TextField label="Zip Code" variant="outlined" className="TextBox" value={props.userData.address.zipcode} />
                            <br /><br />

                        </div> : null
                    }


                </CardContent>
            </Card>
        </ThemeProvider >
    );
}

export default User;