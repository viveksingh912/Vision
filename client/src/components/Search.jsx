import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from './Card';
const Container=styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
const Search = () => {
    const[videos,setVideo]=useState([]);
    const query=useLocation().search;
    useEffect(() => {
     const fetchVideos=async()=>{
        try{
        const res=await axios.get(`/videos/search${query}`)
        setVideo(res.data);
        console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
     }
     fetchVideos();
    }, [query])
    
  return (
    <Container>
        {videos.map((video)=>{
            return <Card key={video._id} video={video}/>
        })}
    </Container>
  )
}

export default Search