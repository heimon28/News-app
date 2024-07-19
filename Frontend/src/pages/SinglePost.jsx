import React from "react";
import { useLoaderData } from "react-router-dom";

const SinglePost = () => {
  const data = useLoaderData();

  console.log("this is", data);
  const { title, image, author, published_date, content} = data;
 
  return <div className="flex"> 

    <div className="content w-10/12 px-4 mx-5 " >
        <h3 className="font-bold text-3xl m-2">{title}</h3>
        <div className="publish_date m-2">{published_date}</div>
      <div className="img m-2 bg-gray-500 w-3/5">
        <img className="w-auto" src={image} alt={title} />
      </div>
        <div className="author m-2 text-orange-300">{author}</div>
        <p className="m-2">{content}</p>
    </div>

    <div className="left_banner">k</div>


  </div>;
};

export default SinglePost;
