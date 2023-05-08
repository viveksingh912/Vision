// import { Container } from '@mui/material'
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import styled from "styled-components";
import app from '../firebase'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: #282626; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1 px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Desc = styled.textarea`
  border: 1 px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  padding: 5px 15px;
  width: 86px;
  margin: 5px auto;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  /* border-radius: none; */
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setData }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate=useNavigate();
   
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
  const uploadFile = (file,urlType) => {
    const storage = getStorage(app);
    console.log("ab");
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        urlType==='imgUrl'?setImgPerc(Math.round(progress)):setVideoPerc(Math.round(progress))
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInputs((prev) => {
                return { ...prev, [urlType]:downloadURL};
              });
        });
      }
    );
  };
  useEffect(() => {
     video &&  uploadFile(video,"videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img,"imgUrl");
  }, [img]);

  const handleUpload=async(e)=>{
    e.preventDefault();
    const res= await axios.post('/videos',{...inputs,tags});
    setData(false);
    res.status===200 && navigate(`video/${res.data._id}`)
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setData(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video</Label>
       {videoPerc>0?("Uploading " + videoPerc):( <Input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        ></Input>)}
        <Input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        ></Input>
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Seprate tags with commas"
          onChange={handleTags}
        ></Input>
        <Label>Image:</Label>
       {imgPerc>0?("uploading "+imgPerc):( <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        ></Input>)}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
