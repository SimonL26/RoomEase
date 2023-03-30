import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPW: z.string().min(8)
})

type SignUpFormData = z.infer<typeof signUpSchema>

const RegisterForm = () => {
  return (
    <>
      <Box w={"300px"} pb={"50px"}>
        <Container as={"form"}>
          <Box textAlign={"center"}>
            <Heading fontSize={"20px"}>CREATE ACCOUNT</Heading>
          </Box>

          <FormControl id="signupEmail">
            <FormLabel>Email:</FormLabel>
            <Input type={"email"} bg={"white"} placeholder={"Your Email"} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <FormControl id="signupPassword" mt={"10px"}>
            <FormLabel mb={0}>Password:</FormLabel>
            <FormHelperText m={"0px 0px 5px 5px"}>
              You password must have:
              <UnorderedList>
                <ListItem>A minimum of 8 characters</ListItem>
                <ListItem>A lowercase character</ListItem>
                <ListItem>An uppercase character</ListItem>
                <ListItem>A numeric character</ListItem>
              </UnorderedList>
            </FormHelperText>
            <Input
              type={"password"}
              bg={"white"}
              placeholder={"Your Password"}
            />
          </FormControl>

          <FormControl id="confirmPassword" mt={"10px"}>
            <FormLabel>Confirm New Password:</FormLabel>
            <Input
              type={"password"}
              bg={"white"}
              placeholder={"Re-enter Your Password"}
            />
          </FormControl>

          <Button
            variant={"loginPrimary"}
            w={"full"}
            mt={"15px"}
            type={"submit"}
          >
            Create Account
          </Button>
        </Container>

        <Box textAlign={"center"} mt={"20px"}>
          <Text>
            Already have an account?
            <Button variant={"link"} color={"blue"}>
              Login here
            </Button>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
