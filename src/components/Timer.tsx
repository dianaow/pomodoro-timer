'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Center, useTheme, useColorModeValue } from '@chakra-ui/react';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes
const TOTAL_TICKS = 12; // Number of tick marks

const Timer: React.FC = () => {
  const theme = useTheme();
  const startButtonColor = useColorModeValue('purple.500', 'purple.200');
  const startButtonHoverColor = useColorModeValue('purple.600', 'purple.300');

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [cycles, setCycles] = useState(0);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return prev
          }
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }

    if (time === 0) {
      if (isWork) {
        setTime(BREAK_TIME);
        setIsWork(false);
      } else {
        setTime(WORK_TIME);
        setIsWork(true);
        setCycles((prevCycles) => prevCycles + 1);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, time, isWork]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWork(true)
    setTime(isWork ? WORK_TIME : BREAK_TIME);
    setCycles(0)
  };

  let percentage =  1 - (time / (isWork ? WORK_TIME : BREAK_TIME));
  

  const renderTicks = () => {
    const ticks = [];
    const padding = 20; // Adjust as needed for padding
  
    for (let i = 0; i < TOTAL_TICKS; i++) {
      const angle = (i * 360) / TOTAL_TICKS;
      const x1 = 150 + (130 - padding) * Math.cos((angle - 90) * (Math.PI / 180));
      const y1 = 150 + (130 - padding) * Math.sin((angle - 90) * (Math.PI / 180));
      const x2 = 150 + (138 - padding) * Math.cos((angle - 90) * (Math.PI / 180));
      const y2 = 150 + (138 - padding) * Math.sin((angle - 90) * (Math.PI / 180));
      const textX = 150 + (120 - padding) * Math.cos((angle - 90) * (Math.PI / 180));
      const textY = 150 + (120 - padding) * Math.sin((angle - 90) * (Math.PI / 180));
  
      ticks.push(
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={theme.colors.white} strokeWidth="2" />
          <text x={textX} y={textY} fill={theme.colors.white} fontSize="10" textAnchor="middle" dominantBaseline="middle">
            {((i * WORK_TIME) / TOTAL_TICKS / 60).toFixed(0)}
          </text>
        </g>
      );
    }
    return ticks;
  };
  

  return (
    <VStack spacing={4} textAlign="center" w="full" maxW="sm" mx="auto" px={4}>
      <Box position="relative" width="300px" height="300px">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="130"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="15"
            fill="none"
          />
          <circle
            cx="150"
            cy="150"
            r="130"
            stroke={theme.colors.purple[500]}
            strokeWidth="15"
            fill="none"
            strokeDasharray={Math.PI * 2 * 130}
            strokeDashoffset={Math.PI * 2 * 130 * percentage}
            strokeLinecap="round"
            transform="rotate(-90 150 150)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          {renderTicks()}
        </svg>
        <Center position="absolute" top="0" left="0" right="0" bottom="0">
          <Text fontSize="4xl" color="white">
            {`${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60).toString().padStart(2, '0')}`}
          </Text>
        </Center>
      </Box>
      <Text fontSize="2xl" color="white">{isWork ? 'Work' : 'Break'} Mode</Text>
      <HStack spacing={4}>
        <Button
          onClick={handleStartPause}
          bg={startButtonColor}
          _hover={{ bg: startButtonHoverColor }}
          color="white"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset} colorScheme="gray">
          Reset
        </Button>
      </HStack>
      <Text fontSize="xl" color="white">Cycles: {cycles}</Text>
    </VStack>
  );
};

export default Timer;
