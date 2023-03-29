import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./themes/Button";

export const theme = extendTheme({
    components: {
        Button: buttonTheme,
    }
})