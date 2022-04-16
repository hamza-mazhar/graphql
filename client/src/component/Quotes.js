import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlQuery/mutation";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: localStorage.getItem("token"), // this header will reach the server
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };
  if (loading) return <h1>Loading</h1>;

  if (error) {
    console.log(error.message);
  }

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="green card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
