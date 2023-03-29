import { Button, Flex, Grid, GridItem, HStack, Box, Text} from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

const Home = () => {
  return (
    <Grid
      templateAreas={`"main" "subs" "footer"`}
      gridTemplateRows={"30em 20em 100px"}
    >
      <GridItem area={"main"} bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
        <Flex justifyContent={"space-between"} alignItems={"center"} pt={"5px"}>
          <Box pl={"10px"}>
            <Text fontSize={"2xl"}>RoomEase</Text>
          </Box>
          <HStack spacing={6} pr={"10px"}>
            <ReactRouterLink to="/userAccess">
              <Button w={"100px"} variant={"loginPrimary"}>Login</Button>
            </ReactRouterLink>
            <ReactRouterLink to="/userAccess">
              <Button variant={"loginOutline"} w={"100px"}>
                Register
              </Button> 
            </ReactRouterLink>
          </HStack>
        </Flex>
      </GridItem>
      <GridItem area={"subs"} bg={"pink.300"}>
        Subsribe
      </GridItem>
      <GridItem area={"footer"} bg={"green.300"}>
        Developed by ...
      </GridItem>
    </Grid>
  );
}

export default Home