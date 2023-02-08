import react, { useContext } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@/components/Card'
import { UsersContext } from '@/context/UsersContext';

const GridOfUsers = () => {
  const users = useContext(UsersContext);
  console.log('data z gridu', users);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gridTemplateColumns: '25% 25% 25% 25%',
        gap: '15px',
      }}
    >
      {users.map(user =>  <Card user={user} />)}
    </Container>
  )
};

export default GridOfUsers;
