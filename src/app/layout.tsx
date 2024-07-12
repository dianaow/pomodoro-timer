'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Inter } from "next/font/google";
import { theme } from '../../theme';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
