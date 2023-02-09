import react, { useContext } from 'react';
import Container from '@mui/material/Container';
import Card from '@/components/Card';
import { UsersContext } from '@/context/UsersContext';

const GridOfUsers = () => {
  const { users } = useContext(UsersContext);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gridTemplateColumns: '25% 25% 25% 25%',
        gap: '15px',
      }}
    >
      {users.map(user => <Card user={user} key={user.id} />)}
    </Container>
  )
};

export default GridOfUsers;
