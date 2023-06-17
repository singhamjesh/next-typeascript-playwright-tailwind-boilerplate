import axios from 'axios';
import { get } from 'lodash';
import { IAgentState } from './types';

/**
 * This method is response to store agent list
 *
 * @param {any} agent - agent response
 * @returns void
 */
export function setAgentList(agent: any) {
  return {
    type: 'SET_AGENT_LIST',
    payload: agent
  };
}

/**
 * This method is response to push data in agentQueue
 *
 * @param {any} data - agent response
 * @returns void
 */
export function setAgentInQueue(data: any) {
  return {
    type: 'SET_AGENT_IN_QUEUE',
    payload: data
  };
}

/**
 * This method is response to store agent data
 *
 * @param {any} payload - agent response
 * @returns void
 */
export function setAgentData(data: any) {
  return {
    type: 'SET_AGENT_DATA',
    payload: data
  };
}

/**
 * This method is responsible to get agent list
 *
 * @param {any} data - date for filter
 * @return {any} response - agent response data
 */
export const getAgents = () => (dispatch: any, getState: any) => {
  return axios({
    url: `${process.env.BaseApiUrl}/v1/agent`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.token}`
    },
    method: 'get',
    responseType: 'json'
  })
    .then((response: any) => {
      const data = get(response, 'data.data.docs');
      dispatch(setAgentList(data));
    })
    .catch(() => {
      return false;
    });
};

/**
 * This method is responsible to get agent response data by date
 *
 * @param {any} data - date for filter
 * @return {any} response - agent response data
 */
export const getAgentData =
  (payload: any) => (dispatch: any, getState: any) => {
    const { generateDate } = payload;
    const params = {
      ...payload,
      generateDate: { $lte: generateDate }
    };
    return axios({
      url: `${process.env.BaseApiUrl}/v1/agentResponse/groupby`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`
      },
      params,
      method: 'get',
      responseType: 'json'
    })
      .then((response: any) => {
        const agentData = get(response, 'data.data');
        dispatch(setAgentData(agentData));
      })
      .catch(() => {
        return false;
      });
  };

/**
 * This method is responsible to get agent response data by date
 *
 * @param {any} data - date for filter
 * @return {any} response - agent response data
 */
export const getAgentQueue = () => (dispatch: any, getState: any) => {
  const params = {
    'status[$in]': 'inprogress,failed',
    $sort: 'createdAt|-1'
  };
  return axios({
    url: `${process.env.BaseApiUrl}/v1/agentResponse`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.token}`
    },
    params,
    method: 'get',
    responseType: 'json'
  })
    .then((response: any) => {
      const agentQueue = get(response, 'data.data.docs');
      dispatch(setAgentInQueue(agentQueue));
      return agentQueue;
    })
    .catch(() => {
      return false;
    });
};

/**
 * This method is responsible to call an agent to generate response
 *
 * @param {any} payload - for agent calling data
 * @return {any} response - agent response data
 */
export const callAgent = (payload: any) => (dispatch: any, getState: any) => {
  return axios({
    url: `${process.env.BaseApiUrl}/v1/agentResponse`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.token}`
    },
    method: 'post',
    data: { url: payload.url, agentId: get(payload, 'agent._id') },
    responseType: 'json'
  })
    .then((response: any) => {
      const agentData = get(response, 'data.result');
      /* Push data in queue */
      const { agentQueue } = getState().agent;
      dispatch(setAgentInQueue([agentData, ...agentQueue]));

      return agentData;
    })
    .catch(() => {
      return false;
    });
};

/**
 * This method is responsible for remove agent response
 *
 * @param {any} data - agent response data
 * @return {any} response - deleted agent response
 */
export const removeAgent = (data: any) => (dispatch: any, getState: any) => {
  return axios({
    url: `${process.env.BaseApiUrl}/v1/agentResponse/${data._id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.token}`
    },
    method: 'delete',
    responseType: 'json'
  })
    .then((response: any) => {
      const deletedData = get(response, 'data.data');
      const { agentQueue } = getState().agent;
      const newAgentQueue = agentQueue.filter(
        (item: any) => item._id !== deletedData._id
      );
      dispatch(setAgentInQueue(newAgentQueue));
      return deletedData;
    })
    .catch(() => {
      return false;
    });
};

// Initialize default state value
const initialState: IAgentState = {
  agentQueue: [],
  agents: [],
  agentData: []
};

/**
 * To set agent object in redux
 *
 * @param {any} state - Redux state
 * @param {any} action - Redux action
 * @returns {any} This function return redux agent state.
 */
const agent = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_AGENT_IN_QUEUE':
      return {
        ...state,
        agentQueue: action.payload
      };
    case 'SET_AGENT_DATA':
      return {
        ...state,
        agentData: action.payload
      };
    case 'SET_AGENT_LIST':
      return {
        ...state,
        agents: action.payload
      };
    default:
      return state;
  }
};

export default agent;
