// import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import axios from 'axios'
const Container=styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Home = ({type}) => {
  const [videos,setVideos]=useState([]);
  useEffect(() => {
    const fetchvidoes= async ()=>{
      try{
      const req=await axios.get(`/videos/${type}`);
      setVideos(req.data)
      }
      catch(err){
        console.log(err);
      }
    }
    fetchvidoes();
  }, [type])
  
  return (
    <Container>
    {
      videos.map((video)=>(
        <Card key={video._id} video={video}/>
      ))
    }
    </Container>
  )
}

export default Home