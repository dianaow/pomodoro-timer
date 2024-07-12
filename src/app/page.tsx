import { Box, Text } from '@chakra-ui/react';
import Timer from '../components/Timer';

const Home: React.FC = () => {
  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="3xl"  mb={10}>Pomodoro Timer</Text>
      <Timer />
    </Box>
  );
};

export default Home;
