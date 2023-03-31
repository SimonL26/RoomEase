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
import { z, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must not be empty"),
  confirmPassword: z.string().min(8, "Must match to password")
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password){
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Password did not match!",
        path: ['confirmPassword']
      })
  }
})

type SignUpFormData = z.infer<typeof signUpSchema>

const RegisterForm = () => {

  const {register, handleSubmit, formState: { errors }} = useForm<SignUpFormData>({resolver: zodResolver(signUpSchema)})

  // function called when submitting the form
  // change when backend developed
  const onSubmit = (data: FieldValues) =>{
    console.log(data)
  }
  return (
    <>
      <Container as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box textAlign={"center"}>
          <Heading fontSize={"20px"}>CREATE ACCOUNT</Heading>
        </Box>

        <FormControl id="signupEmail" isInvalid={!!errors.email}>
          <FormLabel>Email:</FormLabel>
          <Input type={"email"} bg={"white"} placeholder={"Your Email"} {...register("email")}/>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="signupPassword" mt={"10px"} isInvalid={!!errors.password}>
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
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="confirmPassword" mt={"10px"} isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm New Password:</FormLabel>
          <Input
            type={"password"}
            bg={"white"}
            placeholder={"Re-enter Your Password"}
            {...register("confirmPassword")}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
    </>
  );
};

export default RegisterForm;
