import {
  FormControl,
  FormLabel,
  Button,
  Text,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <Box w={"300px"}>
        <Box textAlign={"center"}>
          <Text fontWeight={"bold"} fontSize={"20px"}>
            LOG IN
          </Text>
        </Box>
        <FormControl>
          <FormLabel>Email: </FormLabel>
          <Input type={"email"} bg={"white"} />
          <FormLabel mt={"5px"}>Password: </FormLabel>
          <Input type={"password"} bg={"white"} />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <ReactRouterLink to="/forgotPassword">
              <Button variant={"link"} fontSize={"14px"} color={"blue"}>
                Forgot password?
              </Button>
            </ReactRouterLink>
          </Box>
          
          <Button variant={"loginPrimary"} w={"100%"} mt={"10px"} type={"submit"}>
          Log in
          </Button>
        </FormControl>

        <Box mt={"20px"} textAlign={"center"}>
          <Text>
            Don't have an account?{" "}
            <Button variant={"link"} color={"blue"}>
              Sign up here!
            </Button>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
