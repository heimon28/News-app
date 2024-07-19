import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";


const MyEditor = () => {
    const [uploading, setUploading] = useState(false)

  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setContent(content);
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);

 
console.log('its author', author);

  // date
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const today = new Date();
  console.log(formatDate(today)); // Output will be something like "13/07/2024"
  //date

  const date = formatDate(today)

  const submitData = async (e) => {
    e.preventDefault();
    setUploading(true)
    setSubmit(true);
    await axios
      .post("/api/v2/post", formData)
      .then((res) => {
        if (res) {
          setSubmit(false);
          setUploading(false)
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
        setUploading(false)
      })
      .finally(() => setSubmit(false));
  };

  return (
    <>
    {uploading && <h1>uploading...</h1>}
      <form onSubmit={submitData}>
        <div className="container flex flex-col items-center gap-2 p-5 w-full bg-slate-800">
          <div className="w-1/2 mt-2">
            <input
              className="w-full rounded"
              type="text"
              placeholder="Title"
              onFocus={() => setPreview(false)}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className=" rounded bg-white  w-1/2">
            <Editor
              apiKey="liegnt35mhu8htmftzkeaxr97m9fx33q2zi0fqfphscfwrwf"
              initialValue="Content"
              init={{
                branding: false,
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />

            <div className="flex my-4 justify-evenly">
              <input
                type="file"
                placeholder="image"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <div
                onClick={() => setPreview(true)}
                className="bg-blue-500 cursor-pointer text-white rounded-lg p-1"
              > 
                Preview
              </div>
              <button type="submit">submit</button>
            </div>
          </div>
        </div>

        {preview && (
          <div className="w-full">
            <div className="flex">
              <div className="content w-10/12 px-4 mx-5 ">
                <h3 className="font-bold text-3xl m-2">{title}</h3>
                <div className="publish_date m-2">{formatDate(today)}</div>
                <div className="img m-2">
                  <img className="w-auto" src={image} alt={title} />
                </div>
                <div className="author m-2 text-orange-300">author</div>
                <p className="m-2">{content}</p>
              </div>

              <div className="left_banner">k</div>
            </div>
            ;
          </div>
        )}
      </form>
    </>
  );
};

export default MyEditor;
