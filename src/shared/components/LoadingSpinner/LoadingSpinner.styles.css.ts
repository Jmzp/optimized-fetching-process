import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  gap: '16px',
});

export const spinner = style({
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #11998e',
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const text = style({
  fontFamily: 'Poppins, sans-serif',
  color: '#11998e',
  fontSize: '1rem',
  fontWeight: 500,
});
