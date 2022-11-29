import {Button, Box, Typography, TextField} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/Todos.module.scss";

interface ToDo {
  name: string,
  id: number
}

export default function Todos({todos}:any){
    const [todosArr, setTodosArr] = useState<ToDo[]>(todos);
    const [name, setName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [infoColor, setInfoColor] = useState<string>("green");

    // Refresh todos 
    function refreshTodos() {
      axios.get("/api/todos").then((res) => {
        if(res.data.length || res.data.length == 0) {
          setTodosArr(res.data);
        } else {
          setInfo("Error");
          setInfoColor("red");
        };
      });
    };
    
    //  Add task 
    function addTask() {
       if(name.length == 0) {
        setInfo("Todo's name required");
        setInfoColor("red");
        return;
       }
        axios.post("/api/todos", {name}).then((res) => {
           if(res.data.message) {
             setInfo(res.data.message)
             if (res.data.message == "Added") {
                refreshTodos();
             }
           } else {
            console.error(res.data);
           };
        }).catch((e) => {
            console.error(e);
        });
    };

    // Delete task 
    function deleteTask(id:string) {
        axios.delete(`/api/todos/${id}`).then((res) => {
             if(res.data.success) {
                 setInfoColor("green")
                 setInfo("Deleted");
                 refreshTodos();
             } else {
               console.error(res.data.message);
             };
          }).catch((e) => {
              console.error(e);
          });
    };

    return (
        <Box className={styles.main}>
           <Box className={styles.todoCont}>
                {todosArr.map((elem:ToDo) => (
                   <Box 
                     className={styles.todoItem}
                     key={elem.id}>
                      <Typography 
                        className={styles.todoTitle}>
                        {elem.name}
                      </Typography>
                      <Button
                       variant="contained"
                       onClick={() => deleteTask(elem.id as any)}
                       color="secondary"
                       className={styles.todoButton}>
                         Mark as done
                      </Button>
                    </Box>
                )) }
           </Box>
           <Box 
            className={styles.addCont}>
            <TextField 
              type={"text"}
              value={name}
              className={styles.addInput}
              onChange={(e) => setName(e.target.value)}
              />
            <Button
             onClick={addTask}
             variant="contained">
               Add Task
            </Button>
            <Typography 
              className={styles.addInfo} 
              color={infoColor}>
                {info}
            </Typography>
           </Box>
        </Box>
    );
};