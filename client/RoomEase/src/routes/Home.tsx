import {
    List,
    ListItem,
    Link
  } from '@chakra-ui/react'

const Home = () => {
  return (
    <>
        <List>
            <ListItem>
                <Link href={`/login`}>Login</Link>
            </ListItem>
            <ListItem>
                <Link href={`/register`}>Sign Up</Link>
            </ListItem>
        </List>
    </>
  )
}

export default Home