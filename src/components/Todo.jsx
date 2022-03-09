import { db } from "../config/firebase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Todo = () => {

    const [inputValue, setinputValue] = useState("")
    const [todo,setTodo] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(async ()=>{
        const dbref = collection(db, "ToDoTable")
        const getData = await getDocs(dbref)
        let makingArryOfObject = []
        getData.forEach((doc)=>{
            // extracting key(from doc.id) and value(from getData().Todo)
            makingArryOfObject.push({key:doc.id,todo:doc.data().todo})
        })
        // updating todo
        setTodo(makingArryOfObject)
        
    },[refresh])
    console.log("This is todo data",todo)

        // adding data
    const addTodo = async() => {
            // collection takes 2 argument db(database name) and "ToDoTable"(data to be stored) 
            const dbref = collection(db, "ToDoTable")
            try{
             //addDoc take 2 argument dbref and object
             const addData = await addDoc(dbref, {
                todo: inputValue,
            })   
            console.log(addData)
            console.log("working"); 
            setRefresh(!refresh);
            } 
            catch(error){
                console.log(error)
            }
            setinputValue("")
        }

        // getting data on console
    const getData = async () => {
        const dbref = collection(db, "ToDoTable")
        const getData = await getDocs(dbref)
        getData.forEach((doc) => {
            console.log(doc.id, doc.data())
        })
    }
    // edit data
    const updateData = async (key)=>{
        // doc, updateDoc import them for updating
        console.log("update working")
        console.log(key)
        const dref = doc(db,"ToDoTable",key)
        const editValue = prompt("Edit")
        const obj = {
            todo:editValue,
        }
        try{
            const updatresponse = await updateDoc(dref,obj)
            console.log("check update" ,updatresponse )
            setRefresh(!refresh)
        }
        catch(error){
            console.log(error)
        }
    }
    // delete data
    const deleteData = async (key)=>{
        console.log("del working")
        console.log(key)
        // it takes 3 argument 
        const dbref = doc(db,"ToDoTable",key)
        const deleteTodo = await deleteDoc(dbref)
        setRefresh(!refresh)
    }
    // delete all data
        const deleteAll = async ()=>{
            const dbref = collection(db, "ToDoTable")
            const getData = await getDocs(dbref)

            let makingArryOfObject = []
            getData.forEach((doc)=>{
            // extracting key(from doc.id) and value(from getData().Todo)
            makingArryOfObject.push({key:doc.id,todo:doc.data().todo})
        })
        console.log("working", makingArryOfObject)
        console.log(makingArryOfObject.key)
        //  getting keys through loop and delete one by one    
        makingArryOfObject.forEach(async(keysOfDocuments)=>{
        const dbref = doc(db,"ToDoTable",keysOfDocuments.key)
        await deleteDoc(dbref)
        setRefresh(!refresh) 
        })   
            // console.log(getData)
    }
    return ( 
    <>
        <input placeholder = "Enter Todo"
        value={inputValue}
        onChange = {
        (e) => setinputValue(e.target.value)
        }
        /> 
        <button onClick = {addTodo} >add</button>
        <button onClick = {getData} >getData on console</button> 
        <button onClick={deleteAll}>Delete All</button>
        {/* ui part */}
        <ul>
            {
                todo.map((value,index)=>{
                    return value.todo !== ""? (
                        <div key={index}>
                            <li>{value.todo}</li>
                            <li>{value.key}</li>
                            <button onClick={()=>{deleteData(value.key)}}>delete</button>
                            <button onClick={()=>updateData(value.key)}>edit</button>
                            
                        </div>
                    ):null
                })
            }
        </ul>
        {/* end of ui part */}
    </>
    )
};

export default Todo;