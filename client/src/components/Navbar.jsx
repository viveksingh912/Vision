import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import Upload from "./Upload";
import { logout } from "../redux/userSlice";
const Container = styled.div`
  height: 60px;
  background-color: ${({ theme }) => theme.bgLight};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  width: 50%;
  /* left: 50vw; */
  left: 20vw;
  border: 1px solid #ccc;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  outline: none;
  padding: 10px 15px;
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  /* border-radius: 29px; */
  color: ${({ theme }) => theme.textSoft};
  font-weight: 500;
  font-size: 15px;
`;
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
const User=styled.div`
  display: flex;
  gap:10px;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  padding-right:10px;
`
const Avatar=styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #999;
`
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const dispatch=useDispatch();
  const setData=(val)=>{
      setOpen(val);
  }
  const handleSwitch=()=>{
     navigate(`/search?q=${q}`);
    //  console.log("going to somewhere");
  }
  const hadleLogOut=()=>{
    dispatch(logout());
    localStorage.removeItem('access_token');
  }
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" onChange={(e)=>setQ(e.target.value)}></Input>
          <SearchIcon onClick={handleSwitch}></SearchIcon>
        </Search>
        {
          currentUser?(<User>
            <LogoutIcon onClick={hadleLogOut}/>
            <VideoCallIcon onClick={()=>setData(true)} />
            <Avatar src={currentUser.image}/>
            {currentUser.name}
          </User>):
          (<Link to="/signin">
            <Button>Sign In</Button>
          </Link>)
        }
      </Wrapper>
    </Container>
    {open && <Upload setData={setData}/>}
    </>
  );
};

export default Navbar;
