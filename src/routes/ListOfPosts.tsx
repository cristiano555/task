import react, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { PostContext } from '../../pages/user/[id]';
import Link from 'next/link';

const ListOfPosts = () => {
  const userActivity = useContext(PostContext);
  const { id, posts } = userActivity;

  const removePost = () => {

  }

  return (
    <List
      sx={{
        gap: '15px',
        margin: '30px 0',
      }}
    >
      {posts && (
        posts.map(post => (
          <Link
            key={post.id}
            href={`/user/${id}/${post.id}`}
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
                onClick={() => removePost(id)}
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
