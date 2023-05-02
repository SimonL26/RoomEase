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
  List,
  ListIcon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { FieldValues } from "react-hook-form/dist/types";
import { z, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import ShowPassword from "./ShowPassword";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must not be empty"),
    confirmPassword: z.string().min(8, "Must match to password"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Password did not match!",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });
  const [hasLength, setHasLength] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // access navigate function to allow redirect

  useEffect(() => {
    if (isSubmitSuccessful){
      setHasLength(false);
      setHasLowercase(false);
      setHasUppercase(false);
      setHasNumber(false);
      reset();
    }
  }, [isSubmitSuccessful])

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* function that handles password requirement check */
    let input = event.target.value;

    if (input.length > 7) {
      setHasLength(true);
    } else {
      setHasLength(false);
    }

    if (/[A-Z]/.test(input)) {
      setHasUppercase(true);
    } else {
      setHasUppercase(false);
    }

    if (/[a-z]/.test(input)) {
      setHasLowercase(true);
    } else {
      setHasLowercase(false);
    }

    if (/[0-9]/.test(input)) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }
  };

  // const resetRequirementStates = () =>{
  //   // resets password requirements state on form submit
  //   setHasLength(false);
  //   setHasLowercase(false);
  //   setHasUppercase(false);
  //   setHasNumber(false);
  // }

  const registerUser = async (data: SignUpFormData) => {
    try {
      // function called when submitting the sign up form
      const api_url = "http://localhost:5000/api/auth/signup";
      // use axios to send post request
      const response = await axios.post(api_url, {
        email: data.email,
        password: data.password,
      });
      // if success use toast to notify 
      toast.success("Successfully registered!", { position: "top-right" });
      // then navigate to login page
      navigate("/login");
    } catch (error: any) {
      const errMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(errMessage, { position: "top-right" });
    }
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log("Submit was called")
    registerUser(data)
  };

  return (
    <>
      <Container as={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/* Form body */}
        <Box textAlign={"center"} mb={"5px"}>
          <Heading fontSize={"20px"}>CREATE ACCOUNT</Heading>
        </Box>

        <FormControl id="signupEmail" isInvalid={!!errors.email}>
          <FormLabel>Email:</FormLabel>
          <Input
            type={"email"}
            bg={"white"}
            placeholder={"Your Email"}
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="signupPassword"
          mt={"10px"}
          isInvalid={!!errors.password}
        >
          <FormLabel mb={0}>Password:</FormLabel>
          {/* Password requirement section */}
          <FormHelperText m={"0px 0px 5px 5px"}>
            You password must have:
            <List>
              <ListItem color={hasLength ? "green.500" : "red.500"}>
                <ListIcon
                  as={hasLength ? AiFillCheckCircle : AiFillCloseCircle}
                  color={hasLength ? "green.500" : "red.500"}
                />
                A minimum of 8 characters
              </ListItem>
              <ListItem color={hasLowercase ? "green.500" : "red.500"}>
                <ListIcon
                  as={hasLowercase ? AiFillCheckCircle : AiFillCloseCircle}
                  color={hasLowercase ? "green.500" : "red.500"}
                />
                A lowercase character
              </ListItem>
              <ListItem color={hasUppercase ? "green.500" : "red.500"}>
                <ListIcon
                  as={hasUppercase ? AiFillCheckCircle : AiFillCloseCircle}
                  color={hasUppercase ? "green.500" : "red.500"}
                />
                An uppercase character
              </ListItem>
              <ListItem color={hasNumber ? "green.500" : "red.500"}>
                <ListIcon
                  as={hasNumber ? AiFillCheckCircle : AiFillCloseCircle}
                  color={hasNumber ? "green.500" : "red.500"}
                />
                A numeric character
              </ListItem>
            </List>
          </FormHelperText>
          <InputGroup> 
            <Input
              type={showPassword ? "text" : "password"}
              bg={"white"}
              placeholder={"Your Password"}
              {...register("password")}
              onChange={handlePasswordChange}
            />
            <ShowPassword show={showPassword} handleShow={() => {setShowPassword(!showPassword)}}/> 
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="confirmPassword"
          mt={"10px"}
          isInvalid={!!errors.confirmPassword}
        >
          <FormLabel>Confirm New Password:</FormLabel>
          <Input
            type={"password"}
            bg={"white"}
            placeholder={"Re-enter Your Password"}
            {...register("confirmPassword")}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button variant={"loginPrimary"} w={"full"} mt={"15px"} type={"submit"}>
          Create Account
        </Button>
      </Container>
    </>
  );
};

export default RegisterForm;
