import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {  useNavigate } from 'react-router-dom';
import {auth,provider} from "../firebase.js"
import {signInWithPopup} from "firebase/auth";
const Container=styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 120px);
    
`
const Wrapper=styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    background-color: ${({theme})=>theme.bgLight};
    border:1 px solid ${({theme})=>theme.soft};
    padding: 30px 20px ;
    min-width: 240px;
`
const Up=styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`
const Title=styled.div`
    margin-bottom: 3px;
    text-align: center;
    font-style: bold;
    font-weight:600;
`
const Subtitle=styled.div`
    text-align: center;
`
const Input=styled.input`
    outline: none;
    background-color: transparent;
    border:  1px solid ${({theme})=>theme.soft};
    padding: 8px 15px;
    color: ${({theme})=>theme.textSoft};
    /* width: 100%; */
`
const Button=styled.button`
    width: 35%;
    padding: 6px 8px;
    cursor: pointer;
    margin:  auto;
    margin-top: 4px;
    margin-bottom: 5px;
    background-color: ${({theme})=>theme.soft};
    color: ${({theme})=>theme.textSoft};
`
const More=styled.div`
    display: flex;
    /* justify-content: space-between; */
    font-size: 11px;
    width: 21.5%;
    justify-content: space-around;
    margin-top: 3px;
    color: ${({theme})=>theme.textSoft};
`
const Links=styled.div`
    display: flex;
    gap: 8px;
`
const Link=styled.a`
    cursor: pointer;
`
const SignIn = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch(); 
    const navigate=useNavigate();
    const handleSignin=async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post(`/auth/signin`,{name,password});
            dispatch(loginSuccess(res.data));
            navigate("/");
        }
        catch(err){
            dispatch(loginFailure());
            console.log(err);
        }
    }
    const handleSignUp=async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post(`/auth/signup`,{name,email,password});
            dispatch(loginSuccess(res.data));
            navigate("/");
        }
        catch(err){
            dispatch(loginFailure());
            console.log(err);
        }
    }
    const signInWithGoogle=()=>{
        dispatch(loginStart()) 
        signInWithPopup(auth,provider).then((result)=>{
            axios.post("/auth/google",{
                name:result.user.displayName,
                email:result.user.email,
                image:result.user.photoURL,
            }).then((res)=>{
                dispatch(loginSuccess(res.data))
                navigate("/");
            })
        }).catch(err=>dispatch(loginFailure()));
    }
  return (
    <Container>
        <Wrapper>
           <Up>
            <Title>Sign In</Title>
            <Subtitle>Subscribe to the Clone</Subtitle>
            <Input placeholder='username' onChange={e=>setName(e.target.value)} ></Input>
            <Input type={'password'} placeholder='password'  onChange={e=>setPassword(e.target.value)}></Input>
            <Button onClick={handleSignin}>Sign In</Button>
           </Up>
           <Up>
            <Title>Or</Title>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            <Title>Or</Title>
            <Input placeholder='username'  onChange={e=>setName(e.target.value)}></Input>
            <Input placeholder='email'  onChange={e=>setEmail(e.target.value)}></Input>
            <Input type={'password'} placeholder='password'  onChange={e=>setPassword(e.target.value)}></Input>
            <Button onClick={handleSignUp}>Sign Up</Button>
           </Up>
        </Wrapper>
        <More>
            English(USA)
            <Links>
             <Link>Privacy</Link>
             <Link>Help</Link>
             <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn