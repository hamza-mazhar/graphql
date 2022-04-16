/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_QUOTE } from "../gqlQuery/mutation";

const ModalQuote = ({ data, handleDelete }) => {
  const [quote, setQuote] = useState(data.name);
  const [isUpdate, setIsupdate] = useState(false);

  const [updateQuote] = useMutation(UPDATE_QUOTE, {
    refetchQueries: ["getMyProfile"],
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: localStorage.getItem("token"), // this header will reach the server
      },
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    updateQuote({
      variables: {
        quoteupdate: {
          id: data._id,
          name: quote,
        },
      },
    });
    cancelUpdate();
  };

  const handleUpdateEnable = () => {
    setIsupdate(true);
  };

  const cancelUpdate = () => {
    setIsupdate(false);
  };

  return (
    <div>
      {!isUpdate ? (
        <blockquote key={data._id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h6>{data.name}</h6>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <button
                className="btn red"
                onClick={() => handleDelete(data._id)}
              >
                Delete
              </button>
              <br />
              <button className="btn pink" onClick={() => handleUpdateEnable()}>
                Edit
              </button>
            </div>
          </div>
        </blockquote>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="write your quote here"
          />
          <button className="btn blue" href="#">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default ModalQuote;
