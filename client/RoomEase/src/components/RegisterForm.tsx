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
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { z, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import axios from 'axios';

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
    formState: { errors },
    reset
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });
  const [hasLength, setHasLength] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterFailed, setRegisterFailed] = useState(false);


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

  const resetRequirementStates = () =>{
    setHasLength(false);
    setHasLowercase(false);
    setHasUppercase(false);
    setHasNumber(false);
  }

  const onSubmit = (data: FieldValues) => {
    // function called when submitting the sign up form
    const api_url = "http://localhost:5000/api/auth/signup";
    // use axios to send post request
    axios
      .post(api_url, { email: data.email, password: data.password })
      .then((res) => {
        // if the response is 200 therefore success, 
        if (res.status == 200) {
          //set the success state to true
          //such that the alert is visible by the user
          setRegisterSuccess(true);
          // handle redirect to /login page.
        }
        console.log("then", res);
      })
      .catch((err) => {
        if (err.response) {
          setRegisterFailed(true)
          setErrorMessage(err.response.data.message)
        } else if (err.request) {
          console.log("caught request error", err.request);
        } else {
          console.log("Error:", err.message);
        }
      });
    resetRequirementStates();
    reset();
  };

  const onSuccessAlertClose = () => {
    // function that handles the close button of the alert box
    setRegisterSuccess(false)
  }

  const onFailAlertClose = () => {
    // function that handles the close button of the alert box
    setRegisterFailed(false)
  }

  return (
    <>
      <Container as={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/*Alert box for the failed registration */}
        <Alert status="error" mb={"10px"} display={isRegisterFailed ? "flex" : "none"}>
          <AlertIcon />
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
          <CloseButton right={-5} position={"relative"} onClick={onFailAlertClose}/>
        </Alert>
        {/*Alert box for the successful registration, displays none if the state is false.*/}
        <Alert status="success" mb={"10px"} display={isRegisterSuccess ? "flex" : "none"}>
          <AlertIcon />
          <AlertDescription>
          Successfully registered
          </AlertDescription>
          <CloseButton right={-5} position={"relative"} onClick={onSuccessAlertClose}/>
        </Alert>
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
          <Input
            type={"password"}
            bg={"white"}
            placeholder={"Your Password"}
            {...register("password")}
            onChange={handlePasswordChange}
          />
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
