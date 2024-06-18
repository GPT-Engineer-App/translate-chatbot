import React, { useState } from "react";
import { Container, VStack, Text, Box, Select } from "@chakra-ui/react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

const Index = () => {
  const [language, setLanguage] = useState("en");

  const handleEnd = async ({ steps, values }) => {
    const newMessage = values[values.length - 1];
    try {
      const response = await axios.post("https://translation.googleapis.com/language/translate/v2", null, {
        params: {
          q: newMessage,
          target: language,
          key: "YOUR_GOOGLE_TRANSLATE_API_KEY",
        },
      });

      const translatedText = response.data.data.translations[0].translatedText;
      alert(`Translated Text: ${translatedText}`);
    } catch (error) {
      console.error("Error translating message:", error);
      alert("Sorry, I couldn't translate that message.");
    }
  };

  const steps = [
    {
      id: "1",
      message: "Type a message and get it translated!",
      trigger: "user-message",
    },
    {
      id: "user-message",
      user: true,
      trigger: "end",
    },
    {
      id: "end",
      message: "Translating...",
      end: true,
    },
  ];

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Language Translation Chatbot</Text>
        <Text>Type a message and get it translated!</Text>
        <Select placeholder="Select language" onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pl">Polish</option>
        </Select>
      </VStack>
      <Box width="100%">
        <ChatBot steps={steps} handleEnd={handleEnd} />
      </Box>
    </Container>
  );
};

export default Index;