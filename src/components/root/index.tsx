import {
  Button,
  Heading,
  IconButton,
  Tooltip,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { sendGAEvent } from "@next/third-parties/google";
import React from "react";
import { BsGithub, BsTwitter, BsTwitterX } from "react-icons/bs";
import { PiFileArchiveDuotone, PiMailboxDuotone } from "react-icons/pi";

interface RootProps {
  copy: string;
}

export function Root({ copy }: RootProps) {
  const hobbyWork = new Array(10).fill(0).map((_, i) => ({
    id: i,
    src: "https://picsum.photos/200/300",
  }));

  const professionalWork = new Array(10).fill(0).map((_, i) => ({
    id: i,
    src: "https://picsum.photos/200/300",
  }));

  const scrollContainerRef = React.useRef<HTMLDivElement>(null!);
  const titleContainerRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    // scrollContainerRef.current.scrollTo({
    //   top:
    //     titleContainerRef.current.offsetTop -
    //     (window.innerHeight - titleContainerRef.current.clientHeight) / 2,
    //   behavior: "instant",
    // });
  }, []);

  return (
    <VStack
      w="full"
      h="full"
      overflowY="scroll"
      ref={scrollContainerRef}
      gap="4rem"
      bg="#ece7df"
      justify="center"
      align="center"
    >
      {/* <Flex
        flexWrap="wrap-reverse"
        align="center"
        justify="center"
        gap={2}
        p={2}
        position="relative"
      >
        {hobbyWork.map((work) => (
          <Box key={work.id} w="24%" minW="200px" minH="300px" bg="red.200" />
        ))}

        <HStack
          position="absolute"
          bottom={0}
          right={0}
          transform="translate(-20%, 100%)"
        >
          <Box transform="rotate(180deg)" w={10} h={10}>
            <ArrowSvg width="100%" height="100%" />
          </Box>
          <Text fontFamily="Homemade Apple" fontSize="lg">
            Hobby projects
          </Text>
        </HStack>
      </Flex> */}
      <VStack
        ref={titleContainerRef}
        w="full"
        height="200px"
        textAlign="center"
      >
        <Heading
          as="h1"
          size="2xl"
          fontFamily="Playfair Display"
          fontWeight="extrabold"
          fontStyle="italic"
        >
          Faraz Shaikh
        </Heading>
        <Heading as="h2" size="md" fontFamily="Lato" fontWeight="thin">
          Freelance Web, WebGL & WebXR Developer
        </Heading>
        <VStack>
          <Wrap justify="center">
            <Tooltip label="My Github">
              <IconButton
                as="a"
                href="https://github.com/FarazzShaikh"
                target="_blank"
                aria-label="Github"
                icon={<BsGithub />}
                onClick={() => sendGAEvent({ event: "visit_github" })}
              />
            </Tooltip>
            <Tooltip label="My X (Twitter)">
              <Button
                as="a"
                href="https://x.com/CantBeFaraz"
                target="_blank"
                aria-label="Twitter/X"
                leftIcon={<BsTwitterX />}
                rightIcon={<BsTwitter />}
                alignItems="center"
                onClick={() => sendGAEvent({ event: "visit_twitter" })}
              >
                |
              </Button>
            </Tooltip>
            <Tooltip label="Write me an email!">
              <Button
                leftIcon={<PiMailboxDuotone />}
                as="a"
                href="mailto:farazzshaikh@gmail.com"
                onClick={() => sendGAEvent({ event: "visit_email" })}
              >
                Work with me
              </Button>
            </Tooltip>
            <Tooltip label="Read about my work">
              <Button
                leftIcon={<PiFileArchiveDuotone />}
                as="a"
                href="https://docs.google.com/document/d/1jHKUCCnfx2CJxI1LnYGwItJUBDeiTaf_CqLASPxfPIg/edit"
                target="_blank"
                onClick={() => sendGAEvent({ event: "visit_portfolio" })}
              >
                Portfolio
              </Button>
            </Tooltip>
          </Wrap>
        </VStack>
        <Heading
          as="h2"
          size="sm"
          fontFamily="Lato"
          fontWeight="thin"
          fontStyle="italic"
        >
          {copy}
        </Heading>
      </VStack>
      {/* <Flex
        flexWrap="wrap"
        align="center"
        justify="center"
        gap={2}
        p={2}
        position="relative"
      >
        {professionalWork.map((work) => (
          <Box key={work.id} w="24%" minW="200px" minH="300px" bg="red.200" />
        ))}

        <HStack
          position="absolute"
          top={0}
          left={0}
          transform="translate(10%, -100%)"
        >
          <Text fontFamily="Homemade Apple" fontSize="lg">
            Professional projects
          </Text>
          <Box w={10} h={10}>
            <ArrowSvg width="100%" height="100%" />
          </Box>
        </HStack>
      </Flex> */}
    </VStack>
  );
}
