import React, { useState, useEffect } from 'react';
import { Box, Image, Stack, Heading, Text, Button, Flex, Input, VStack, HStack, Grid, Checkbox, useToast, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { ArrowForwardIcon, TimeIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../actions/api';

// Example API endpoint

// Recommended values

export const BookingPage = () => {
  const recommendedHeight = 170; // Example recommended height in cm
  const recommendedWeight = 70;  // Example recommended weight in kg
  const maxMedicalConditions = 100; // Total number of medical conditions

  // Function to calculate height score
  const calculateHeightScore = (height) => {
    if (!height) return 0;
    const heightDeviation = Math.abs(height - recommendedHeight);
    const maxHeightDeviation = 100;
    return Math.max(0, 50 - (heightDeviation / maxHeightDeviation) * 50);
  };

  // Function to calculate weight score
  const calculateWeightScore = (weight) => {
    if (!weight) return 0;
    const weightDeviation = Math.abs(weight - recommendedWeight);
    const maxWeightDeviation = 100;
    return Math.max(0, 50 - (weightDeviation / maxWeightDeviation) * 50);
  };

  // Function to calculate medical condition score based on specified ratios
  const calculateMedicalConditionScore = (medicalConditions) => {
    const conditionScores = {
      heartCondition: 60,
      asthma: 10,
      seizures: 5,
      migraines: 3,
      diabetes: 2,
      highBloodPressure: 10,
      obesity: 8,
      other: 2,
    };

    const numberOfConditions = Object.keys(conditionScores).filter(condition => medicalConditions[condition]).length;
    const totalScore = Object.keys(medicalConditions).reduce((acc, condition) => {
      return acc + (medicalConditions[condition] ? conditionScores[condition] : 0);
    }, 0);

    const score = (totalScore / maxMedicalConditions) * 100; // Score ranges from 0 to 100
    return score;
  };

  // Function to calculate risk factor
  const calculateRiskFactor = (medicalConditions) => {
    const medicalConditionScore = calculateMedicalConditionScore(medicalConditions);
    setrkf(medicalConditionScore);
    return medicalConditionScore;
  };

  // Function to determine risk message and color
  const getRiskAssessment = (riskFactor) => {
    let riskMessage = 'Low Risk';
    let ringColor = 'green.400';

    if (riskFactor >= 60) {
      riskMessage = 'High Risk';
      ringColor = 'red.400';
    } else if (riskFactor >= 30) {
      riskMessage = 'Moderate Risk';
      ringColor = 'yellow.400';
    }

    return { riskMessage, ringColor };
  };

  const [value, setValue] = useState(0);
  const [riskMessage, setRiskMessage] = useState('Low Risk');
  const [ringColor, setRingColor] = useState('green.400');

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
  const [ageError, setAgeError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [rkf, setrkf] = useState(0);

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

  useEffect(() => {
    const riskFactor = calculateRiskFactor(medicalConditions);
    setValue(riskFactor);
    const { riskMessage, ringColor } = getRiskAssessment(riskFactor);
    setRiskMessage(riskMessage);
    setRingColor(ringColor);
  }, [medicalConditions]);

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
    if (value && (value < 54 || value > 190)) {
      setHeightError('Height must be between 54 cm and 190 cm.');
    } else {
      setHeightError('');
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    if (value && (value < 2.1 || value > 100)) {
      setWeightError('Weight must be between 2.1 kg and 100 kg.');
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
    url: url,
    risk: rkf,
  };

  const Booknow = async () => {
    await axios.post(api + "/booking", bookingDetails)
      .then((res) => {
        if (res.data.message) {
          if (!toast.isActive('msg')) {
            toast({
              id: "msg",
              title: "",
              description: 'Booking Successful',
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
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      justify="center"
      minHeight="100vh"
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
        width={{ base: '100%', md: '60%', lg: '50%' }}
        mr={{ lg: 6 }}
      >
        <Stack spacing={4}>
          <Heading size='lg' mb={2}>{sport}</Heading>
          <Text fontSize='md'>
            Please provide below details.
          </Text>

          {/* Requirements Section */}
          <Box mt={6}>
            <Heading size='sm' mb={2}>Requirements</Heading>
            <VStack align='start' spacing={4}>
              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Age:<span style={{ color: 'red' }}>*</span></Text>
                <Input
                  placeholder='Enter your age'
                  size='sm'
                  type='number'
                  value={age}
                  onChange={handleAgeChange}
                  isInvalid={!!ageError}
                />
              </HStack>
              {ageError && <Text color='red.500' fontSize='sm'>{ageError}</Text>}

              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Height (cm):<span style={{ color: 'red' }}>*</span></Text>
                <Input
                  placeholder='Enter your height'
                  size='sm'
                  type='number'
                  value={height}
                  onChange={handleHeightChange}
                  isInvalid={!!heightError}
                />
              </HStack>
              {heightError && <Text color='red.500' fontSize='sm'>{heightError}</Text>}

              <HStack spacing={4}>
                <Text width='120px' fontWeight='semibold'>Weight (kg):<span style={{ color: 'red' }}>*</span></Text>
                <Input
                  placeholder='Enter your weight'
                  size='sm'
                  type='number'
                  value={weight}
                  onChange={handleWeightChange}
                  isInvalid={!!weightError}
                />
              </HStack>
              {weightError && <Text color='red.500' fontSize='sm'>{weightError}</Text>}
            </VStack>
          </Box>

          {/* Health Conditions Section */}
          <Box mt={8}>
            <Heading size='sm' ml={2}>Select which are applicable</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('heartCondition')}>Heart Condition</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('diabetes')}>Diabetes</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('asthma')}>Asthma</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('highBloodPressure')}>High Blood Pressure</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('seizures')}>Epilepsy</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('obesity')}>Obesity</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('migraines')}>Migraines</Checkbox>
              <Checkbox colorScheme='green' onChange={() => handleMedicalConditionChange('other')}>Other</Checkbox>
            </Grid>
          </Box>

          {/* Display Risk Factor */}
          <Box mt={4}>
            <Text fontSize='lg' fontWeight='bold'>Risk Factor Score: {value}</Text>
          </Box>

          {/* Book Now Button */}
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="orange"
            variant="solid"
            mt={4}
            mx="auto"
            borderRadius='md'
            isDisabled={!isFormValid} // Disable button until form is valid
            onClick={Booknow}
          >
            Book Now
          </Button>
        </Stack>
      </Box>

      {/* Flex Container for Risk Factor and Image */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        width={{ base: '100%', md: 'auto' }}
      >
        {/* Risk Factor Section */}
        <Box
          width={{ base: '100%', md: '50%' }}
          mb={{ base: 6, md: 0 }}
          textAlign="center"
        >
          <Heading size='lg' mb={4}>Health Risk Assessment</Heading>
          <VStack>
            <CircularProgress
              value={value}
              size="80"
              thickness="8px"
              color={ringColor}
              trackColor="gray.200"
              capIsRound
            >
              <CircularProgressLabel
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="bold"
                color={ringColor}
                textAlign="center"
              >
                {value}<br />
                {riskMessage}
              </CircularProgressLabel>
            </CircularProgress>
          </VStack>
        </Box>

        {/* Image Section */}
        <Box
          width={{ base: '100%', md: '50%' }}
          textAlign="center"
        >
          <Image
            objectFit='cover'
            maxW='100%'
            height={{ base: '200px', md: 'auto' }}
            src={url}
            alt='Health Risk Assessment'
          />
        </Box>
      </Flex>
    </Flex>
  );
};
