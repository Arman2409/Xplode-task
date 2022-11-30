import {Button, Box, Typography, TextField, CircularProgress} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getTodosThunk, deleteTodoThunk, addTodoThunk } from "../../store/slices/todos";
import { useUpdateEffect } from "usehooks-ts";
import { useKeyPress } from "@react-typed-hooks/use-key-press";

import styles from "../../styles/Todos.module.scss";

interface ToDo {
  name: string,
  id: number
}

export default function Todos({initialTodos}:any){
   // States 
    const [todosArr, setTodosArr] = useState<ToDo[]>(initialTodos);
    const [name, setName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [infoColor, setInfoColor] = useState<string>("green");
    const [zindex, setZindex] = useState(-1);

    // Constant hooks
    const dispatch = useDispatch();

    // Selectors
    const todos:any = useSelector(function(state:any){
      return state.todos.todos;
    });
    const addStatus:any = useSelector(function(state:any){
      return state.todos.addStatus;
    });
    const deleteStatus:any = useSelector(function(state:any){
      return state.todos.deleteStatus;
    });
    const newChange:any = useSelector(function(state:any){
      return state.todos.changedTodos;
    });

    //  Adding task 
    function addTask() {
       if(name.length == 0) {
        setInfo("Todo's name required");
        setInfoColor("red");
        return;
       };
       dispatch(addTodoThunk(name) as any);
    };

    // Deleting task 
    function deleteTask(id:string) {
        dispatch(deleteTodoThunk(id) as any);
    };

    useEffect(() => {
       if(addStatus) {
          setInfo("Added");
          setInfoColor("green")
       };
    }, [addStatus]);

    useEffect(() => {
        if(deleteStatus) {
           setInfo("Deleted");
           setInfoColor("green")
        };
    }, [deleteStatus]);

    // Getting todos 
    useUpdateEffect(() => {    
      if(newChange){
        dispatch(getTodosThunk("") as any);
        setZindex(2);
      };
    }, [newChange]);

    // Updating todos 
    useUpdateEffect(() => {
      setTodosArr([...todos]);
      setZindex(-1)
    }, [todos]);

    return (
        <Box className={styles.main}>
           <Box className={styles.loadingCont} 
                   sx={{
                    zIndex: zindex
                   }}>
                <CircularProgress />
            </Box>
           <Box className={styles.todoCont}>
                {/* Mapping todos  */}
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
            {/* Add task container  */}
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