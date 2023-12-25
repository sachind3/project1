import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import CreatePost from "./pages/Posts/CreatePost";
import PageNotFound from "./pages/PageNotFound";
import MyPosts from "./pages/Posts/MyPosts";
import Auth from "./pages/Auth";
import EditPost from "./pages/Posts/EditPost";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="posts" element={<Posts />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="myposts" element={<MyPosts />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="editpost/:id" element={<EditPost />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
export default App;
