import {Button, Box, Typography, TextField} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Todos.module.scss";
import { useRouter } from "next/router";

export default function Todos({todos}:any){
    const router:any = useRouter();
    const [todosArr, setTodosArr] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    
    function addTask() {
        axios.get("/api/addTask", {
          method: "GET",
          params: {
            name
          },   
        }).then((res) => {
           if(res.data.message) {
             setInfo(res.data.message)
             if (res.data.message == "Added") {
                axios.get("/api/getTodos").then((res) => {
                  if(res.data.length || res.data.length == 0) {
                    setTodosArr(res.data);
                  } else {
                    setInfo("Error");
                  }
                });
             }
           } else {
            console.error(res.data);
           };
        }).catch((e) => {
            console.error(e);
        });
    };

    function deleteTask(id:string) {
        axios.get("/api/deleteTask", {
            method: "GET",
            params: {
              id
            },   
          }).then((res) => {
             if(res.data.message) {
               if(res.data.message == "Deleted") {
                axios.get("/api/getTodos").then((res) => {
                    if(res.data.length || res.data.length == 0) {
                      setInfo("Deleted")
                      setTodosArr(res.data);
                    } else {
                      setInfo("Error");
                    }
                  });
               }
             } else {
              console.error(res.data);
             };
          }).catch((e) => {
              console.error(e);
          });
    }

    useEffect(() => {
        setTodosArr(todos);
    }, []);

    return (
        <Box className={styles.main}>
           <Box className={styles.todoCont}>
                {todosArr.map((elem:any) => (
                   <Box 
                     className={styles.todoItem}
                     key={elem.id}>
                      <Typography 
                        className={styles.todoTitle}>
                        {elem.name}
                      </Typography>
                      <Button
                       variant="contained"
                       onClick={() => deleteTask(elem.id)}> Mark as done </Button>
                    </Box>
                )) }
           </Box>
           <Box 
            className={styles.addCont}>
            <TextField 
              type={"text"}
              name="name"
              value={name}
              className={styles.addInput}
              onChange={(e) => setName(e.target.value)}
              />
            <Button
             onClick={addTask}
             variant="contained">
               Add Task
            </Button>
            <Typography className={styles.addInfo}>
                {info}
            </Typography>
           </Box>
        </Box>
    )
}