import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContext, { UserContextType } from '@/context/UserContext';
import { endpoint } from '@/utils/paths';
import { PostType } from '@/utils/types';
import ErrorView from '@/components/ErrorView';

type RemovePostContentTypeProps = {
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
  postSelected: string | number;
}

const RemovePostContent = ({
  handleCloseModal,
  postSelected,
}: RemovePostContentTypeProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const context = useContext(UserContext);
  if (!context) {
    return <ErrorView errorMessage="Context Error. There was a problem with getting data" />
  }
  const {
    userPosts,
    setUserPosts,
  } = context;

  const removePost = async (id: string | number) => {
    try {
      const res = await axios.delete(`${endpoint.baseApiUrl}${endpoint.posts}${id}`);
      const filteredPosts = userPosts.filter((post: PostType) => post.id !== id);
      setUserPosts(filteredPosts);
      setErrorMessage('');
      handleCloseModal(false);
    } catch(err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data as string ?? 'Something went wrong...');
      }
      setErrorMessage('Something went wrong...');
    }
  };

  return (
    <>
      <Typography>
        Are you sure you want to delete this post?
      </Typography>
      {errorMessage && (
        <ErrorView errorMessage={errorMessage} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handleCloseModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => removePost(postSelected)}
        >
          Delete Post
        </Button>
      </Box>
    </>
  )
}

export default RemovePostContent;
