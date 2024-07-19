import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import Pagination from "../components/pagination/Pagination";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const page = 1;
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let url = `/api/v2/post`;
    // let url = `/api/v2/post?page=${currentPage}&limit=${page}`;
    // filter by catogary
    // if (selectedCategory) {
    //   url += `&category=${selectedCategory}`;
    // }
    axios
      .get(url)
      .then((response) => {
        setBlog(response.data.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // change pages
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  //change categorys
  // const handleCategory = (category) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1);
  //   setActiveCategory(category);
  // };
  return (
    <div>
      <div className="bg-black text-white py-5 md:text-2xl flex flex-col justify-center items-center align-middle ">
        <h1 className="mx-auto">Welcome to Blog posts</h1>
        <p className="text-sm md:w-1/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          itaque molestias dolore pariatur ipsam sequi, in temporibus quam
          accusamus, repellendus accusantiumit!
        </p>
      </div>
      <div>roller</div>
      <div>
        <BlogCard
          blog={blog}
          // currentPage={currentPage}
          // selectedCategory={selectedCategory}
          // page={page}
        />{" "}
      </div>

      <div>
        <Pagination
          // onPageChange={handlePageChange}
          // currentPage={currentPage}
          blog={blog}
          // page={page}
        />
      </div>
    </div>
  );
};

export default Blog;
