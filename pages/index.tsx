import styles from '../styles/Home.module.css';
import GridOfUsers from '@/routes/GridOfUsers';


const HomePage = ({ users }) => <GridOfUsers users={users} />

export async function getServerSideProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const users = await res.json()

  return {
    props: {
      users
    }
  };
};


export default HomePage;
