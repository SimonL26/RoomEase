import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <Grid
      templateAreas={`"main" "subs" "footer"`}
      gridTemplateRows={"30em 20em 100px"}
    >
      <GridItem
        area={"main"}
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      >
        <Header />
      </GridItem>
      <GridItem area={"subs"} bg={"pink.300"}>
        Subsribe
      </GridItem>
      <GridItem area={"footer"} bg={"green.300"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
