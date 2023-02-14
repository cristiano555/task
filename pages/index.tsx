// import styles from '../styles/Home.module.css';
import { GetServerSideProps } from 'next';
import GridOfUsers from '@/routes/GridOfUsers';
import { getData } from '@/utils/helpers';
import { endpoint } from '@/utils/paths';
import { UserType } from '@/utils/types';

type HomePagePropTypes = {
  users: Array<UserType>;
}

const HomePage = ({ users }: HomePagePropTypes) => <GridOfUsers users={users} />

export const getServerSideProps: GetServerSideProps = async context => {
  const users = await getData(endpoint.users);

  return {
    props: {
      users
    }
  };
};

export default HomePage;
