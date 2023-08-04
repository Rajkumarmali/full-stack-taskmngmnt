import React ,{ useContext }from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState} = useContext(AuthContext)

   const navigate = useNavigate()
   useEffect(() => { 
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get("http://localhost:3001/posts")
        .then((response) => {
          setListOfPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);
  
 
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };
  
  const handleePostClick = (postId) => {
    navigate(`/profile/${postId}`);
  };
  
const likeAPost = (postId)=>{
   axios.post("http://localhost:3001/likes",
   { PostId: postId }, 
   { headers :{accessToken :localStorage.getItem("accessToken")}}
   ).then((response)=>{
        setListOfPosts(listOfPosts.map((post) => {
          if(post.id===postId){
               if(response.data.liked){
                return {...post,Likes:[...post.Likes,0 ] }
                } else{
                  const likesArray = post.Likes;
                  likesArray.pop();
                  return {...post,Likes: likesArray };
                }
            } 
          else{
            return post
          }
        })
      )
   });
} ;
  
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
  <div key={key} className="post">
    <div className="title"> {value.title} </div>

    <div className="body" onClick={() => handlePostClick(value.id)}> 
      {value.postText}
    </div>

    <div className="footer">
      <div className="username" onClick={() => handleePostClick(value.id)}>
        {value.username} 
      </div>
      <div className="buttons">
        <ThumbUpAltIcon onClick={() => likeAPost(value.id)} />
        
        {value.Likes && <label>{value.Likes.length}</label>}
      </div>
    </div>
  </div>
);

      })}
    </div>
  );
}

export default Home;