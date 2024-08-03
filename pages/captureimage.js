import React, { useRef, useState } from 'react';
import Camera from 'react-camera-pro';
import { storage } from 'lib/data/firebase';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const CaptureImage = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleCapture = () => {
    const imageSrc = camera.current.takePhoto();
    setImage(imageSrc);
  };

  const handleUpload = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], `image_${Date.now()}.jpg`, { type: 'image/jpeg' });

      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Progress function (optional)
        },
        error => {
          console.log(error);
        },
        () => {
          // Complete function
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
            });
        }
      );
    }
  };

  return (
    <Container>
      <h2>Upload Image</h2>
      <Camera ref={camera} aspectRatio={16 / 9} />
      <Button onClick={handleCapture}>Capture</Button>
      {image && <ImagePreview src={image} alt="Captured" />}
      <Button onClick={handleUpload}>Upload</Button>
      {url && <ImagePreview src={url} alt="Uploaded Image" />}
    </Container>
  );
};

export default CaptureImage;
