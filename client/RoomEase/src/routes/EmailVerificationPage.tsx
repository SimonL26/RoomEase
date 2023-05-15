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
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../api/authApi";
import { toast } from "react-toastify";

const verificationSchema = z.object({
  verificationCode: z.string().min(1, "Verification Code must not be empty."),
});

type VerificationCodeData = z.infer<typeof verificationSchema>;

const EmailVerificationPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
    setValue,
    register
  } = useForm<VerificationCodeData>({
    resolver: zodResolver(verificationSchema),
  });
  const { verificationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (verificationCode) {
      setValue("verificationCode", verificationCode);
    }
  },  [setValue]);

  const verifyUserEmail = async (data: VerificationCodeData) => {
    // Function that handles user verification code submit.
    try{
      const response = await authApi.get(`auth/verifyemail/${data.verificationCode}`);
      toast.success("Successfully verified", {
        position: "top-right"
      });
      navigate("/login")
    } catch (error: any) {
      const errMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(errMessage, { position: "top-right" });
    }
  }
  
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

              <FormControl id="verifyEmail">
                <FormLabel>Enter verification code:</FormLabel>
                <Input
                  {...register("verificationCode")}
                  type={"text"}
                  bg={"white"}
                  name="verificationCode"
                />
              </FormControl>

              <Button
                variant={"loginPrimary"}
                w={"100%"}
                mt={"10px"}
                type="submit"
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
