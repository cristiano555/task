import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import UserContext from '@/context/UserContext';
import { endpoint } from '@/utils/paths';
import ErrorView from '@/components/ErrorView';

type AddFormPostPropTypes = {
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
}

const AddFormPost = ({
  handleCloseModal,
}: AddFormPostPropTypes ) => {
  const [
    title,
    setTitle,
  ] = useState<string>('');
  const [
    content,
    setContent,
  ] = useState<string>('');
  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string>('');
  const context = useContext(UserContext);
  if (!context) {
    return <ErrorView errorMessage="Context Error. There was a problem with getting data" />
  };
  const {
    userPosts,
    setUserPosts,
    userId,
  } = context;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const post = { title: title, content: content, userId: userId };
      const res = await axios.post(`${endpoint.baseApiUrl}${endpoint.posts}`, post);
      setUserPosts([
        ...userPosts,
        res.data,
      ]);
      setTitle('');
      setContent('');
      handleCloseModal(false);
    } catch(err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data as string ?? 'Something went wrong...');
      }
      setErrorMessage('Something went wrong...');
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTitle(e.target.value);
  }

  function handleContentChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        id="name"
        name="name"
        label="title"
        size="small"
        sx={{
          width: {
            xs: '100%',
          },
        }}
        onChange={e => handleTitleChange(e)}
        value={title}
      />
      <TextField
        placeholder="Write post here..."
        variant="outlined"
        id="content"
        name="content"
        label="content"
        size="small"
        multiline
        rows={6}
        maxRows={6}
        sx={{
          width: {
            xs: '100%',
          },
          margin: '15px 0',
        }}
        onChange={e => handleContentChange(e)}
        value={content}
      />
      {errorMessage && (
        <ErrorView errorMessage={errorMessage} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
          type="submit"
        >
          Add Post
        </Button>
      </Box>
    </form>
  )
}

export default AddFormPost;
