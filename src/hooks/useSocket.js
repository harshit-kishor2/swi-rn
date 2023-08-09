import socket from '@app/helper/socket';
import {useEffect, useState} from 'react';

const useSocket = updateNewMessage => {
  useEffect(() => {
    console.log('Socket====', socket);
    function onConnect(so) {
      console.log('Socket Connected', so);
    }

    function onDisconnect() {
      console.log('Socket Disconnected');
    }
    function onNewMessage(msg) {
      if (msg && msg?.data) {
        console.log('Socket New Message', msg);
        updateNewMessage(msg?.data);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newmsg', onNewMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newmsg', onNewMessage);
    };
  }, []);
  return null;
};

export default useSocket;
