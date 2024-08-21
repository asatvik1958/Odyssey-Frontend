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
  MenuList,
  MenuItem,
  Select,
  Badge
} from "@chakra-ui/react";
import { api } from "../actions/api"; // Update this path based on your project structure
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(""); // State to store selected status

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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return <Badge colorScheme="green" fontSize="lg">Accepted</Badge>;
      case "pending":
        return <Badge colorScheme="yellow" fontSize="lg">Pending</Badge>;
      case "Rejected":
        return <Badge colorScheme="red" fontSize="lg">Rejected</Badge>;
      default:
        return <Badge colorScheme="gray" fontSize="lg">Unknown</Badge>;
    }
  };

  // Function to handle saving the selected status to the database
  const saveStatus = async (id, status) => {
    console.log(id)
    try {
      await axios.post(api + "/status", { id:id, status:status
         // Pass the selected status
      });
      alert("Status updated successfully!");
      fetchData(); // Refresh data after updating status
    } catch (e) {
      console.log(e);
      alert("Failed to update status.");
    }
  };

  const getRiskColor = (risk) => {
    if (risk >= 0 && risk <= 20) {
      return "green";
    } else if (risk >= 21 && risk <= 60) {
      return "blue";
    } else if (risk >= 61 && risk <= 90) {
      return "orange";
    } else if (risk >= 91 && risk <= 100) {
      return "red";
    } else {
      return "gray";
    }
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
          Odyssey Moderator Panel
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
            {data?.map(val => (
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
                    width="400px" // Adjust width based on screen size
                    height="300px"
                    objectFit="cover"
                    alt={val.Title}
                  />

                  <Box p={4} flex="1">
                    <Text fontSize="2xl" fontWeight="bold" color="black">
                      {val.title}
                    </Text>

                    <Text mt={2} fontSize="lg" fontWeight="bold" color="#028391">
                    ₹{val.cost}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                      Email: {val.user}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      Status: {getStatusBadge(val.status)}
                    </Text>

                    <Text fontSize="lg" color={getRiskColor(val.risk)}>
                      Risk: {val.risk}
                    </Text>

                    {/* Dropdown menu for changing status */}
                    <Select
                      placeholder="Select status"
                      mt={4}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </Select>

                    {/* Button to save the status */}
                    <Button
                      mt={4}
                      colorScheme="blue"
                      onClick={() => saveStatus(val.user, status)} // Pass the current item's ID
                    >
                      Save Status
                    </Button>
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
