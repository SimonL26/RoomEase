import {
    Flex,
    Box,
    Text,
    HStack,
    Button
} from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      pt={"5px"}
      padding={"10px 0"}
    >
      <Box pl={"10px"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} pl={"20px"}>
          RoomEase
        </Text>
      </Box>
      <HStack spacing={6} pr={"30px"}>
        <ReactRouterLink to="/login">
          <Button w={"100px"} variant={"loginPrimary"}>
            Login
          </Button>
        </ReactRouterLink>
        <ReactRouterLink to="/signup">
          <Button variant={"loginOutline"} w={"100px"}>
            Sign Up
          </Button>
        </ReactRouterLink>
      </HStack>
    </Flex>
  );
};

export default Header;
