import {
  useState,
  useEffect
} from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { endpoint } from '@/utils/paths';
import { getData } from '@/utils/helpers';
import {
  UserType,
  CommentType,
} from '@/utils/types';

const SinglePost = () => {
  const [post, setPost] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isComments, setIsComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<CommentType>>();

  const router = useRouter();
  const { id, postId } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      const requestAll = await Promise.all([
        getData(endpoint.users),
        getData(endpoint.posts, postId as string)
      ]);
      const fetchedUsers = requestAll[0];
      const fetchedPost = requestAll[1];
      if (typeof fetchedUsers !== 'string') {
        const user = fetchedUsers.filter((user: UserType) => user.id.toString() === id);
        setUserName(user[0]?.name);
      };

      setPost(fetchedPost?.body);
      setTitle(fetchedPost?.title);
    };

    fetchPost();
  }, [postId])

  const handleShowingComments = async () => {
    if (!isComments) {
      try {
        const res = await axios.get(`${endpoint.baseApiUrl}/comments?postId=${postId}`);
        const comments = await res.data;

        setComments(comments);
      } catch(err) {
        console.log('error')
      }
    }

    setIsComments(!isComments);
  }

  return (
    <Container>
      {userName && post && title && (
        <>
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
          </Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              margin: '30px 0',
              fontSize: '2rem'
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ margin: '15px 0' }}
          >
            {post}
          </Typography>
          <Button
            variant="contained"
            onClick={handleShowingComments}
          >
            {isComments ? 'Hide comments' : 'Show comments'}
          </Button>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper'
            }}
          >
            {isComments && (
              comments?.map((comment: CommentType) => (
                <ListItem
                  key={comment.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0',
                    flexDirection: {
                      lg: 'row',
                      xs: 'column',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        lg: '25%',
                        xs: '100%',
                      },
                    }}
                  >
                    <Typography
                    sx={{
                      textAlign: 'left',
                    }}
                    >
                      {comment.email}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: {
                        lg: '75%',
                        xs: '100%',
                      },
                    }}
                  >
                    {comment.body}
                  </Box>
                </ListItem>
              ))
            )}
          </List>
        </>
        )
      }
    </Container>
  )
};

export default SinglePost;
