import { Flex, VStack, Text, Container, Box, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "../components/LoginForm";


const Logins = () => {
  return (
    <>
      <Flex justifyContent="center" height={"full"}>
        <VStack
          bg={"#E5E5E5"}
          borderRadius="25px"
          boxShadow={"lg"}
          // boxSize={{ base: "md", lg: "xl", md: "lg" }}
          m={{ base: "50px 0", lg: "75px 0" }}
          w={{ base: "350px", lg: "450px", sm:"350px", md:"400px"}}
        >
          <Container textAlign={"center"}>
            <ReactRouterLink to="/">
              <Text m={"20px 0 10px 0"} fontSize={"50px"}>RoomEase</Text>
            </ReactRouterLink>
          </Container>
          
          <Box w={"300px"} pb={"50px"}>
            <LoginForm />
            <Box mt={"20px"} textAlign={"center"}>
              <Text>
                Don't have an account?{" "}
                <ReactRouterLink to={"/signup"}>
                  <Button variant={"link"} color={"blue"}>
                    Create one here!
                  </Button>
                </ReactRouterLink>
              </Text>
            </Box>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default Logins;
