import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    axios
      .get("https://goodogapp.onrender.com/api/data")
      .then((response) => {
        console.log(response.data);
        setdataUser(response.data);
      })
      .catch((response) => {
        console.log(`error call API`);
      });
  }, []);
  return (
    <div className="App">
      <p>My account of Users</p>
      {dataUser.map((data) => {
        return (
          <div className="wrap" key={data._id}>
            <li>{data.username}</li>
            <li>{data.email}</li>
            <li>{data.password}</li>
          </div>
        );
      })}
    </div>
  );
}

export default App;
