import {
  FormControl,
  FormLabel,
  Button,
  Text,
  Input,
  Box,
  FormErrorMessage,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as ReactRouterLink } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  // function called when submitting the form
  // change when backend developed
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Container as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box textAlign={"center"} mb={"5px"}>
          <Heading fontSize={"20px"}>LOG IN</Heading>
        </Box>

        <FormControl id="loginEmail" isInvalid={!!errors.email}>
          <FormLabel>Email:</FormLabel>
          <Input
            type={"email"}
            bg={"white"}
            placeholder={"Email"}
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="loginPassword" isInvalid={!!errors.password}>
          <FormLabel>Password:</FormLabel>
          <Input
            type={"password"}
            bg={"white"}
            placeholder={"Password"}
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <ReactRouterLink to="/forgotPassword">
            <Button variant={"link"} fontSize={"14px"} color={"blue"}>
              Forgot password?
            </Button>
          </ReactRouterLink>
        </Box>

        <Button variant={"loginPrimary"} w={"100%"} mt={"10px"} type="submit">
          Log in
        </Button>
      </Container>
    </>
  );
};

export default LoginForm;
