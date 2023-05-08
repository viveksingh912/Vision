import {useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/menu";
import Navbar from "./components/Navbar";
import { darktheme, lighttheme } from "./utility/Theme";
import {BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import Video from "./components/Video";
import SignIn from "./components/SignIn";
import './Scrollbar.css'
import Search from "./components/Search";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: flex;
  // color: blue;
  // background:grey;
`;
const Wrapper = styled.div`
  display: flex;
  padding: 22px 90px;
`;
const Main=styled.div`
 background-color:${({theme})=>theme.bg};
 /* display:flex; */
 color: ${({theme})=>theme.text};
 flex:7;
 /* height:10vh; */
`;

function App() {
  const [darkMode,setdarkMode]=useState(true);
  
  return (
  <ThemeProvider theme={darkMode?darktheme:lighttheme}>
   <BrowserRouter>
  <Container>
   <Menu darkMode={darkMode} setdarkMode={setdarkMode} ></Menu>
    <Main>
      <Navbar></Navbar>
      <Wrapper>
      <Routes>
      <Route path="/">
       <Route index element={<Home type="random" />}/>
       <Route path="trends" element={<Home type="trend"/>}/>
       <Route path="subscriptions" element={<Home type="sub"/>}/>
       <Route path="search" element={<Search/>}/>
       <Route path="signin" element={<SignIn/>}></Route>
       <Route path="video">
        <Route path=":id" element={<Video/>}/>
       </Route>
      </Route>
      </Routes>
      </Wrapper>
    </Main>
  </Container>
  </BrowserRouter>
  </ThemeProvider>
 )
}

export default App;
