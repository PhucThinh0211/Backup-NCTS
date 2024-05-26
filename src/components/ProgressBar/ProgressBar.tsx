import React from 'react';

import { useNProgress } from '@tanem/react-nprogress';

import { Container } from './Container';
import { Bar } from './Bar';

export const ProgressBar: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      {/*
      This example doesn't use a spinner component so the UI stays
      tidy. You're free to render whatever is appropriate for your
      use-case.
      */}
    </Container>
  )
}