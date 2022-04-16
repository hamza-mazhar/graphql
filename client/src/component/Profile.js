import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqlQuery/gqlQuery";
import { useNavigate } from "react-router-dom";
import { DELETE_QUOTE } from "../gqlQuery/mutation";
import ModalQuote from "./UpdateQuote";
export default function Profile() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: localStorage.getItem("token"), // this header will reach the server
      },
    },
  });
  const [deleteQuote] = useMutation(DELETE_QUOTE, {
    refetchQueries: ["getMyProfile"],
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: localStorage.getItem("token"), // this header will reach the server
      },
    },
  });

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>unauthorized</h1>;
  }
  if (loading) return <h2>Profile is loading</h2>;
  if (error) {
    console.log(error);
  }

  const handleDelete = (id) => {
    deleteQuote({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
      {!!data ? (
        <div className="container my-container">
          <div className="center-align">
            <img
              className="circle"
              style={{ border: "2px solid", marginTop: "10px" }}
              src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
              alt="pic"
            />
            <h5>
              {data.user.firstName} {data.user.lastName}
            </h5>
            <h6>Email - {data.user.email}</h6>
          </div>
          <h3>Your quotes</h3>
          {data.user.quotes.map((quo, idx) => {
            return (
              <ModalQuote data={quo} key={idx} handleDelete={handleDelete} />
            );
          })}
        </div>
      ) : (
        <div>Data is loading...</div>
      )}
    </>
  );
}
