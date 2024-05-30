import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import PlayingLottie from "./Animation - 1716739555712.json";

import Lottie from "react-lottie";

export function Info() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      {!infoOpen && (
        <HStack p={4} w="full" justify="space-between">
          <Link isExternal href="https://www.youtube.com/watch?v=E_xhCJtoW-8">
            <VStack align="flex-start" gap={0}>
              <Text
                fontSize="2xs" //
                color="white"
                fontFamily="Raleway Variable"
                letterSpacing={2}
              >
                The Caretaker: Late afternoon drifting (Cover)
              </Text>
              <HStack>
                <Text
                  fontSize="2xs" //
                  color="white"
                  fontFamily="Raleway Variable"
                  letterSpacing={2}
                  textDecoration="underline"
                  textUnderlineOffset={3}
                >
                  imheartaches
                </Text>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: PlayingLottie,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={30}
                  width={60}
                />
              </HStack>
            </VStack>
          </Link>

          <Tooltip label={"Tell me more"}>
            <IconButton
              size="xs"
              icon={<BsInfoCircleFill />}
              aria-label={"Open Info"}
              onClick={() => setInfoOpen((prev) => !prev)}
            />
          </Tooltip>
        </HStack>
      )}

      <Drawer isOpen={infoOpen} onClose={() => setInfoOpen(false)} size="sm">
        <DrawerOverlay zIndex="10" />
        <DrawerContent
          bgColor="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(10px) opacity(1)"
          color="white"
          zIndex="20"
        >
          <DrawerCloseButton color="white" />

          <DrawerBody p={6}>
            <VStack align="flex-start" fontFamily="Raleway Variable">
              <Heading as="h2" size="lg" fontFamily="Homemade Apple">
                About
              </Heading>
              <Text>
                An exploration of shadows and light in WebGL based on a
                photograph I took during a vacation to Ooty, Tamil Nadu, India
                in 2021.
              </Text>
              <Image
                float="right"
                src="/images/sunday-afternoon/image.png"
                alt="A wooden floor with a shadow of a window"
                w="50%"
              />
              <Text>Shadows and light have always fascinated me.</Text>
              <Heading as="h2" size="lg" fontFamily="Homemade Apple">
                Credits
              </Heading>
              <UnorderedList styleType="'- '">
                <ListItem>
                  Wooden Floor Textures by{" "}
                  <Link
                    color="teal.500"
                    isExternal
                    href="https://quixel.com/megascans/home?category=surface&search=wooden&assetId=vl4jfhbfw"
                  >
                    Quixel Megascans
                  </Link>
                </ListItem>
                <ListItem>
                  Animated Cat model by{" "}
                  <Link
                    color="teal.500"
                    isExternal
                    href="https://sketchfab.com/3d-models/cat-fat-cbb45602331f4ccf9f230634ac257cde"
                  >
                    @billl90 from Sketchfab
                  </Link>
                </ListItem>
                <ListItem>
                  Background music by{" "}
                  <Link
                    color="teal.500"
                    isExternal
                    href="https://www.youtube.com/watch?v=E_xhCJtoW-8"
                  >
                    imheartaches on YouTube
                  </Link>
                </ListItem>
              </UnorderedList>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
