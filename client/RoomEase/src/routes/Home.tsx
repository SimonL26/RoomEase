import { Box, Flex, Button, VStack } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Flex justifyContent="center" height={"100%"}>
        <VStack
          bg={"beige"}
          borderRadius="25px"
          boxShadow={"lg"}
          boxSize={{ base: "sm", lg: "lg", md: "md" }}
          mt={{ base: "50px", lg: "75px" }}
        >
          <Button w={"150px"} bg={"teal.200"}>
            Login
          </Button>
          <Button w={"150px"} bg={"teal.200"}>
            Register
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
