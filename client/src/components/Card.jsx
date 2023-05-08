import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {format} from "timeago.js"
import hm from '../img/hm.jpg';
const Container=styled.div`
    width: ${(props)=>props.type!=='sm' && '360px'};
    margin-bottom: ${(props)=>props.type==='sm' ?'10px':'40px'};
    display: ${(props)=>props.type==='sm' && 'flex'};
    gap: 10px;
`
const Image=styled.img`
    width:${(props)=>props.type!=='sm'?'100%':'10vw'};
    height: ${(props)=>props.type==='sm'?'120px':'202px'} ;
    background-color: #999;
    margin-bottom: ${(props)=>props.type!=='sm' && '40px'};
    flex: 1;
`
const Details=styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${(props)=>props.type!=='sm' && '15px'};
  align-items: center;
  flex: 1;
`
const ChannelIMage=styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type==='sm'? 'none':'block'};
`
const Texts=styled.div`
  
`
const Title=styled.div`
  font-size: 16px;
  text-decoration: none;
  font-weight: 500;
  color: ${({theme})=>theme.text};
`
const Channelname=styled.div`
  font-size: 14px;
  color: ${({theme})=>theme.textSoft};
  margin: 9px 0px;
`
const Views=styled.div`
  color: ${({theme})=>theme.textSoft};
  display: flex;
  font-size: ${(props)=>props.type==='sm' && '5px'};
  font-size: 12px;
  gap: 5px;
`

const Card = (props) => {
  const [channel,setChannel]=useState([]);
  const {type,video}=props;
  useEffect(() => {
    const fetchChannel= async ()=>{
      try{
      const req=await axios.get(`/users/find/${video.userId}`);
      setChannel(req.data);
      console.log(req.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchChannel();
  }, [video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:'none'}} >
    <Container type={type}>
      <Image type={type} src={video.imgUrl}/>
      <Details type={type}>
      <ChannelIMage type={type} src={channel.image?channel.image:hm }/>
      <Texts>
        <Title>{video.title}</Title>
        <Channelname  >{channel.name}</Channelname>
        <Views>{video.views} views <li ></li>{format(video.createdAt)}</Views>
      </Texts>
      </Details>
      </Container>
     </Link>
  )
}

export default Card