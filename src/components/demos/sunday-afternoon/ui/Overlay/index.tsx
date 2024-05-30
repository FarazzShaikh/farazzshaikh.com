import {
  Button,
  HStack,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  BsArrowUpRightSquareFill,
  BsGithub,
  BsTwitter,
  BsTwitterX,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Info } from "./Info";
import { OverlayContainer } from "./styled";
export function Overlay({ started }: { started: boolean }) {
  return (
    <OverlayContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 2, delay: 3.5 }}
    >
      <Info />

      <VStack
        align="flex-start" //
        position="absolute"
        bottom={[10, 10, 20]}
        left={["50%", "50%", 20]}
        transform={["translateX(-50%)", "translateX(-50%)", "none"]}
      >
        <Text
          fontSize="xs" //
          color="white"
          fontFamily="Raleway Variable"
          letterSpacing={5}
        >
          Faraz Shaikh /
        </Text>
        <Heading
          as="h2" //
          fontFamily="Homemade Apple"
          fontSize="2xl"
          color="white"
          w="full"
          textAlign="center"
        >
          Sunday afternoon
        </Heading>

        <HStack mt={2} w="full">
          <Tooltip label="My Github">
            <IconButton
              as="a"
              href="https://github.com/FarazzShaikh"
              target="_blank"
              size="xs"
              aria-label="Github"
              icon={<BsGithub />}
            />
          </Tooltip>

          <Tooltip label="My X (Twitter)">
            <Button
              as="a"
              href="https://x.com/CantBeFaraz"
              target="_blank"
              size="xs"
              aria-label="Twitter/X"
              leftIcon={<BsTwitterX />}
              rightIcon={<BsTwitter />}
              alignItems="center"
            >
              |
            </Button>
          </Tooltip>

          <Tooltip label="See my Portfolio">
            <Button
              as="a"
              href="https://docs.google.com/document/d/1jHKUCCnfx2CJxI1LnYGwItJUBDeiTaf_CqLASPxfPIg/edit"
              target="_blank"
              flex="1"
              size="xs"
              leftIcon={<BsArrowUpRightSquareFill />}
            >
              Portfolio
            </Button>
          </Tooltip>
          <Tooltip label="Send me an email!">
            <Button
              as="a"
              href="mailto:farazzshaikh@gmail.com"
              target="_blank"
              flex="1"
              size="xs"
              leftIcon={<MdEmail />}
            >
              Hire me
            </Button>
          </Tooltip>
        </HStack>
      </VStack>
    </OverlayContainer>
  );
}
