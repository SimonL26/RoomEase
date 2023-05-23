import {
  Button,
  Flex,
  VStack,
  Box,
  Container,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../api/authApi";
import useStore from "../store";
import { GenericResponse } from "../api/types";

const verificationSchema = object({
  verificationCode: string().min(1, "Verification Code must not be empty."),
});

type VerificationCodeData = TypeOf<typeof verificationSchema>;

const EmailVerificationPage = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    register,
  } = useForm<VerificationCodeData>({
    resolver: zodResolver(verificationSchema),
  });
  const { verificationCode } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const toast = useToast();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (verificationCode) {
      setValue("verificationCode", verificationCode);
    }
  }, [setValue]);

  const verifyUserEmail = async (data: VerificationCodeData) => {
    // Function that handles user verification code submit.
    try {
      store.setRequestLoading(true);
      const response = await authApi.get<GenericResponse>(
        `auth/verifyemail/${data.verificationCode}`
      );
      store.setRequestLoading(false);
      toast({
        title: "Email successfully verified",
        status: "success",
      });
      navigate("/login");
    } catch (error: any) {
      store.setRequestLoading(false);
      const errMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast({
        title: "Error occurred",
        description: errMessage,
        status: "error",
      });
    }
  };

  const onFormSubmit: SubmitHandler<VerificationCodeData> = (data) => {
    console.log("submitted");
    verifyUserEmail(data);
  };

  return (
    <>
      <Flex justifyContent="center" height={"full"}>
        <VStack
          bg={"#E5E5E5"}
          borderRadius="25px"
          boxShadow={"lg"}
          // boxSize={{ base: "md", lg: "xl", md: "lg" }}
          m={{ base: "50px 0", lg: "75px 0" }}
          w={{ base: "350px", lg: "450px", sm: "350px", md: "400px" }}
        >
          <Container textAlign={"center"}>
            <Text m={"20px 0 10px 0"} fontSize={"50px"}>
              RoomEase
            </Text>
          </Container>

          <Box w={"400px"} pb={"50px"}>
            <Container as={"form"} onSubmit={handleSubmit(onFormSubmit)}>
              <Box textAlign={"center"} mb={"5px"}>
                <Heading fontSize={"20px"} mb={"20px"}>
                  VERIFY YOUR EMAIL
                </Heading>
              </Box>

              <FormControl
                id="verifyEmail"
                isInvalid={!!errors.verificationCode}
              >
                <FormLabel>Enter verification code:</FormLabel>
                <Input
                  {...register("verificationCode")}
                  type={"text"}
                  bg={"white"}
                  name="verificationCode"
                />
                <FormErrorMessage>
                  {errors.verificationCode?.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                variant={"loginPrimary"}
                w={"100%"}
                mt={"10px"}
                type="submit"
                isLoading={store.requestLoading}
              >
                Verify Email
              </Button>
            </Container>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default EmailVerificationPage;
