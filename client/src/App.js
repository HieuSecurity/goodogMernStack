import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [dataUser, setdataUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [count, setCount] = useState(0);
  const [stateButton, setStateButton] = useState("Đăng Ký");
  const [updateid, setupdateid] = useState(0);
  const Ref = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://frontend-ie8t.onrender.com/api/users?query=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(dataUser);
  useEffect(() => {
    Ref.current.focus();
    axios
      .get("http://localhost:3000/api/data")
      .then((response) => {
        console.log(`call api again`);
        setdataUser(response.data);
      })
      .catch((response) => {
        console.log(`error call API`);
      });
  }, [count]);
  console.log(username, email, password);
  const handlePost = async () => {
    if (stateButton === "Đăng Ký") {
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
    } else {
      try {
        axios
          .put(`https://frontend-ie8t.onrender.com/api/update/${updateid}`, {
            username,
            email,
            password,
          })
          .then(() => {
            Ref.current.focus();
            setUsername("");
            setemail("");
            setpassword("");
            console.log(`update`);
            setCount((pre) => {
              return pre + 1;
            });
            setStateButton("Đăng Ký");
          });
      } catch (err) {
        console.log(`error deleting`);
      }
    }
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

  const handleUpdate = (id, data) => {
    setStateButton("Cập Nhật");
    setUsername(data.username);
    setemail(data.email);
    setpassword(data.password);
    Ref.current.focus();
    console.log(id);
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
        <button onClick={handlePost}>{stateButton}</button>
      </div>

      <p>Tài khoản của người dùng của Hiếu Hacker lỏ</p>
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
              <button
                className="update"
                onClick={() => {
                  handleUpdate(data._id, data);
                  setupdateid(data._id);
                }}
              >
                Cập Nhật
              </button>
            </div>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="Nhập tên để tìm kiếm người dùng"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <p>Tìm Kiếm User : {query} </p>
      {results.map((data) => {
        return (
          <div className="wrap wrap-search" key={data._id}>
            <li>Username : {data.username}</li>
            <li>Email : {data.email}</li>
            <li>Password : {data.password}</li>
          </div>
        );
      })}
    </div>
  );
}

export default App;
