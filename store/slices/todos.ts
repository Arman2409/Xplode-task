import { createSlice, createAsyncThunk, Action, AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosThunk:AsyncThunk<any, any, any> = createAsyncThunk(
   "todos/getTodos",
   async (_?) => {
       const get = await axios.get("/api/todos");
       if((get.data.length || get.data.length == 0)) {
         console.log(get.data);
         
          return get.data;
       } else {
         console.error("Get failed");
         return []
       };
   }
);

export const addTodoThunk:AsyncThunk<any, any, any> = createAsyncThunk(
    "todos/addTodo",
    async (name:string):Promise<Boolean>  => {
        const resp = await axios.post("/api/todos", {name})
      if (resp.data.success) {
         return true;
      };
      return false;
    }
 );

 export const deleteTodoThunk:AsyncThunk<any, any, any> = createAsyncThunk(
    "todos/deleteTodo",
    async (id:string):Promise<any> => {
       const del = await  axios.delete(`/api/todos/${id}`);
       if(del.data.success) return true;
       else return false;
    }
 );

 export const updateTodoThunk:AsyncThunk<any, any, any> = createAsyncThunk(
   "todos/updateTodo",
   async (options:any):Promise<any> => {
      const update = await  axios.put(`/api/todos`, {
         id: options.id,
         name: options.name,
      });
      if(update.data.success) return true;
      else return false;
   }
);

 type InitialState = {
   todos: any[];
   deleteStatus: any,
   addStatus: any,
   gotTodos: Boolean,
   updateStatus: any,
   changedTodos: Boolean,
 };

 const initialState: InitialState = {
   todos: [],
   gotTodos: false,
   deleteStatus: null,
   addStatus: null,
   updateStatus: null,
   changedTodos: false
 };

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
       
    },
    extraReducers:{
      [getTodosThunk.fulfilled as any]:(state:any , action:any):any => {
         state.todos = [...action.payload];
      },
      [addTodoThunk.pending as any]:(state:any , action: any):any => {
        state.changedTodos = false;
        state.addStatus = false;
     },
      [addTodoThunk.fulfilled as any]:(state:any , action: any):any => {
        state.addStatus = action!.payload;
        state.changedTodos = true;
     },
     [deleteTodoThunk.pending as any]:(state:any , action:any):any => {
       state.changedTodos = false;
       state.deleteStatus = false;
     },
     [deleteTodoThunk.fulfilled as any]:(state:any , action:any):any => {
        state.deleteStatus = action.payload;
        state.changedTodos = true;
     },
     [updateTodoThunk.pending as any]:(state:any , action:any):any => {
      state.changedTodos = false;
      state.updateStatus = false;
    },
    [updateTodoThunk.fulfilled as any]:(state:any , action:any):any => {
       state.updateStatus = action.payload;
       state.changedTodos = true;
    },
    },
});

export default todosSlice.reducer;