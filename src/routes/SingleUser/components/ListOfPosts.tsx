import react, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import UserContext from '@/context/UserContext';
import { PostType } from '@/utils/types';
import ErrorView from '@/components/ErrorView';
import { REMOVING_POST } from '@/utils/constants';

type ListOfPostsPropsType = {
  handleModal: (content: string, title: string) => void;
  setPostSelected: Dispatch<SetStateAction<string | number>>;
}

const ListOfPosts = ({
  handleModal,
  setPostSelected,
}: ListOfPostsPropsType) => {
  const context = useContext(UserContext);
  if (!context) {
    return <ErrorView errorMessage="Context Error. There was a problem with getting data" />
  }
  const {
    userPosts,
    setUserPosts,
    setUserId,
    userId,
  } = context;

  return (
    <List
      sx={{
        gap: '15px',
        margin: '30px 0',
      }}
    >
      {userPosts && (
        userPosts.map((post: PostType) => (
          <Link
            key={post.id}
            href={`/user/${userId}/${post.id}`}
          >
            <ListItem
              sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: '5px',
                marginBottom: '15px',
              }}
            >
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={(event) => {
                  setPostSelected(post.id);
                  handleModal(REMOVING_POST, 'Delete Post');
                  event.preventDefault();
                }}
              >
                <DeleteIcon />
              </IconButton>
              <ListItemText
                sx={{
                  overflow: 'hidden',
                }}
                primary={post.title}
              />
            </ListItem>
          </Link>
        ))
      )}
    </List>
  )
}

export default ListOfPosts;
