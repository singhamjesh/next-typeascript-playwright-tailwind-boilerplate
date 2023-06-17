/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from 'react';
import { get } from 'lodash';
import { useStore } from 'react-redux';
import { setAgentInQueue, getAgentData } from '@/reducers/agent';
import Socket from '@/libs/socketIo';

const Index: FunctionComponent<any> = () => {
  const store: any = useStore();

  useEffect(() => {
    const { token } = store.getState().auth;
    const { user } = store.getState().user;

    /* Connect socket once */
    const io = Socket.connect(get(user, '_id'), token);

    /* Handle socket agent-callback event */
    io.on('agent-callback', agentCallbackHandler);

    return () => {
      io.off('agent-callback', agentCallbackHandler);
    };
  }, []);

  /**
   * Agent callback handle by socket
   *
   * @param {any} data - socket payload
   */
  const agentCallbackHandler = (data: any) => {
    setTimeout(() => {
      const { agentQueue } = store.getState().agent;
      let newAgentQueue = [];

      if (data.status === 'success') {
        newAgentQueue = agentQueue.filter((item: any) => item._id !== data.id);
      } else {
        newAgentQueue = agentQueue.map((item: any) => {
          if (item._id === data.id) {
            return { ...item, status: data.status };
          }
          return item;
        });
      }
      store.dispatch(setAgentInQueue(newAgentQueue));
      store.dispatch(getAgentData({ status: 'completed' }));
    }, 2000);
  };

  return null;
};

export default Index;
