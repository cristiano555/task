import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { palette } from '@/utils/constants';

type AddFormPostPropTypes = {
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
}

const AddFormPost = ({ handleCloseModal }: AddFormPostPropTypes ) => {
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


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputLength = title.length;
    const maxLength = 80;

    if (inputLength > maxLength) {
      return setErrorMessage("Title is too long!");
    }

    if (/[<>'"%&;]/.test(title)) {
      return setErrorMessage("Title contains disallowed characters");
    }

    setErrorMessage('');

    return setTitle('');
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
      <Typography
        sx={{ color: palette.error }}
      >
        {errorMessage}
      </Typography>
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
