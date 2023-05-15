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
import { Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const verificationSchema = z.object({
  verificationCode: z.string().min(1, "Verification Code must not be empty."),
});

type VerificationCodeData = z.infer<typeof verificationSchema>;

const EmailVerificationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<VerificationCodeData>({
    resolver: zodResolver(verificationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful])

  const verifyUser = async (data: VerificationCodeData) => {
    // Function that handles user verification code submit.
    return;
  }
  
  const onFormSubmit = () => {
    console.log("submitted");
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
            <Container as={"form"} onSubmit={onFormSubmit}>
              <Box textAlign={"center"} mb={"5px"}>
                <Heading fontSize={"20px"} mb={"20px"}>
                  VERIFY YOUR EMAIL
                </Heading>
              </Box>

              <FormControl id="verifyEmail">
                <FormLabel>Enter verification code:</FormLabel>
                <Input
                  type={"text"}
                  bg={"white"}
                  placeholder={"Enter here verification code"}
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
