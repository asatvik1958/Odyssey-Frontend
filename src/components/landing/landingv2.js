import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Grid,
  Text,
  Link,
  Button,
  Stack,
  Input,
  Select,
  Checkbox,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { api } from "../actions/api"; // Update this path based on your project structure
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const nav = useNavigate
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("none"); // Default sort order
  const [search, setSearch] = useState(""); //search bar
  const [isWater, setisWater] = useState(true);
  const [isAerial, setisAerial] = useState(true);
  const [isLand, setisLand] = useState(true);
  const auth = JSON.parse(sessionStorage?.auth)


  const fetchAdventures = async () => {
    try {
      const res = await axios.post(api + "/landing");
      setData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const sortData = (data, order) => {
    if (order === "price_low_high") {
      return [...data].sort((a, b) => a.Price - b.Price); // Sort by price
    }
    if (order === "price_high_low") {
      return [...data].sort((a, b) => b.Price - a.Price); // Sort by price
    }
    return data; // No sorting
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleBookNow = (adventure, cost, url, loc, dur) => {
    console.log("Adventure details:", adventure);
    console.log(cost)
    console.log(url)
    sessionStorage.setItem('sport', JSON.stringify(adventure));
    sessionStorage.setItem('cost', JSON.stringify(cost));
    sessionStorage.setItem('url', JSON.stringify(url));
    sessionStorage.setItem('loc', JSON.stringify(loc));
    sessionStorage.setItem('dur', JSON.stringify(dur));
    window.location.href = '/booking';
    // sessionStorage. = 
  };

  const sortedData = sortData(data, sortOrder);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const gosignout = () => {
    sessionStorage?.removeItem('auth')
    sessionStorage?.removeItem('sport')
    sessionStorage?.removeItem('cost')
    sessionStorage?.removeItem('dur')
    sessionStorage?.removeItem('url ')
    sessionStorage?.removeItem('loc')
    window.location.href = '/signin';
  } 
  const goorders = () => {
    window.location.href = '/orders';
  } 

  const goact = () => {
    window.location.href = '/bkords';
  } 



  const filterData = (data, searchQuery, isWater, isAerial, isLand) => {
    let filteredData = data;

    // Filter by search query
    if (searchQuery) {
        filteredData = filteredData.filter((item) =>
            item.Title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Filter by categories (Water, Aerial, Land)
    filteredData = filteredData.filter((item) => {
        if (isWater && (item.Type === "WATER")) return true;
        if (isAerial && (item.Type === "AERIAL")) return true;
        if (isLand && (item.Type === "LAND")) return true;
        return false;
    });

    return filteredData;
};

  const filteredData = filterData(sortedData, search, isWater, isAerial, isLand);

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
        <Input
          placeholder={"Hey "+auth.Fname+ ", How about a Search"}
          bg="white"
          mr={2}
          size="md"
          maxWidth="500px"
          align="center"
          onChange={handleSearchChange}
          border="2px solid"
          borderColor="black"
          focusBorderColor="Green"
        />

        <Menu>
          <MenuButton as={Button} colorScheme="blue" variant="outline" border="2px solid">
            Profile
          </MenuButton>
          <MenuList>
          <MenuGroup title={auth.Fname}>
            </MenuGroup>
            <MenuGroup title="Profile">
              <MenuItem onClick={gosignout}>Signout</MenuItem>
              <MenuItem  onClick={goorders}>Transactions</MenuItem>
              <MenuItem  onClick={goact}>Accepted Transactions</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      <Flex
        bg="white"
        color="black"
        p={4}
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Flex>
          <Select placeholder="Sort by Price" width="200px" mr={4} onChange={handleSortChange} border="2px solid">
            <option value="price_low_high">Low to High</option>
            <option value="price_high_low">High to Low</option>
          </Select>

          <Checkbox
          defaultChecked
            mr={4}
            onChange={() => setisWater(!isWater)}
          >
            Water 🌊 Sports
          </Checkbox>

          
          <Checkbox
          colorScheme="yellow"
          defaultChecked
            mr={4}
            onChange={() => setisAerial(!isAerial)}
          >
            Aerial ⛅️ Sports
          </Checkbox>

          <Checkbox
          colorScheme="green"
          defaultChecked
            mr={4}
            onChange={() => setisLand(!isLand)}
          >
            Land ⛰️ Sports
          </Checkbox>

        </Flex>
      </Flex>

      {/* Main Content Area */}
      <Box p={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}></Flex>

        {/* Adventure Grid */}
        <Box maxW="1300px" mx="auto">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)", // 1 column on small screens
              sm: "repeat(2, 1fr)", // 2 columns on small screens
              md: "repeat(3, 1fr)", // 3 columns on medium screens
              lg: "repeat(4, 1fr)", // 4 columns on large screens
            }}
            gap={6}
          >
            {(filteredData || sortedData)?.map((val) => (
              <Box
                key={val._id} // Ensure to use a unique key if available
                bg="white"
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
                maxW="300px"
                transition="transform 0.2s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Slightly scale up on hover
                  boxShadow: "lg", // Optional: make shadow larger on hover
                }}
              >
                {/* <Image
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Jaguar_at_Edinburgh_Zoo.jpg/300px-Jaguar_at_Edinburgh_Zoo.jpg" ||
                    val.imageUrl ||
                    "https://via.placeholder.com/300?text=Adventure"
                  }
                  alt={""}
                /> */}

                <Image
                  src={
                    val.Url 
                    
                  }
                  width="300px" // You can also use "w" as a shorthand
                  height="200px" // Set height as needed
                  alt={val.Title}
                />
                <Text mt={2} ml={2} fontSize="sm" color="gray.500">
                  Duration: {val.Dur}
                </Text>
                <Box p={4}>
                  <Text fontWeight="bold">{val.Title} </Text>
                  <Text fontSize="sm" color="gray.600">
                    {val.Loc}
                  </Text>

                  <Text mt={2} fontSize="lg" fontWeight="bold" color="#028391">
                    INR {val.Price}
                  </Text>
                  <Flex justify="center" mt={4}>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="orange"
                      variant="outline"
                      mt={4}
                      border="2px solid"
                      onClick={() => handleBookNow(val.Title, val.Price, val.Url, val.Loc, val.Dur)}
                    >
                      Book Now
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      {/* <Box bg="#343a40" color="white" p={3} mt={10}>
        <Text align="center">Made with ❤ by Team Anonymous</Text>
      </Box> */}
    </Box>
  );
}