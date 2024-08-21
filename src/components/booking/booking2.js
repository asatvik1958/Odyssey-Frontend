import React, { useState } from 'react';
import { Box, Image, Stack, Heading, Text, Button, Flex, Input, VStack, HStack, Grid, Menu, MenuList, MenuGroup, MenuItem, MenuButton, MenuDivider, useToast } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Checkbox } from '@chakra-ui/react';
import { api } from '../actions/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BookingPage = () => {
  const nav = useNavigate();
  const toast = useToast();
  const auth = JSON.parse(sessionStorage?.auth);
  const sport = JSON.parse(sessionStorage?.sport);
  const cost = JSON.parse(sessionStorage?.cost);
  const url = JSON.parse(sessionStorage?.url);
  const loc = JSON.parse(sessionStorage?.loc);
  const dur = JSON.parse(sessionStorage?.dur);

  // State variables to store form data
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalConditions, setMedicalConditions] = useState({
    heartCondition: false,
    highBloodPressure: false,
    asthma: false,
    migraines: false,
    seizures: false,
    diabetes: false,
    obesity: false,
    other: false,
  });

  const [otherPreferences, setOtherPreferences] = useState({
    needGuide: false,
    teamUp: false
  });

  const [ageError, setAgeError] = useState(''); 
  const [heightError, setHeightError] = useState(''); 
  const [weightError, setWeightError] = useState(''); 
  

  const handleMedicalConditionChange = (condition) => {
    setMedicalConditions(prevState => ({
      ...prevState,
      [condition]: !prevState[condition]
    }));
  };

  const handleOtherPreferenceChange = (preference) => {
    setOtherPreferences(prevState => ({
      ...prevState,
      [preference]: !prevState[preference]
    }));
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    if (value && (value < 18 || value > 60)) {
      setAgeError('Age must be between 18 and 60.');
    } else {
      setAgeError('');
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    setHeight(value);
    if (value && (value < 54 || value > 272)) {
      setHeightError('Height must be between 54 cm and 272 cm.');
    } else {
      setHeightError('');
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    if (value && (value < 2.1 || value > 635)) {
      setWeightError('Weight must be between 2.1 kg and 635 kg.');
    } else {
      setWeightError('');
    }
  };

  const bookingDetails = {
    title: sport,
    user: auth.Email,
    cost: cost,
    details: {
      age,
      height,
      weight,
    },
    mch: medicalConditions, 
    preferences: otherPreferences,
    status: "pending",
    url: url
  };

  const Booknow = async () => {
    await axios.post(api + "/booking", bookingDetails)
      .then((res) => {
        if (res.data.message) {
          if (!toast.isActive('msg')) {
            toast({
              id: "msg",
              title: "",
              description: 'Boooking Successful',
              status: 'success',
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
          nav('/orders');
        } else {
          if (!toast.isActive('msg')) {
            toast({
              id: "msg",
              title: res.data.error,
              description: '',
              status: 'warning',
              duration: 2000,
              position: "top",
              isClosable: true,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }

  const isFormValid = age && height && weight && !ageError && !heightError && !weightError;

  const gosignout = () => {
    sessionStorage?.removeItem('auth');
    sessionStorage?.removeItem('sport');
    sessionStorage?.removeItem('cost');
    window.location.href = '/signin';
  };
  return (
    
    <Flex
      direction={{ base: 'column', lg: 'row' }} // Stack vertically on small screens, horizontally on larger screens
      align="center"
      justify="center"
      minHeight="100vh" // Ensures the container takes full viewport height
      bg="gray.50"
      p={4}
    >
      {/* Booking Details Section */}
      <Box
        borderWidth='1px'
        borderRadius='md'
        overflow='hidden'
        boxShadow='md'
        bg='white'
        p={4}
        width={{ base: '100%', md: '60%', lg: '50%' }} // Responsive width
        mr={{ lg: 6 }} // Margin to separate from Riskfactor and Image on larger screens
      >
        <Stack spacing={4}>
          <Heading size='lg' mb={2}>The Perfect Latte</Heading>
          <Text fontSize='md'>
            Experience the best scuba diving adventure with our specially curated packages.
          </Text>

          {/* Requirements Section */}
          <Box mt={6}>
            <Heading size='sm' mb={2}>Requirements</Heading>
            <VStack align='start' spacing={4}>
              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Age:</Text>
                <Input placeholder='Enter your age' size='sm' />
              </HStack>
              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Height:</Text>
                <Input placeholder='Enter your height' size='sm' />
              </HStack>

              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Weight:</Text>
                <Input placeholder='Enter your weight' size='sm' />
              </HStack>
            </VStack>
          </Box>

          {/* Health Conditions Section */}
          <Box mt={8}>
            <Heading size='sm' ml={2}>Select which are applicable</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <Checkbox colorScheme='green'>Heart Condition</Checkbox>
              <Checkbox colorScheme='green'>Diabetes</Checkbox>
              <Checkbox colorScheme='green'>Asthma</Checkbox>
              <Checkbox colorScheme='green'>High Blood Pressure</Checkbox>
              <Checkbox colorScheme='green'>Epilepsy</Checkbox>
              <Checkbox colorScheme='green'>Pregnancy</Checkbox>
              <Checkbox colorScheme='green'>Allergies</Checkbox>
              <Checkbox colorScheme='green'>Other</Checkbox>
            </Grid>
          </Box>

          {/* Book Now Button */}
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="orange"
            variant="solid"
            mt={4}
            mx="auto"
            borderRadius='md'
          >
            Book Now
          </Button>
        </Stack>
      </Box>

      {/* Flex Container for Risk Factor and Image */}
      <Flex
        direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on larger screens
        align="center"
        justify="center"
        width={{ base: '100%', md: 'auto' }} // Responsive width
      >
        {/* Risk Factor Section */}
        <Box
          width={{ base: '100%', md: '50%' }} // Responsive width
          mb={{ base: 6, md: 0 }} // Margin bottom for small screens
          textAlign="center"
        >
          <Heading size='lg' mb={4}>Health Risk Assessment</Heading>
          <Riskfactor max={100} />
        </Box>

        {/* Image Section */}
        <Box
          width={{ base: '100%', md: '50%' }} // Responsive width
          textAlign="center"
        >
          <Image
            objectFit='cover'
            maxW='100%'
            height={{ base: '200px', md: 'auto' }}
            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='Health Risk Assessment'
          />
        </Box>
      </Flex>
    </Flex>
  );
};
