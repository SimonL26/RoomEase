import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const loginPrimary = defineStyle((props) => {
    const { colorScheme: c } = props
    return {
        fontFamily: "sans-serif",
        bg: `${c}`,
        borderRadius: "10px",
        color: "white",

        _hover: {
            bg: `${c}`,
            opacity: "80%",
        },

        _active: {
            bg: `${c}`,
            opacity: "90%"
        }
    }
})

const loginOutline = defineStyle((props) => {
    const { colorScheme: c } = props;
    return {
        fontFamily: "sans-serif",
        border: "2px",
        borderColor: `${c}`,
        borderRadius: "10px",
        color: `${c}`,

        _hover: {
            bg: "whiteAlpha.400"
        },

        _active: {
            opacity: "whiteAlpha.500",
        }
    }
})

export const buttonTheme = defineStyleConfig({
    variants: {
        loginPrimary: loginPrimary,
        loginOutline: loginOutline
    },
    defaultProps: {
        colorScheme: "#14213D",
    }
})