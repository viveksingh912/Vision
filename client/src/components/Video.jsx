import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import logo from "../img/logo.png";
import Comments from "./Comments";
// import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recomendation from "./Recomendation";
const Container = styled.div`
  display: flex;
  gap: 20px;
  /* justify-content: space-between; */
  width: 100%;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  /* font-weight: 500; */
  font-style: bold;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.div``;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;
const Button = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  /* border: 0.2px solid ${(theme) => theme.soft}; */
  margin: 15px 0px;
  color: ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Subscribe = styled.button`
  background-color: red;
  color: white;
  font-weight: 500;
  height: max-content;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.div``;

const ChannelCounter = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const ChannelDescription = styled.div`
  font-size: 14px;
`;
const ChannelIMage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #999;
`;
const VideoFrame=styled.video`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
`

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        const addedView = await axios.get(`/videos/view/${path}`);
        console.log(videoRes.data);
        dispatch(fetchSuccess({...videoRes.data,views:videoRes.data.views+1}));
        console.log(currentVideo);
        setChannel(channelRes.data);
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };
  const handleSub=async()=>{
    if(currentUser &&  currentUser.subscribedUsers.includes(channel._id)){
       await axios.put(`/users/unsub/${channel._id}`);
       setChannel({...channel,subscribers:channel.subscribers-1});
       dispatch(subscription(channel._id));
    }
    else if(currentUser){
      await axios.put(`/users/sub/${channel._id}`);
      setChannel({...channel,subscribers:channel.subscribers+1})
      dispatch(subscription(channel._id));
    }
    
  }

  return (
    <Container>
        <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title  }</Title>
       <Details>
          <Info> {currentVideo?.views} views 4 hours ago</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpOutlinedIcon />
              ) : (
                <ThumbUpAltIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownOutlinedIcon />
              ) : (
                <ThumbDownIcon />
              )}{" "}
              {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ShareIcon /> Share
            </Button>
            <Button>
              <SaveIcon /> Save
            </Button>
          </Buttons>
              </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelIMage src={channel.image}></ChannelIMage>
            <ChannelDetails>
              <ChannelName>{channel.name} </ChannelName>
              <ChannelCounter> {channel.subscribers} subscibers</ChannelCounter>
              <ChannelDescription>{currentVideo?.desc}</ChannelDescription>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content> 
      <Recomendation tags={currentVideo?.tags}></Recomendation>
    </Container>
  );
};
export default Video;
