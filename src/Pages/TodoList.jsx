import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/Todolist.css';


const Todolist = () => {
    const [todo, setTodo] = useState('');
    const [status, setStatus] = useState(false);
    const [todoArray, setTodoArray] = useState([]);



    const postTodo = async () => {
        try {
            await axios.post("http://localhost:5000/csbs/addtodo", { todo }).then((response) => { console.log(response.data) })
            setTodo('');
            setStatus(true);
            getTodo();
            setTimeout(() => setStatus(false), 3000);// 3000 means 3000 milli seconds
        } catch (err) {
            console.error(err);
        }
    }

    const getTodo = async () => {
        await axios.get("http://localhost:5000/csbs/gettodo")
            .then((response) => {
                setTodoArray(response.data)
            })

    }
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/csbs/deletetodo/${id}`)

            getTodo()
        } catch (err) {
            console.log(err);

        }
    }
    const updateTodo = async (id, data) => {
        try {
            await axios.put(`http://localhost:5000/csbs/updatetodo/${id}`, { todo: data });
            getTodo();
        } catch (err) {
            console.error(err);
        }
    }
    const newTodo = async (id, data) => {
        const newData = prompt("Enter your new todo", data);
        if (newData.trim() == "") {
            newTodo(id)
        }
        updateTodo(id, newData);
    }


    useEffect(() => { getTodo(), [] })


    return (
        <div className="todolist">
            <Typography variant="h2" gutterBottom>
                Todo List
            </Typography>
            <div className="box">
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField
                        fullWidth
                        label="Enter your task"
                        id="fullWidth"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)} />
                </Box>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        className="button"
                        onClick={postTodo} >
                        ADD TODO
                    </Button>
                </Stack>
            </div>
            {
                status && (
                    <div style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        zIndex: "9999",
                    }}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Todo has been Posted.
                        </Alert>
                    </div>
                )
            }
            <div>
                <ul className='op'>
                    {
                        todoArray.map((res) => (
                            <li key={res._id} className='li1'>
                                <h3>{res.todo}</h3>
                                <div>

                                    <IconButton aria-label="update" size="small" onClick={() => newTodo(res._id, res.todo)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(res._id)} >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>


        </div >
    )
}
export default Todolist