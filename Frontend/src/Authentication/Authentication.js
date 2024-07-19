import axios from "axios";
import { useEffect, useState } from "react";

 function Authentication  (urlPath)  {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  try {
    useEffect(() => {
      setLoading(true);
      axios
        .get(urlPath)
        .then((response) => {
          if (response) {
            setStatus(true);
            setUser(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err) {
            setErr(true);
            setErrMessage(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  } catch (error) {
    console.log(error);
  }

  return [status, user, loading, err, errMessage];
};


export default Authentication