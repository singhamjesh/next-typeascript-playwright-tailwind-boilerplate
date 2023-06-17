export interface IAuthState {
  email: string;
  token: string;
}

export interface ISocialConnection {
  sub?: string;
  name?: string;
}

export interface IProfile {
  username?: string;
  avatar?: string;
  lastLogin?: Date;
}

export interface IMetadata {
  histories?: any;
}

export interface IUser {
  _id?: any;
  email?: string;
  auth0Id?: string;
  profile?: IProfile;
  userMeta?: IMetadata;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserState {
  user: IUser;
}

export interface IAgentState {
  agents: any[];
  agentQueue: any[];
  agentData: any[];
}
