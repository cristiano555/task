import {
  useContext,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicModal from '@/components/Modal';
import AddPostForm from '@/routes/SingleUser/components/AddPostForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorView from '@/components/ErrorView';
import UserContext from '@/context/UserContext';
import ListOfPosts from '@/routes/SingleUser/components/ListOfPosts';
import RemovePostContent from '@/routes/SingleUser/components/RemovePostContent';
import { ADDING_POST } from '@/utils/constants';

const SingleUser = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [postSelected, setPostSelected] = useState<string | number>('');
  const router = useRouter();
  const context = useContext(UserContext);
  if (!context) {
    return <ErrorView errorMessage="Context Error. There was a problem with getting data" />
  }
  const { userName } = context;

  function handleModal(
    content: string,
    title: string
  ) {
    setModalTitle(title);
    setIsOpenModal(true);
    setModalContent(content);
  };

  return (
    <Container>
      <BasicModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title={modalTitle}
      >
        {
          {
            ADDING_POST: <AddPostForm
              handleCloseModal={setIsOpenModal}
            />,
            REMOVING_POST: <RemovePostContent
              postSelected={postSelected}
              handleCloseModal={setIsOpenModal}
            />,
          }[modalContent]
        }
      </BasicModal>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          margin: '30px'
        }}
      >
        {userName}
      </Typography>
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
          onClick={() => handleModal(ADDING_POST, 'Add new Post')}
        >
          Add New Post
        </Button>
      </Box>
      <ListOfPosts
        handleModal={handleModal}
        setPostSelected={setPostSelected}
      />
    </Container>
  )
};

export default SingleUser;
