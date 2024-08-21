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
import { api } from "../actions/api"; // Update this path based on your project structure
import { useNavigate } from "react-router-dom";

export function BookedOrdersPage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const auth = JSON.parse(sessionStorage?.auth);
  const path = "" 
  sessionStorage.setItem('orderspd', '');

  const fetchAdventures = async () => {
    try {
      const res = await axios.post(api + "/bkords");
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

  const getStatusBadge = (t, p) => {
    if (t === true && p === false) {
      return <Badge colorScheme="purple" fontSize="lg">Pending for Team up</Badge>;
    } else if (t === true && p === false) {
      return <Badge colorScheme="orange" fontSize="lg">Teamed up</Badge>;
    } else if (t === false) {
      return <Badge colorScheme="green" fontSize="lg">Not requested for team up</Badge>;
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
              <MenuItem>Payments</MenuItem>
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
            {data?.filter((val) => val.auth.Email === auth.Email).map((val) => (
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
                  src={val.sptrl}
                  width="300px"
                  height="150px"
                  alt={val.title}
                  borderRadius="md"
                />
                <Flex direction="column" ml={4} justifyContent="space-between" flex="1">
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color="black">
                      {val.sport}
                    </Text>
                    <Text mt={2} fontSize="lg" color="gray.600">
                      INR {val.cost}
                    </Text>
                    <Text mt={2} fontSize="lg" color="gray.600">
                      Booking ID: {val._id}
                    </Text>
                  </Box>
                  <Flex alignItems="center" justifyContent="space-between" mt={4}>
                    {getStatusBadge(val.team, val.paired)}
                  </Flex>
                </Flex>
                {/* Placeholder Image */}
                <Image
                
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Booking ID: ${val._id}`}
                  width="150x"
                  height="150px"
                  alt="Placeholder"
                  borderRadius="md"
                  ml={4}
                />
              </Flex>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
