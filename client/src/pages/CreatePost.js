import React ,{useContext, useEffect}from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";
import {  useNavigate } from "react-router";

function CreatePost(props) {
    const { authState} = useContext(AuthContext);
    const navigate = useNavigate() 
    const initialValues={
          title:"",
          postText:"",
         
    }

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            navigate("/login");
        }
    },[])

    const onSumbit=(data)=>{

        axios.post("http://localhost:3001/posts",data,{headers :{accessToken: localStorage.getItem("accessToken")},}).then((Response)=>{
            console.log("It Worked")
            navigate("/");
        })
    }

    
    const validationSchema = Yup.object().shape({
           title:Yup.string().required("you must input title"),
           postText:Yup.string(),
           
    });
    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSumbit} validationSchema={validationSchema} >
                 <Form className='formContainer'>
                 <label>Title: </label>
                 <ErrorMessage name="title" component="span" />
                    <Field 
                       autocomplet="off"
                        id="inputCreatPost"
                        name="title"
                        placeholder = "Ex. Title "
                    />
                    <label>Post</label>
                    <ErrorMessage name="Post" component="span" />
                    <Field 
                       autocomplet="off"
                        id="inputCreatePosr"
                        name="postText"
                        placeholder = "Ex. post "
                    />
                    
                   
                    <button type='submit'>Submit</button>
                 </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;