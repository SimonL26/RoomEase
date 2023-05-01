import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Box,
  FormErrorMessage,
  Container,
  Heading,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";
import ShowPassword from "./ShowPassword";

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
    reset
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // function called when submitting the form
  // change when backend developed
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
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

          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              bg={"white"}
              placeholder={"Password"}
              {...register("password")}
            />
            <ShowPassword show={showPassword} handleShow={handleShowPassword}/>
          </InputGroup>
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
