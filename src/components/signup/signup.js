import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Heading,
  ButtonGroup,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Checkbox,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../actions/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const nav = useNavigate();
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Age, setAge] = useState('');
  const [Mnum, setMnum] = useState('');
  const [Email, setEmail] = useState('');
  const [Pwd, setPassword] = useState('');
  const [Gen, setGender] = useState('male');
  
  // To check whether t and c are checked
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // send mail on success   
  // Password show and hide visibility
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Navigators
  const gosignin = () => {
    nav('/signin');
  };

  // Toast
  const toast = useToast();

  // Validate form
  const validateForm = () => {
    // Age validation (between 18 and 60)
    if (Age < 18 || Age > 60) {
      if (!toast.isActive('msg')) {
        toast({
          id: 'msg',
          title: 'Invalid Age',
          description: 'Age must be between 18 and 60.',
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true,
        });
      }
      return false;
    }

    // Mobile number validation (must contain exactly 10 digits)
    if (!/^\d{10}$/.test(Mnum)) {
      if (!toast.isActive('msg')) {
        toast({
          id: 'msg',
          title: 'Invalid Mobile Number',
          description: 'Mobile number must contain exactly 10 digits.',
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true,
        });
      }
      return false;
    }

    // Email validation (must contain @gmail.com)
    if (!/^[\w._%+-]+@gmail\.com$/.test(Email)) {
      if (!toast.isActive('msg')) {
        toast({
          id: 'msg',
          title: 'Invalid Email Address',
          description: 'Email must end with @gmail.com.',
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true,
        });
      }
      return false;
    }

    // General required fields check
    if (!Fname || !Lname || !Age || !Mnum || !Email || !Pwd || !isChecked) {
      if (!toast.isActive('msg')) {
        toast({
          id: 'msg',
          title: 'All fields are required.',
          description: 'Please fill in all fields.',
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true,
        });
      }
      return false;
    }
    
    return true;
  };

  const Signup = async () => {
    if (validateForm()) {
      await axios.post(api + '/signup', { Fname, Lname, Age, Mnum, Email, Pwd, Gen })
        .then((res) => {
          if (res.data.message) {
            nav('/signin');
          } else {
            if (!toast.isActive('msg')) {
              toast({
                id: 'msg',
                title: res.data.error,
                description: '',
                status: 'warning',
                duration: 2000,
                position: 'top',
                isClosable: true,
              });
            }
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="blue.50"
      p={4}
    >
      <Card
        w={{ base: '90%', sm: '600px' }}
        maxH="95vh"
        p={6}
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(25px)"
        borderRadius="20px"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <CardHeader>
          <Heading size="md" textAlign="center" mb={4}>
            Sign Up
          </Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="Aditya" onChange={(e) => setFname(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Annapantula" onChange={(e) => setLname(e.target.value)} />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={2}>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input type="number" placeholder="18" onChange={(e) => setAge(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftAddon>+91</InputLeftAddon>
                <Input type="number" placeholder="8247741411" onChange={(e) => setMnum(e.target.value)} />
              </InputGroup>
            </FormControl>
          </SimpleGrid>

          <FormControl mb={4} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl as="fieldset" mb={4} isRequired>
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup onChange={setGender} value={Gen} defaultValue="male">
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl mb={4}>
            <Checkbox onChange={handleCheckboxChange} isChecked={isChecked} isRequired>
              I agree to the <Text as="span" color="blue.500">Terms and Conditions</Text>
            </Checkbox>
          </FormControl>

          <FormControl mb={4}>
            <ButtonGroup width="100%" spacing="0">
              <Button colorScheme="blue" width="100%" variant={'outline'} isDisabled={!isChecked} onClick={Signup}>
                Sign Up
              </Button>
            </ButtonGroup>
            <Text textAlign="center" width="100%" p={1}>
              Already have an account? <Button variant="link" colorScheme="blue" onClick={gosignin}>Sign In</Button>
            </Text>
          </FormControl>
        </CardBody>
      </Card>
    </Box>
  );
};
