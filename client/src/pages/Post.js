import React, { useEffect, useState,useContext } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState} = useContext(AuthContext)
  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

   
  }, []);


   const deletPost=(id)=>{
          axios.delete(`http://localhost:3001/posts/${id}`,{headers:{
            accessToken:localStorage.getItem('accessToken'),
          },
        }).then(()=>{
            navigate('/');
          })
   }
  
   const editPost =(option)=>{
               if(option === "title"){
                    let newTitle = prompt("Enter new Title");
                    axios.put("http://localhost:3001/posts/title",
                     {
                      newTitle:newTitle ,
                      id:id
                    },
                    {
                      headers:{
                        accessToken:localStorage.getItem('accessToken'),
                      }
                    }
                    );
                    setPostObject({...postObject,title:newTitle})
               } 

               else {
                    let newPostText = prompt("Enter new text")
                    axios.put("http://localhost:3001/posts/postText",
                    {
                      newText:newPostText ,
                      id:id
                    },
                    {
                      headers:{
                        accessToken:localStorage.getItem('accessToken'),
                      }
                    }
                    );
                    setPostObject({...postObject,postText:newPostText})
               }
   }

  
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">

          <div className="title " 
          onClick={
            ()=>{
              if(authState.username===postObject.username){
              editPost("title")}}
            }  > 
          {postObject.title} 
          
          </div>

          <div className="body" onClick={
            ()=>{
              if(authState.username===postObject.username){
                editPost("postText")}}
            } >{postObject.postText}</div>

          <div className="footer">{postObject.username} { authState.username===postObject.username&&
          <button  
          onClick={()=>{deletPost(postObject._id)
          }}
          >Delete Post</button>}
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Post;