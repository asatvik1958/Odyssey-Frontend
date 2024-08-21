import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";


export function ProfilePage() {
  return (
    <Box bg="gray.100" py={10}>
      <Container maxW="7xl">
        {/* Breadcrumb */}
        <Breadcrumb
          spacing="8px"
          separator=">"
          bg="white"
          p={4}
          borderRadius="lg"
          mb={8}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">User</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">User Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing={8}>
          {/* Profile Section */}
          <VStack spacing={4} align="stretch">
            <Box bg="white" borderRadius="lg" p={6} textAlign="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                mx="auto"
                mb={4}
              />
              <Text fontSize="xl" fontWeight="bold">
                Martina Thomas
              </Text>
              <Text color="gray.500">Full Stack Developer</Text>
              <Text color="gray.500" mb={4}>
                Bay Area, San Francisco, CA
              </Text>
              <HStack justify="center" spacing={4}>
                <Button colorScheme="blue">Follow</Button>
                <Button variant="outline">Message</Button>
              </HStack>
            </Box>

            {/* Contact Information */}
            <Box bg="white" borderRadius="lg" p={0}>
            </Box>
          </VStack>

          {/* User Details */}
          <Box as="section" gridColumn={{ lg: "span 2" }}>
            <Box bg="white" borderRadius="lg" p={6} mb={8}>
              <Stack spacing={4}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Full Name</Text>
                  <Text color="gray.500">Johnatan Smith</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Email</Text>
                  <Text color="gray.500">example@example.com</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Phone</Text>
                  <Text color="gray.500">(097) 234-5678</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Mobile</Text>
                  <Text color="gray.500">(098) 765-4321</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Address</Text>
                  <Text color="gray.500">Bay Area, San Francisco, CA</Text>
                </Flex>
              </Stack>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Project Status */}
              <Box bg="white" borderRadius="lg" p={6}>
                <Text mb={4} fontSize="lg" fontWeight="bold" color="blue.500">
                  <span className="text-primary font-italic">Assignment</span> Project Status
                </Text>

                {["Web Design", "Website Markup", "One Page", "Mobile Template", "Backend API"].map((project, index) => (
                  <Box key={project} mb={4}>
                    <Text mb={2} fontSize="sm">
                      {project}
                    </Text>
                    <Progress
                      borderRadius="lg"
                      value={[80, 72, 89, 55, 66][index]}
                      colorScheme="blue"
                    />
                  </Box>
                ))}
              </Box>

              {/* Duplicate of Project Status */}
              <Box bg="white" borderRadius="lg" p={6}>
                <Text mb={4} fontSize="lg" fontWeight="bold" color="blue.500">
                  <span className="text-primary font-italic">Assignment</span> Project Status
                </Text>

                {["Web Design", "Website Markup", "One Page", "Mobile Template", "Backend API"].map((project, index) => (
                  <Box key={project} mb={4}>
                    <Text mb={2} fontSize="sm">
                      {project}
                    </Text>
                    <Progress
                      borderRadius="lg"
                      value={[80, 72, 89, 55, 66][index]}
                      colorScheme="blue"
                    />
                  </Box>
                ))}
              </Box>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
