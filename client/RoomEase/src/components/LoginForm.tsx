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
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowPassword from "./ShowPassword";
import useStore from "../store";
import { authApi } from "../api/authApi";
import { ILoginResponse } from "../api/types";
import { toast } from "react-toastify";

const loginSchema = object({
  email: string().email(),
  password: string(),
});

type LoginFormData = TypeOf<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const store = useStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const loginUser = async (data: LoginFormData) => {
    try {
      store.setRequestLoading(true);
      const response = await authApi.post<ILoginResponse>("/auth/login", data);
      store.setRequestLoading(false);
      toast(response.data.message, { position: "top-right" });
      navigate("/changeDest");
    } catch (error: any) {
      store.setRequestLoading(false);
      const response =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(response, { position: "top-right" });
    }
  };

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    // function called when submitting the form
    // change when backend developed
    console.log("submitted login");
    loginUser(data);
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
            <ShowPassword
              show={showPassword}
              handleShow={() => {
                setShowPassword(!showPassword);
              }}
            />
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

        <Button
          isLoading={store.requestLoading}
          variant={"loginPrimary"}
          w={"100%"}
          mt={"10px"}
          type="submit"
        >
          Log in
        </Button>
      </Container>
    </>
  );
};

export default LoginForm;
