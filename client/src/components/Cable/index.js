import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ chatRooms, handleReceivedMessage }) => {
  return (
    <Fragment>
      {chatRooms.map(room => {
        return (
          <ActionCable
            key={room.id}
            channel={{ channel: 'MessagesChannel', room: room.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;