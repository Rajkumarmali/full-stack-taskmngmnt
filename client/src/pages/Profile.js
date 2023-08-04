import React, { useEffect, useState,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";
function Profile(props) {

    let { id } = useParams();
    const navigate = useNavigate();
    const [username , setUsername] =useState("");
    const [listOfPosts,setListOfPosts] = useState([]);
   const { authState} = useContext(AuthContext)
   
     useEffect(()=>{
          axios.get(`http://localhost:3001/posts/basicinfo/${id}`)
          .then((response)=>[
               setUsername(response.data.username)
            ])
        axios.get(`http://localhost:3001/posts/listOfitem/${id}`)
        .then((response)=>{
             setListOfPosts(response.data)
        })

     },[]);
     const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
      };
        
     return (
        <div className="profilePageContainer">
          <div className="basicInfo">
           {authState.username ===username&&(<button onClick={()=>navigate("/changePassword")}>Change My Password</button>)}
            <h1> Username: {username}</h1>
           
           
          </div>
          <div className="listOfPosts">
          
          
         
         
           
          </div>
        </div>
      );
    }

export default Profile;