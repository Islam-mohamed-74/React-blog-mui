import { Route, Routes, useNavigate } from "react-router";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
import Error from "./pages/Error";
import { toast, ToastContainer } from "react-toastify";
import PostsForm from "./pages/PostsForm";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ContactSection from "./component/ContactSection";
// const API_URL =
//   import.meta.env.MODE === "production"
//     ? "https://your-json-server.railway.app"
//     : "http://localhost:3000";
function App() {
  const [user, setUser] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUser = async () => {
      try {
        const decoded = jwtDecode(token);
        const res = await axios.get(
          `http://localhost:3000/users/${decoded.sub}`
        );
        setUser(res.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    getUsers();
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("logged out successfully");
    navigate("/login");
  };

  // json-server --watch db.json
  const API_URL =
    import.meta.env.MODE === "production"
      ? "https://my-json-server.typicode.com/Islam-mohamed-74/React-blog" // الريبو الأول
      : "http://localhost:3000";
  return (
    <>
      <ToastContainer />
      <Navbar user={user} handelLogout={handelLogout} />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/post" element={<Post users={users} user={user} />} />
          <Route path="/post/new" element={<PostsForm user={user} />} />
          <Route path="/post/:id" element={<PostsForm user={user} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <ContactSection />
    </>
  );
}

export default App;
