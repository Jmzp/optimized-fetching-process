import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  padding: '0',
  overflow: 'hidden',
});
