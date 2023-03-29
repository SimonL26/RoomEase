import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container, Box, Text } from "@chakra-ui/react";

const NotFoundErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container centerContent maxW={"container.xl"}>
        <Box>
          <Text fontSize={"5xl"} as="b">
            {error.status} {error.statusText}
          </Text>
        </Box>
        <Box>
          {error.error?.message && (
            <Text fontSize={"4xl"}>Oops! {error.error.message}</Text>
          )}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxW={"container.md"}>
        <Text fontSize={"5xl"} as="b">
          Oops! An unexpected error has occur
        </Text>
      </Container>
    );
  }
};

export default NotFoundErrorPage;
