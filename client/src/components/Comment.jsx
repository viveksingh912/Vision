
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import axios from 'axios'
const Container=styled.div`
    display: flex;
    gap: 20px;
    margin: 20px 0px;
`
const Info=styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const UserName=styled.span`
    font-size: 13px;
    font-style: bold;
    font-weight:700;
`
const Description=styled.span`
    font-size: 14px;
`
const Date=styled.span`
    font-size: 12px;
    font-style: normal;
    font-weight:400;
    color: ${(theme)=>theme.textSoft};
    margin-left: 5px;
`
const Avatar=styled.img`
    height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #999;
`
const Comment = ({comment}) => {
    const [channel,setChannel]=useState({});
    useEffect(() => {
      const fetchComment=async()=>{
        const res=await axios.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } 
      fetchComment();
    }, [comment.userId])
    
  return (
    <Container>
        <Avatar src={channel?.img}></Avatar>
        <Info>
         <UserName>{channel?.name} <Date>1 Day ago</Date> </UserName>
         <Description>{comment?.desc} </Description>
        </Info>
    </Container>
  )
}

export default Comment