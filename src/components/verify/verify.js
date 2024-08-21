import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { api } from "../actions/api"; 

export function Verify() {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const ospdmail = JSON.parse(sessionStorage?.ospdmail)

  // Send POST request to get the OTP on page load
  useEffect(() => {
    const fetchOtp = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(api + "/otp", {Email: ospdmail
        });
        setGeneratedOtp(response.data.otp); // Assuming the OTP is returned in the response as "otp"
        toast({
          title: "OTP Sent!",
          description: "Please check your message for the OTP.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error fetching OTP:", error);
        toast({
          title: "Error",
          description: "Failed to send OTP. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOtp();
  }, [toast]);

  // Handle OTP input
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  // Validate OTP
  const validateOtp = () => {
    if (otp === generatedOtp) {
      toast({
        title: "OTP Validated",
        description: "Your OTP is correct!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = "/gateway" ;
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box p={8} maxW="400px" borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg">
        <Stack spacing={4}>
          <Heading textAlign="center" fontSize="2xl">Enter OTP</Heading>
          <Text textAlign="center" type= "text">Please enter the OTP sent to your registered number.</Text>
          <NumberInput
            onChange={handleOtpChange}
            value={otp}
            maxLength={6}
            placeholder="Enter OTP"
          >
            <NumberInputField />
          </NumberInput>
          <Button
            colorScheme="blue"
            onClick={validateOtp}
            isLoading={isLoading}
            loadingText="Validating"
          >
            Validate OTP
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
