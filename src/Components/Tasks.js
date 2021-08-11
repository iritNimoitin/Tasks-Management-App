import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Typography } from "@material-ui/core";
import { red, orange } from '@material-ui/core/colors';
import { useEffect, useState } from 'react'
import PostsUtil from '../Utils/PostsUtil';
import Box from '@material-ui/core/Box';





const theme = createTheme({
    spacing: value => value ** 2,
    palette: {
        primary: {
            main: orange[500],
        },
        secondary: {
            main: red[500],
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

function Tasks(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [posts, setPosts] = useState([])
    const [showAddTasks, setShowAddTasks] = useState(false)
    const [showAddPosts, setShowAddPosts] = useState(false)
    const [TaskTitle, setTaskTitle] = useState("");
    const [PostTitle, setPostTitle] = useState("");
    const [PostBody, setPostBody] = useState("");

    useEffect(async () => {
        let resp = await PostsUtil.getAllPosts();
        let allPosts = resp.data;
        setPosts(allPosts);
    }, [])

    const markCompleted = async (id) => {
        let filteredTask = props.todos.filter(task => task.id == id);
        let updatedTask = { ...filteredTask[0], completed: true }
        props.UpdateTaskCallback(updatedTask);
    }
    const showAddTask = () => {
        setShowAddTasks(true);
    }
    const showAddPost = () => {
        setShowAddPosts(true);


    }
    const addNewTodo = () => {
        let userId = props.user.id;
        let newTask = { userId: userId, title: TaskTitle, completed: false }
        props.AddTaskCallback(newTask);
        setShowAddTasks(false);
        setShowAddPosts(false);
    }
    const addNewPost = async () => {
        let userId = props.user.id;
        let newPost = { userId: userId, title: PostTitle, body: PostBody }
        console.log(newPost);
        let resp = await PostsUtil.addPost(newPost);
        console.log(resp.data);
        setPosts([...posts, newPost]);
        setShowAddTasks(false);
        setShowAddPosts(false);
    }
    const cancel = () => {
        setShowAddTasks(false);
        setShowAddPosts(false);
    }

    return (
        <div className="Tasks">

            <ThemeProvider theme={theme}>

                <Card style={{ boxShadow: '2px 5px 7px 4px rgba(0, 0, 255, .7)' }} className={classes.root} >
                    <CardContent>
                        {!showAddTasks && !showAddPosts &&
                            <>
                                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                        <Typography variant="h5">
                                            Todos - User {props.user.id}
                                        </Typography> <br />
                                    </Box>
                                    <Button size="small" variant="contained" color="secondary" onClick={showAddTask} >
                                        Add
                                    </Button><br /><br />
                                </Box>

                                {props.todos.map((task, index) => {
                                    return <div style={{ border: '1px solid black', minWidth: '250px', margin: '30px 30px 30px 30px', padding: '20px 20px 20px 20px', borderRadius: '20px' }} key={index}>
                                        Task: {task.title} <br /><br />
                                        Completed: {task.completed.toString()}<br /><br />
                                        {
                                            !task.completed && <Button size="small" variant="contained" color="primary" onClick={() => markCompleted(task.id)} >
                                                Mark Completed
                                            </Button>
                                        }

                                    </div>

                                })}


                                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                        <Typography variant="h5">
                                            Posts - User {props.user.id}
                                        </Typography> <br />
                                    </Box>
                                    <Button size="small" variant="contained" color="secondary" onClick={showAddPost}>
                                        Add
                                    </Button><br /><br />
                                </Box>

                                {posts.map((post, index) => {
                                    return <div style={{ border: '1px solid black', margin: '30px 30px 30px 30px', padding: '20px 20px 20px 20px', borderRadius: '20px' }} key={index}>
                                        Title: {post.title} <br /><br />
                                        Body : {post.body}<br />

                                    </div>

                                })}

                            </>
                        }
                        {
                            showAddTasks &&
                            <Box style={{ marginRight: '30px' }}>
                                <Typography variant="h6">
                                    New Todo - User {props.user.id}
                                </Typography>
                                <br /><br />
                                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={e => setTaskTitle(e.target.value)} />
                                <br /> <br />
                                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                        <Button size="small" variant="contained" color="secondary" onClick={addNewTodo}>
                                            Add
                                        </Button><br /><br />
                                    </Box>
                                    <Button size="small" variant="contained" color="primary" onClick={cancel} >
                                        Cancel
                                    </Button><br /><br />
                                </Box>
                            </Box>
                        }
                        {
                            showAddPosts &&
                            <Box style={{ marginRight: '30px' }}>
                                <Typography variant="h6">
                                    New Post - User {props.user.id}
                                </Typography>
                                <br /><br />
                                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={e => setPostTitle(e.target.value)} />
                                <br /> <br />
                                <TextField id="outlined-basic" label="Body" variant="outlined" onChange={e => setPostBody(e.target.value)} />
                                <br /> <br />
                                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                                        <Button size="small" variant="contained" color="secondary" onClick={addNewPost}>
                                            Add
                                        </Button><br /><br />
                                    </Box>
                                    <Button size="small" variant="contained" color="primary" onClick={cancel} >
                                        Cancel
                                    </Button><br /><br />
                                </Box>
                            </Box>
                        }

                    </CardContent>
                </Card>
            </ThemeProvider >
        </div>
    );
}

export default Tasks;