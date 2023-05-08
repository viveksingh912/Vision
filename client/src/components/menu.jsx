import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1.3;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  /* overflow: auto; */
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 600;
  gap: 3px;
  margin-bottom: 5px;
  align-items: center;
  /* height: 56px; */
  color: ${({ theme }) => theme.text};
`;
const Item = styled.div`
  display: flex;
  padding: 4px 0px;
  color: ${({ theme }) => theme.text};
  align-items: center;
  gap: 20px;
  font-size: 16px;
  /* font-weight: 400; */
  /* line-height: 25px; */
  min-height: 35px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Img = styled.img`
  height: 20px;
  border-radius: 8px;
  /* padding:0px 5px; */
`;
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  padding: 5px 15px;
  width: 86px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;
const Menu = (props) => {
  const { darkMode, setdarkMode } = props;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            {/* <Img src={logo}></Img> */}
            <SmartDisplayIcon/>
            VisionBox
          </Logo>
          <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
       {currentUser && <Link to="subscriptions" style={{ textDecoration: "none" }}>
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>}
       {currentUser && 
       <>
        <Hr></Hr>
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        </>}
       { currentUser &&<Item>
          <HistoryIcon />
          History
        </Item> }
        {!currentUser && (
          <>
            <Hr></Hr>
            <Login>
              <span>Sign in to like videos, comment, and subscribe.</span>
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>Sign In</Button>
              </Link>
            </Login>
          </>
        )}
        <Item>
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsVolleyballIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsIcon />
          Gaming
        </Item>
        <Item>
          <MovieCreationIcon />
          Movies
        </Item>
        <Item>
          <NewspaperIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr></Hr>
        <Item>
          <SettingsApplicationsIcon />
          Settings
        </Item>
        <Item>
          <ReportIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item
          onClick={() => {
            setdarkMode(!darkMode);
          }}
        >
          <LightModeIcon />
          {darkMode ? "Light mode" : "Dark mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
