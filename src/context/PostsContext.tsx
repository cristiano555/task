import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

// import { getTranslation } from '../utils/helpers';

// type TranslationType = {
//   [key: string]: string;
// };
type PostProviderType = {
  translation: TranslationType;
  setLanguage: (choosenLang: string) => void;
}

export const PostContext = React.createContext<PostProviderType|null>(null);

const PostProvider: React.FC<{
  children: React.ReactNode,
  userActivity: Array<Post>,
}> = ({ children }) => {

  return (
    <PostContext.Provider value={userActivity}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
