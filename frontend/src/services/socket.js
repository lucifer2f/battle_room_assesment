import io from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket = null;

export const connectSocket = (roomId) => {
  socket = io(SOCKET_URL, {
    auth: {
      token: localStorage.getItem('authToken'),
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
    socket.emit('join_room', { roomId });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const emitEvent = (eventName, data) => {
  if (socket) {
    socket.emit(eventName, data);
  }
};

export const onEvent = (eventName, callback) => {
  if (socket) {
    socket.on(eventName, callback);
  }
};

export const offEvent = (eventName, callback) => {
  if (socket) {
    socket.off(eventName, callback);
  }
};

export const getSocket = () => socket;
