/* eslint-disable no-plusplus */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import io from 'socket.io-client';

// eslint-disable-next-line func-names
const Socket = (function () {
  let instance;
  let reconnectAttemptCount = 0;

  /**
   * Create socket instance
   *
   * @param {string} userId userId
   * @param {string} authToken auth token
   * @returns {*} socket instance
   */
  function createInstance(userId, authToken) {
    if (instance) {
      instance.close();
    }

    const socket = io(`${process.env.BaseApiUrl}`, {
      query: { user: userId },
      auth: { token: `Bearer ${authToken}` }
    });
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (err) => {
      console.log(`Socket getting error whiling connection ${err}.`);
      socket.close();
    });

    socket.io.on('reconnect_attempt', () => {
      reconnectAttemptCount++;
      if (reconnectAttemptCount >= 3) {
        console.log(`Socket reached on max attempt:${reconnectAttemptCount}.`);
        socket.close();
      }
    });

    return socket;
  }

  return {
    connect(userId, authToken) {
      console.log('inside connect');
      if (!instance) {
        instance = createInstance(userId, authToken);
      }
      return instance;
    },
    disconnect() {
      if (instance) {
        instance.close();
        instance.on('disconnect', () => {
          console.log('Socket disconnect');
        });
      }
      instance = null;
    }
  };
})();

export default Socket;
