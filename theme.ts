import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#1a202c', // Dark background color
        color: 'white',
      },
    },
  }
});
