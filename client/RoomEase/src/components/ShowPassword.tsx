import { Button, Icon, InputRightElement } from "@chakra-ui/react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

interface Props{
    show: boolean,
    handleShow: () => void
}

const ShowPassword = ({show, handleShow}: Props) => {
  return (
    <>
    <InputRightElement width='3.0rem'>
        <Button h='1.75rem' size='sm' onClick={handleShow}>
            <Icon as={show ? AiFillEye : AiFillEyeInvisible} color={"black"}/>
        </Button>
    </InputRightElement>
    </>
  )
}

export default ShowPassword