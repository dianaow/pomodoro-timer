import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from '../components/Timer';
import { theme as mockTheme } from '../../theme';

jest.useFakeTimers();

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useTheme: () => mockTheme,
}));

describe('Timer Component', () => {
  it('renders correctly', () => {
    render(<Timer />);
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Work Mode')).toBeInTheDocument();
  });

  it('starts and pauses the timer', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');
    fireEvent.click(startPauseButton);
    expect(screen.getByText('Pause')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('24:59')).toBeInTheDocument();
    fireEvent.click(startPauseButton);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('resets the timer', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');
    fireEvent.click(startPauseButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(resetButton);
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('switches to break time after work time ends', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');
    fireEvent.click(startPauseButton);
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });
    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByText('Break Mode')).toBeInTheDocument();
  });

  it('increments cycle count after one complete cycle', () => {
    render(<Timer />);
    const startPauseButton = screen.getByText('Start');
    fireEvent.click(startPauseButton);
    // Advance time for work period
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });

    // Advance time for break period
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    const cyclesCounter = screen.getByText('Cycles: 1');
    expect(cyclesCounter).toBeInTheDocument();
  });
});
