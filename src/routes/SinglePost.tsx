import react, {
  useContext,
  useState,
  useEffect
} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { UsersContext } from '@/context/UsersContext';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicModal } from '@/components/Modal';
import AddPostForm from '@/components/AddPostForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostContext } from '../../pages/user/[id]';
import ListOfPosts from '@/routes/ListOfPosts';

const SinglePost = () => {
  const [post, setPost] = useState('');
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState(null);

  const router = useRouter();
  const { id, postId } = router.query;
  const { users } = useContext(UsersContext);
  const userActivity = useContext(PostContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const properUser = users.find(user => user.id.toString() === id);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const post = await res.json();
      setPost(post.body);
      setTitle(post.title);
    };

    fetchPost();
  }, [postId])

  const handleShowingComments = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const comments = await res.json();
    } catch(err) {

    }
  }

  return (
    <Container>
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
      </Box>
      {title && (
        <Typography
          variant="h1"
          component="h5"
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {post && (
        <Typography>
            {post}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={() => setIsOpenModal(true)}
      >
        Show comments
      </Button>
    </Container>
  )
};

export default SinglePost;
