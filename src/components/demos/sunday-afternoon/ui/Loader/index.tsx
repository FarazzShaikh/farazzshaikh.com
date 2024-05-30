import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StartButton } from "./styled";

import { useLoader } from "@/context/LoaderContext";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export function Loader({
  started,
  setStarted,
}: {
  started: boolean;
  setStarted: (started: boolean) => void;
}) {
  const loadingProgress = useLoader((s) => s.progress);

  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (loadingProgress === 1) {
      setTimeout(() => {
        setLoadingDone(true);
      }, 1000);
    }
  }, [loadingProgress]);

  return (
    <>
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0, 0, 0, 1)"
        backdropFilter="blur(10px) opacity(1)"
        animate={{
          backgroundColor: loadingDone
            ? !started
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 1)",
          backdropFilter: !started
            ? "blur(10px) opacity(1)"
            : "blur(30px) opacity(0)",
          "--webkit-backdrop-filter": !started
            ? "blur(10px) opacity(1)"
            : "blur(30px) opacity(0)",
          opacity: !started ? 1 : 0,
          pointerEvents: !started ? "auto" : "none",
        }}
      >
        {!started ? (
          loadingDone ? (
            <StartButton onClick={() => setStarted(true)}>Enter</StartButton>
          ) : (
            <Text
              fontSize="xs" //
              color="white"
              fontFamily="Raleway Variable"
              letterSpacing={5}
              whiteSpace="nowrap"
              position="absolute"
              bottom={4}
              right={4}
            >
              Loading...
            </Text>
          )
        ) : null}

        <MotionBox position="relative" animate={{ opacity: !started ? 1 : 0 }}>
          <Heading
            as="h2" //
            fontFamily="Homemade Apple"
            fontSize="3xl"
            color="white"
            w="full"
            textAlign="center"
            whiteSpace="nowrap"
          >
            Sunday afternoon
          </Heading>
          <Text
            fontSize="md" //
            color="white"
            fontFamily="Raleway Variable"
            letterSpacing={[3, 5]}
            whiteSpace="nowrap"
            position="absolute"
            bottom="0"
            right="50%"
            transform="translate(calc(100% + 1.2rem), 70%)"
            // transform="translate(40%, 70%)"
          >
            by Faraz Shaikh
          </Text>
        </MotionBox>
      </MotionBox>
    </>
  );
}
