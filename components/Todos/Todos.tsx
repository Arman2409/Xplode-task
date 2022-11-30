import {Button, Box, Typography, TextField, CircularProgress} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getTodosThunk, deleteTodoThunk, addTodoThunk, updateTodoThunk } from "../../store/slices/todos";
import { useUpdateEffect } from "usehooks-ts";

import styles from "../../styles/Todos.module.scss";

interface ToDo {
  name: string,
  id: number
};

export default function Todos({initialTodos}:any){
   // States 
    const [todosArr, setTodosArr] = useState<ToDo[]>(initialTodos);
    const [name, setName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [infoColor, setInfoColor] = useState<string>("green");
    const [zindex, setZindex] = useState<number>(-1);
    const [editData, setEditData] = useState<string>("");
    const [editing, setEditing] = useState<any>(false);

    // Constant hooks
    const dispatch = useDispatch();
    const openedInput = useRef<any>(null);

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

    function editTask(e:Event|any, id:number) {      
      if(editing) {
        setEditing(false); 
        openedInput.current.elem.style.display = "none";
        if(id == openedInput.current.id) { 
          if(editData) {
            dispatch(updateTodoThunk({id: openedInput.current.id, name: editData}) as any);
          };
        };      
        openedInput.current = null;
        setEditData("");
        return;
      } else {
        setEditing({elem:e.target , id: id});
      }
    };

    useEffect(() => {
       if (addStatus) {
          setInfo("Added");
          setInfoColor("green")
       };
    }, [addStatus]);

    useEffect(() => {
        if (deleteStatus) {
           setInfo("Deleted");
           setInfoColor("green")
        };
    }, [deleteStatus]);

    // Getting todos 
    useUpdateEffect(() => {    
      if (newChange) {
        dispatch(getTodosThunk("") as any);
        setZindex(2);
      };
    }, [newChange]);

    // Updating todos 
    useUpdateEffect(() => {
      setTodosArr([...todos]);
      setZindex(-1);
    }, [todos]);

    useUpdateEffect(() => {
      if (editing) {
        const element:any = editing.elem;
        const parent:HTMLElement = element.parentNode;
        const childInput:HTMLElement = parent.querySelector(".edit-input") as HTMLElement;
        openedInput.current = {elem: childInput, id: editing.id};
        childInput.style.display = "block"
      };
    }, [editing])

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
                      <Box sx={{
                        width: "200px"
                      }}>
                        <Typography 
                          className={styles.todoTitle}>
                          {elem.name}
                        </Typography>
                      </Box>
                      <Box 
                       className={styles.editCont}
                       >
                        <TextField 
                        className={`${styles.editInput} edit-input`}
                        type="text"
                        value={editData}
                        onChange={(e) => setEditData(e.target.value)}
                        sx={{
                          display: "none",
                          }}
                          InputProps={{
                            sx: {
                              height: "30px",
                            }
                          }}
                        />
                        <Button 
                           className={styles.editButton}
                           onClick={(e) => editTask(e, elem.id)}
                           color="success"
                           variant="contained">
                            Edit
                        </Button>
                      </Box>
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