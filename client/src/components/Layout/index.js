import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../actions/auth";
import Auth from "../Auth";
import ChatPage from "../ChatPage";
import useStyles from "./styles";

const Layout = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.profile.user);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);

    dispatch(getCurrentUser()).then(ack => {
      setLoading(false);
      setLoggedIn(ack);
    });
  }, [dispatch]);

  console.log('userInfo', userInfo);
  return (<>
    {loading ?
      <CircularProgress classes={{ root: classes.loader }} />
      : loggedIn ?
      <ChatPage /> :
      <Auth />}
  </>)
}

export default Layout;