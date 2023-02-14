import Container from '@mui/material/Container';
import Card from '@/routes/GridOfUsers/components/Card';
import { UserType } from '@/utils/types';
import ErrorView from '@/components/ErrorView';

type GridOfUsersPropTypes = {
  users: Array<UserType> | string;
}

const GridOfUsers = ({ users }: GridOfUsersPropTypes) => (
  <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          lg: '1fr 1fr 1fr 1fr',
          md: '1fr 1fr',
          xs: '1f',
        },
        gap: '15px',
        margin: '30px auto'
      }}
    >
      {typeof users !== 'string' &&
        users.length > 0 &&
        users.slice(0, 8).map((user: UserType) => <Card user={user} key={user.id} />)}
      {typeof users !== 'string' &&
        users.length === 0 &&
        <p>no users at the moment</p>}
      {typeof users === 'string' && <ErrorView errorMessage={users} />}
  </Container>
);

export default GridOfUsers;
