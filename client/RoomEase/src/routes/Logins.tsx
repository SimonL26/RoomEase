import { Flex, Button, VStack, Text } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Logins = () => {
  return (
    <>
      <Flex justifyContent="center" height={"100%"}>
        <VStack
          bg={"#E5E5E5"}
          borderRadius="25px"
          boxShadow={"lg"}
          boxSize={{ base: "sm", lg: "lg", md: "md" }}
          mt={{ base: "50px", lg: "75px" }}
        >
          <Text m={"20px 0"} fontSize={"50px"}>RoomEase</Text>
          
          <LoginForm />
        </VStack>
      </Flex>
    </>
  );
};

export default Logins;
