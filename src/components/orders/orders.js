import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Badge,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { api } from "../actions/api"; // Update this path based on your project structure
import { useNavigate } from "react-router-dom";

export function OrderPage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // Search bar
  const auth = JSON.parse(sessionStorage?.auth);
  sessionStorage.setItem('orderspd', '')  
  // const orderspd = JSON.parse(sessionStorage?.orderspd);

  const fetchAdventures = async () => {
    try {
      const res = await axios.post(api + "/orders");
      setData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const gosignout = () => {
    sessionStorage?.removeItem("auth");
    sessionStorage?.removeItem("sport");
    sessionStorage?.removeItem("cost");
    sessionStorage?.removeItem("dur");
    sessionStorage?.removeItem("url");
    sessionStorage?.removeItem("loc");
    window.location.href = "/signin";
  };

  const gohome = () => {
  
    window.location.href = "/landing";
  };


  const gobook = (em, it, co) => {
    sessionStorage.setItem("ospdmail", JSON.stringify(em) )
    sessionStorage.setItem("ospditem", it )
    sessionStorage.setItem("ospdcost", co )
    // sessionStorage?.removeItem("auth");
    // sessionStorage?.removeItem("sport");
    // sessionStorage?.removeItem("cost");
    // sessionStorage?.removeItem("dur");
    // sessionStorage?.removeItem("url");
    // sessionStorage?.removeItem("loc");
    window.location.href = "/verify";
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
          Odyssey
        </Text>

        <Menu>
          <MenuButton as={Button} colorScheme="blue" variant="outline" border="2px solid">
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title={auth.Fname}></MenuGroup>
            <MenuGroup title="Profile">
              <MenuItem onClick={gosignout}>Signout</MenuItem>
              <MenuItem onClick={gohome}>Home</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>

      {/* Main Content Area */}
      <Box p={5}>
        <Box maxW="1300px" mx="auto">
          <Stack spacing={6}>
            {data?.filter((val) => val.user === auth.Email).map((val) => (
              <Flex
                key={val._id}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.2s ease-in-out"
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "lg",
                }}
                direction="row"
                p={4}
              >
                <Image
                  src={val.url}
                  width="300px"
                  height="150px"
                  alt={val.title}
                  borderRadius="md"
                />
                <Flex direction="column" ml={4} justifyContent="space-between" flex="1">
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color="black">
                      {val.title}
                    </Text>
                    <Text mt={2} fontSize="lg" color="gray.600">
                      INR {val.cost}
                    </Text>
                  </Box>
                  <Flex alignItems="center" justifyContent="space-between" mt={4}>
                    
                    {getStatusBadge(val.status)}
                    {val.status === "Accepted" && (
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => gobook(val.user, val.title, val.cost)}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        Proceed to Book
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
