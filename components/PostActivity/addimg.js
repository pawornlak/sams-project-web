import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import gql from "graphql-tag";
import { Button, Modal } from "react-bootstrap";
import { ApolloProvider, Mutation } from "react-apollo";

import CreateAct from "../../Image/create.png";
import ImageLogo from "../../Image/img.png";

const ADDINGFILE = gql`
  mutation ADDINGFILE($file: Upload!) {
    uploadImage(input: { file: $file }) {
      filename
    }
  }
`;

const addimg = () => {
  // const [addFile, setAddFile] = useState();
  // console.log("addFile", addFile);
  const [posterImg, setposterImg] = useState()
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [mutate, { loading, error }] = useMutation(ADDINGFILE);

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      // userInfo.photoHeader = e.target.files[0].name
      reader.readAsDataURL(e.target.files[0]);
    }

  };

  const onChange = ({
    target: {
      files: file
    }
  }) => {
    setposterImg(file);
    console.log(file);
    // console.log(file[0].name);
    if (file[0]) {
      console.log("picture: ", file[0]);
      setPicture(file[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      // userInfo.photoHeader = e.target.files[0].name
      reader.readAsDataURL(file[0]);
    }
  }

  // setposterImg(file);
  console.log('posterImg ' + posterImg);


  // if (posterImg[0]) {
  //   console.log("picture: ", posterImg[0]);
  //   setPicture(posterImg[0]);
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     setImgData(reader.result);
  //   });
  //   // userInfo.photoHeader = e.target.files[0].name
  //   reader.readAsDataURL(posterImg[0]);
  // }

  // && mutate({ variables: { file } }, console.log("file info", file),);

  const btnclick = ({
    target: {
      validity,
      files: file
    }
  }) => {
    file = posterImg,
      console.log(file),
      console.log(posterImg),
      validity.valid &&
      mutate({ variables: { file } })
  }



  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  // const onChange = (
  //   {
  //     target: {
  //       validity,
  //       files: [newFile],
  //     },
  //   },
  //   any
  // ) =>
  //   validity.valid &&
  //   mutate(setAddFile(newFile.File), console.log("file info", newFile), {
  //     variables: { addFile },
  //   });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Something went wrong, please try again.</p>;

  return (
    <div>
      {/* {posterImg && (
        <img src={posterImg}></img>
      )} */}
      {/* <img src={picture}></img> */}
      <img src={imgData}></img>
      <input type="file" required onChange={onChange} />
      <button onClick={btnclick}>Click</button>
      
      {/* <img src="https://sams-storage.s3.ap-southeast-1.amazonaws.com/668d8b19-77c2-40d1-b5b7-d478c15e93e5121162532_635703063980163_4805760419616645597_n.jpg"></img> */}
      {/* <img src="https://sams-storage.s3-ap-southeast-1.amazonaws.com/cee60ae7-c92f-411c-ac10-0a53c91482b7star1.png"></img> */}
    </div>
  );
};

export default addimg;
