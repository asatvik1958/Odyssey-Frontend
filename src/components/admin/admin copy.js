import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { api } from "../actions/api"; // Update this path based on your project structure
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  

  const fetchData = async () => {
    try {
      const res = await axios.post(api + "/admin");
      setData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gosignout = () => {
    window.location.href = "/signin";
  };

  return (
    <Box bg="#f8f9fa" minH="100vh">
      {/* Header */}
      <Flex
        bg="white"
        color="black"
        p={4}
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold" mr={3}>
          Odyssey Admin Panel
        </Text>

        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            variant="outline"
            border="2px solid"
            onClick={gosignout}
          >
            Profile
          </MenuButton>
        </Menu>
      </Flex>

      {/* Main Content Area */}
      <Box p={5}>
        <Box maxW="1300px" mx="auto">
          <Flex
            direction="column"
            gap={6} // Space between cards
          >
            {data?.map((val) => (
              <Box
                key={val._id} // Ensure to use a unique key if available
                bg="white"
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.2s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.02)", // Slightly scale up on hover
                  boxShadow: "lg", // Optional: make shadow larger on hover
                }}
              >
                <Flex direction={{ base: "column", md: "row" }}>
                  <Image
                    src={val.url}
                    width="100px" // Adjust width based on screen size
                    height="200x"
                    // height={{ base: "200px", md: "300px" }} // Set height as needed
                    objectFit="cover"
                    alt={val.Title}
                  />

                  <Box p={4} flex="1">
                    <Text fontSize="2xl" fontWeight="bold" color="black">
                      {val.title}
                    </Text>

                    <Text mt={2} fontSize="lg" fontWeight="bold" color="#028391">
                      INR {val.cost}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Email: {val.user}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      Status: {val.status}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
