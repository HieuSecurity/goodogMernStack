import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [dataUser, setdataUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [count, setCount] = useState(0);

  const Ref = useRef(null);
  useEffect(() => {
    Ref.current.focus();
    axios
      .get("https://frontend-ie8t.onrender.com/api/data")
      .then((response) => {
        console.log(`call api again`);
        setdataUser(response.data);
      })
      .catch((response) => {
        console.log(`error call API`);
      });
  }, [count]);
  const handlePost = async () => {
    axios
      .post("https://frontend-ie8t.onrender.com/post/data", {
        username,
        email,
        password,
      })
      .then(() => {
        console.log(`posst`);
        setCount((pre) => {
          return pre + 1;
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
    Ref.current.focus();
    setUsername("");
    setemail("");
    setpassword("");
  };
  const handleDelete = async (id) => {
    try {
      axios
        .delete(`https://frontend-ie8t.onrender.com/api/delete/${id}`)
        .then(() => {
          console.log(`deleted ${id}`);
          setCount((pre) => {
            return pre + 1;
          });
        });
    } catch (err) {
      console.log(`error deleting`);
    }
  };

  return (
    <div className="App">
      <div className="wrap-input">
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Nhập UserName"
          value={username}
          ref={Ref}
        />
        <input
          onChange={(e) => setemail(e.target.value)}
          type="text"
          placeholder="Nhập Email"
          value={email}
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="text"
          value={password}
          placeholder="Nhập Password"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handlePost();
            }
          }}
        />
        <button onClick={handlePost}>Đăng Ký</button>
      </div>

      <p>My account of Users</p>
      {dataUser.map((data) => {
        return (
          <div className="wrap" key={data._id}>
            <li>Username : {data.username}</li>
            <li>Email : {data.email}</li>
            <li>Password : {data.password}</li>
            <div>
              <button
                className="delete"
                onClick={() => {
                  handleDelete(data._id);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
