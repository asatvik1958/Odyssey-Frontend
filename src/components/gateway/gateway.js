import React , { useState }from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { api } from "../actions/api"; 
import { useNavigate} from 'react-router-dom'; 

export function PaymentGateway() {
   // You can set this dynamically as needed
  const [teamWithSomeone, setTeamWithSomeone] = useState(false);
  const toast = useToast();
  const sport = JSON.parse(sessionStorage?.sport);  
  const cost = JSON.parse(sessionStorage?.cost);      
  const url = JSON.parse(sessionStorage?.url);
  const auth = JSON.parse(sessionStorage?.auth);
  const nav = useNavigate();
  const handlePayment = async () => {
    try {
      const response = await axios.post(api + "/payment", {auth,
        teamWithSomeone, sport, cost, url
      });

      if (response.status === 200) {
        toast({
          title: "Payment Successful.",
          description: "Thank you for your purchase.",
          position: 'top',
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        nav('/bkords')
      } else {
        toast({
          title: "Payment Failed.",
          description: "Please try again later.",
          status: "error",
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Payment error: ", error);
      toast({
        title: "Payment Error.",
        description: "An error occurred during the payment process.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      bgImage="url('https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp')"
      bgSize="cover"
      bgPosition="center"
      py={5}
    >
      <Flex justify="center" align="center" minHeight="100vh">
        <Box width={{ base: "full", md: "80%", lg: "50%" }}>
          <Card borderRadius="lg">
            <CardBody p={6}>
              <Stack textAlign="center" mb={4}>
                <Heading as="h3" size="lg">
                  Payment Gateway
                </Heading>
                <Text fontSize="md">Payment</Text>
              </Stack>
              <Text fontWeight="bold" mb={4}>
                Saved cards:
              </Text>

              <SimpleGrid columns={1} spacing={4}>
                <Flex align="center">
                  <Image
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    alt="Mastercard"
                    boxSize="48px"
                  />
                  <Box flex="1" mx={3}>
                    <Input
                      placeholder="Card Number"
                      size="lg"
                      value="**** **** **** 3193"
                      readOnly
                    />
                  </Box>
                  <Button variant="link">Remove card</Button>
                </Flex>

                <Flex align="center">
                  <Image
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="Visa"
                    boxSize="48px"
                  />
                  <Box flex="1" mx={3}>
                    <Input
                      placeholder="Card Number"
                      size="lg"
                      value="**** **** **** 4296"
                      readOnly
                    />
                  </Box>
                  <Button variant="link">Remove card</Button>
                </Flex>
              </SimpleGrid>

              <Text fontWeight="bold" mt={6} mb={4}>
                Add new card:
              </Text>

              <Input
                placeholder="Cardholder's Name"
                size="lg"
                defaultValue="Aditya Satvik"
                mb={4}
              />

              <SimpleGrid columns={3} spacing={4}>
                <Box gridColumn="span 2">
                  <Input
                    placeholder="Card Number"
                    size="lg"
                    defaultValue="1234 5678 1234 5678"
                  />
                </Box>
                <Input placeholder="Expire (MM/YYYY)" size="lg" />
                <Input placeholder="CVV" size="lg" type="password"/>
              </SimpleGrid>

              <Text fontWeight="bold" fontSize="xl" mt={6} textAlign="center">
                Total Cost: {cost}
              </Text>

              <Button colorScheme="green" size="lg" width="full" mt={4} onClick={handlePayment}>
                Checkout
              </Button>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
