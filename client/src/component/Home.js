import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqlQuery/gqlQuery";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data.quotes.length === 0) {
    return <h2>No Quotes available</h2>;
  }
  return (
    <div className="container">
      {data.quotes.map((obj, idx) => (
        <blockquote key={idx}>
          <h6>{obj.name}</h6>
          <Link to={`/profile/${obj.by._id}`}>
            {" "}
            <p className="right-align">{obj.by.firstName}</p>
          </Link>
        </blockquote>
      ))}
    </div>
  );
}
