import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AllFriends } from "./pages/AllFriends";
import { Chat } from "./pages/Chat";
import { FriendRequests } from "./pages/FriendRequests";
import { FriendsHome } from "./pages/FriendsHome";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { Settings } from "./pages/Settings";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="chat" element={<Chat />} />
          <Route path="friends">
            <Route index element={<FriendsHome />} />
            <Route path="all" element={<AllFriends />} />
            <Route path="requests" element={<FriendRequests />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;