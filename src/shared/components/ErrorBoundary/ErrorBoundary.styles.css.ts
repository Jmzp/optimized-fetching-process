import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '24px',
  textAlign: 'center',
});

export const title = style({
  marginBottom: '16px',
  color: '#d32f2f',
});

export const message = style({
  marginBottom: '24px',
  color: '#666',
  maxWidth: '500px',
});

export const details = style({
  marginTop: '24px',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  maxWidth: '600px',
  overflow: 'auto',
  textAlign: 'left',
  fontSize: '14px',
  fontFamily: 'monospace',
});

export const buttonGroup = style({
  display: 'flex',
  gap: '16px',
  marginBottom: '24px',
});

export const stackTitle = style({
  marginTop: '16px !important',
});
