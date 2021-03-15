import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import gql from "graphql-tag";
import { Button, Modal } from "react-bootstrap";
import { ApolloProvider, Mutation } from "react-apollo";

import CreateAct from "../../Image/create.png";
import ImageLogo from "../../Image/img.png";

const ADDINGFILE = gql`
  mutation ADDINGFILE($addFile: Upload!) {
    uploadImage(input: { file: $addFile }) {
      filename
    }
  }
`;

const addimg = () => {
  const [addFile, setAddFile] = useState();
  console.log("addFile", addFile);
  const [mutate, { loading, error }] = useMutation(ADDINGFILE);
  const onChange = (
    {
      target: {
        validity,
        files: [newFile],
      },
    },
    any
  ) =>
    validity.valid &&
    mutate(setAddFile(newFile.File), console.log("file info", newFile), {
      variables: { addFile },
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Something went wrong, please try again.</p>;

  return (
    <div>
      <input type="file" accept="image/*" required onChange={onChange} />
      {/* <img src="https://sams-storage.s3.ap-southeast-1.amazonaws.com/668d8b19-77c2-40d1-b5b7-d478c15e93e5121162532_635703063980163_4805760419616645597_n.jpg"></img> */}
    </div>
  );
};

export default addimg;
