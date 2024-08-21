import React, { useState } from "react";
import { Box, Button, Checkbox, Flex, Text, useToast , Image} from "@chakra-ui/react";
import axios from "axios";
import { api } from "../actions/api"; 
import { useNavigate } from 'react-router-dom'; 

export const PaymentPage = () => {
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
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box
        width="300px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="6"
        boxShadow="lg"
      >
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Pay Now
        </Text>
        <Image
                  src={url}
                  width="300px"
                  height="150px"
                  alt={sport}
                  borderRadius="md"
                />
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          {sport}
        </Text>
        <Text mb="4" fontSize="lg" fontWeight="bold">Price: ₹{cost}</Text>

        <Checkbox
          isChecked={teamWithSomeone}
          onChange={(e) => setTeamWithSomeone(e.target.checked)}
          mb="4"
        >
          Team me with someone
        </Checkbox>

        <Button colorScheme="green" width="full" variant="outline" onClick={handlePayment}>
          Pay Now
        </Button>
      </Box>
    </Flex>
  );
};
