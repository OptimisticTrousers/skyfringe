import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import App from "./App";
import useCurrentAuthUser from "./hooks/useCurrentAuthUser";
import { AllFriends } from "./pages/AllFriends";
import { Chat } from "./pages/Chat";
import { Error404 } from "./pages/Error404";
import { Error500 } from "./pages/Error500";
import { FriendRequests } from "./pages/FriendRequests";
import { FriendsHome } from "./pages/FriendsHome";
import { Home } from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import { Login } from "./pages/Login";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { Settings } from "./pages/Settings";

const RouteSwitch = () => {
  const { user, loading, error } = useCurrentAuthUser();

  if (error) {
    <BrowserRouter>
      <Error500 />
    </BrowserRouter>;
  }

  return (
    <BrowserRouter>
      <LoadingScreen />
      {!loading && (
        <Routes>
          <Route path="/" element={!user ? <Navigate to="/login" /> : <App />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users">
              <Route path=":userId">
                <Route index element={<Profile profileView={"home"} />} />
                <Route
                  path="friends"
                  element={<Profile profileView={"friends"} />}
                />
                <Route
                  path="likedPosts"
                  element={<Profile profileView={"likedPosts"} />}
                />
                <Route
                  path="media"
                  element={<Profile profileView={"media"} />}
                />
              </Route>
            </Route>
            <Route path="notifications" element={<Notifications />} />
            <Route path="chat" element={<Chat />} />
            <Route path="friends">
              <Route index element={<FriendsHome />} />
              <Route path="all" element={<AllFriends />} />
              <Route path="requests" element={<FriendRequests />} />
            </Route>
          </Route>
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={user ? <Error404 /> : <Navigate to="/login" />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default RouteSwitch;
