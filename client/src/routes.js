import Login from "./component/Login";
import Signup from "./component/SignUp";
import Profile from "./component/Profile";
import CreateQuote from "./component/Quotes";
import Home from "./component/Home";
import OtherUserProfile from "./component/OtherProfile";
import NotFound from "./component/NotFound";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userid", element: <OtherUserProfile /> },
  { path: "*", element: <NotFound /> },
];
