import React from 'react';
import { Box, Button, Center, Container, Heading, Stack, Text, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Typewriting keyframes for title animation
const typewriting = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: black; }
`;

// Animation styles for title
const titleAnimation = `${typewriting} 3s steps(20, end), ${blinkCursor} .75s step-end infinite`;

// Pop-up keyframes for buttons
const popUp = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Pop-up animation for buttons
const popUpAnimation = `${popUp} 0.7s ease-in-out`;

export function WelcomePage() {
    const gosignin = () => {
        nav('/signin')
      }
      const gosignup = () => {
        nav('/signup')
      }
      const nav = useNavigate()
  return (
    
    <Box bg="url('https://wallpaper.forfun.com/fetch/45/4551fd83a58652829cebc1face609823.jpeg')" color="white" minH="100vh" py={20}>
      <Container maxW="container.md" textAlign="center">
        {/* Title with typewriting effect */}
        <Heading
          as="h1"
          fontSize="6xl"
          mb={4}
          whiteSpace="nowrap"
          overflow="hidden"
          borderRight="0.15em solid"
          animation={titleAnimation}
          w="fit-content"
          mx="auto"
        
        >
          Odyssey
        </Heading>

        {/* Caption */}
       
        <Text fontSize="2xl" mb={10} mt={10} mr={10} color="white">
          Our venture for your adventure
        </Text>

        {/* Buttons */}
        <Stack direction="row" spacing={4} justify="center">
          <Button
            size="lg"
            colorScheme="blue"
            variant="outline"
            border="2px "
            onClick={gosignin}  
            onMouseEnter={(e) => e.target.style.animation = popUpAnimation}
            onMouseLeave={(e) => e.target.style.animation = 'none'}
          >
            New Adventure
          </Button>
          <Button
            size="lg"
            variant="outline"
            colorScheme="orange"
            onClick={gosignup}
            onMouseEnter={(e) => e.target.style.animation = popUpAnimation}
            onMouseLeave={(e) => e.target.style.animation = 'none'}
          >
            Create an account
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
