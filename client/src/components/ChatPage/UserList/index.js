import { AppBar, Badge, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Toolbar, Typography } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../actions/users";
import { initials, userName } from "../../../helpers/common";
import CustomizedAvatar from "../../Common/CustomAvatar";
import useStyles from "./styles";
import { ActionCable } from 'react-actioncable-provider';
import { getConversations } from "../../../actions/rooms";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Cable from "../../Cable";
import axios from "axios";
import ajax from "../../../api/ajax";

const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.users.list);
  const currentPage = useSelector(state => state.users.page);
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [activeRoom, setActiveRoom] = useState({});
  const chatRooms = useSelector(state => state.rooms.list);
  const [conversations, setConversations] = useState(chatRooms);
  const profile = useSelector(state => state.profile.user);

  useEffect(() => {
    dispatch(getConversations())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsersList(currentPage + 1, search));
  }, [dispatch, search]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  // const handleClick = id => {
  //   this.setState({ activeConversation: id });
  // };

  const handleReceivedConversation = response => {
    console.log('response', response);
    const { conversation } = response;
    setConversations([...conversations, conversation]);
  };

  const handleReceivedMessage = response => {
    const { message } = response;

    const newConversations = conversations.map(
      conversation => {
        if (conversation.id === message.conversation_id)
          return {...conversation, messages: [...conversation.messages, message] };
        return conversation;
    });
    setConversations(newConversations);
  };

  const createRoom = (receiverId) => {
    console.log('receiverId', receiverId)
    ajax('/chat_rooms', { method: 'POST',
      data: { chat_room: { title: "", user_id: profile?.id, receiver_id: receiverId } }
    })
  }

  const onSelectUser = (e) => {
    console.log('user', e.target.value);
  }

  console.log('list', usersList);
  return (<>
    <ActionCable
      channel={{ channel: 'ChatMessagesChannel' }}
      onReceived={handleReceivedConversation}
    />
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {!activeRoom ? <Box p={1} flexGrow={1}>
          <Autocomplete
          freeSolo
          disableClearable
          options={usersList.map(user => userName(user))}
          onSelect={(e) => onSelectUser(e)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search users"
              margin="dense"
              variant="outlined"
              value={search}
              InputProps={{ ...params.InputProps, type: 'search', className: classes.searchInput }}
              onChange={onSearch}
              classes={{ root: classes.searchRoot }}
            />
          )}
        />
      </Box>: <Box display="flex" alignItems="center">
        <IconButton color="inherit" onClick={() => setActiveRoom(null)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>User name</Typography>
      </Box>}
    </Toolbar>
  </AppBar>
  <Cable chatRooms={conversations} handleReceivedMessage={handleReceivedMessage} />
  <List className={classes.root}>
    {!activeRoom ? usersList.map(user => <Fragment key={user.id}>
      <ListItem onClick={() => createRoom(user.id)}>
        <ListItemAvatar>
          <CustomizedAvatar initials={initials(user)} />
        </ListItemAvatar>
        <ListItemText primary={userName(user)} secondary="Jan 9, 2014" />

        <Badge badgeContent={100} color="secondary" style={{ marginRight: 15 }} />
      </ListItem>
      <Divider />
    </Fragment>) : (
      <Box>
        <Grid container>
          <Grid item xs={11}>
            <Box borderRadius={6} p={1} m={1} color="#fff" bgcolor="#3a1245">Hi there</Box>
          </Grid>
          <Grid item xs={11} justify="flex-end">
            <Box borderRadius={6} p={1} m={1} color="#fff" bgcolor="#3a1245">Hi there</Box>
          </Grid>
        </Grid>
      </Box>
    )}
  </List>
  </>)
}

export default UserList;
