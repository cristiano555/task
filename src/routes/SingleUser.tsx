import react, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { UsersContext } from '@/context/UsersContext';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicModal } from '@/components/Modal';
import AddPostForm from '@/components/AddPostForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostContext } from '../../pages/user/[id]';
import ListOfPosts from '@/routes/ListOfPosts';

const SingleUser = () => {
  const { users } = useContext(UsersContext);
  const userActivity = useContext(PostContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter()
  const { id, posts, name } = userActivity;
  console.log('name from single user', name);

  const properUser = users.find(user => user.id.toString() === id);

  return (
    <Container>
      <BasicModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Add Post"
      >
        <AddPostForm handleCloseModal={setIsOpenModal} />
      </BasicModal>
      {properUser && (
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            margin: '30px'
          }}
        >
          {properUser.name}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Move Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsOpenModal(true)}
        >
          Add New Post
        </Button>
      </Box>
      <ListOfPosts />
    </Container>
  )
};

export default SingleUser;
