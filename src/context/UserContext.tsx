import {
  Dispatch,
  createContext,
  SetStateAction,
} from 'react';
import { PostType } from '@/utils/types';

export type UserContextType = {
  userPosts: Array<PostType>;
  setUserPosts: Dispatch<SetStateAction<Array<PostType>>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  setUserName: Dispatch<SetStateAction<string>>;
  userName: string;
}

const UserContext = createContext<null | UserContextType>(null);

export default UserContext;
