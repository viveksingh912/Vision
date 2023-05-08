import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import logo from '../img/logo.png'
import Comment from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Container=styled.div`
width: 100%;
`;
const NewComment=styled.div`
    display: flex;
    gap: 20px;
`
const Avatar=styled.img`
  height: 40px;
  width: 45px;
  border-radius: 50%;
  background-color: #999;
`
const Input=styled.input`
    outline: none;
    width: 80%;
    border: none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color: transparent;
    color:${({theme})=>theme.text};
    padding: 5px;
`
const Button = styled.button`
  padding: 5px 15px;
  width: 86px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  /* border-radius: none; */
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
`;
const Comments = ({videoId}) => {
  const [comments,setComments]=useState([]);
  const [flag,setFlag]=useState(true);
  const [desc,setDesc]=useState("");
  const { currentUser } = useSelector((state) => state.user);
  const ref=useRef();
  const handleComment=async(e)=>{
    e.preventDefault();
    try{
      if(currentUser){
      const res= await axios.post(`/comments`,{videoId,desc});
      setDesc(res.data);
      console.log(res.data);
      setFlag(!flag);
      ref.current.value="";
      }
      }
      catch(err){
        console.log(err);
      }
  }
  useEffect(() => {
       const fetctComments=async ()=>{
          try{
          const res= await axios.get(`/comments/${videoId}`);
          setComments(res.data);
          // console.log(res.data);
          }
          catch(err){
            console.log(err);
          }
       }
       fetctComments();
  }, [videoId,flag])
 
  return (
   <Container>
    <NewComment>
        <Avatar src={currentUser?.img}></Avatar>
        <Input placeholder="enter yout text" onChange={(e)=>{setDesc(e.target.value)}} ref={ref}></Input>
        <Button onClick={handleComment}>Comment</Button>
    </NewComment>
    {
      comments.map((comment)=>{
        // console.log(comment);
        return <Comment key={comment._id} comment={comment}/>
      })
    }
   </Container>
  )
}

export default Comments