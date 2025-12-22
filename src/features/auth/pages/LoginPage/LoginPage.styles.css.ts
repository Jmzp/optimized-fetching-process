import { style, keyframes, globalStyle } from '@vanilla-extract/css';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const gradientShift = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
});

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(-45deg, #667eea, #764ba2, #6B8DD6, #8E37D7)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
});

export const formCard = style({
  padding: '48px 40px',
  width: '100%',
  maxWidth: '420px',
  borderRadius: '16px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  animation: `${fadeIn} 0.6s ease-out`,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
});

export const logoContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
});

export const logo = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
});

export const title = style({
  marginBottom: '12px',
  textAlign: 'center',
  fontWeight: 700,
  color: '#1a1a2e',
});

export const subtitle = style({
  marginBottom: '40px !important',
  textAlign: 'center',
  color: '#6b7280',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const textField = style({});

globalStyle(`${textField} .MuiOutlinedInput-root`, {
  borderRadius: '12px !important',
  backgroundColor: '#f9fafb !important',
});

globalStyle(`${textField} .MuiOutlinedInput-root:hover`, {
  backgroundColor: '#f3f4f6 !important',
});

globalStyle(`${textField} .MuiOutlinedInput-root.Mui-focused`, {
  backgroundColor: 'white !important',
});

export const button = style({
  borderRadius: '12px !important',
  padding: '14px !important',
  fontSize: '16px !important',
  fontWeight: '600 !important',
  textTransform: 'none !important',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4) !important',
});

globalStyle(`${button}:hover:not(:disabled)`, {
  background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%) !important',
  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5) !important',
});

globalStyle(`${button}:disabled`, {
  background: '#e5e7eb !important',
});

export const inputWrapper = style({
  position: 'relative',
});

export const divider = style({
  display: 'flex',
  alignItems: 'center',
  margin: '24px 0',
  color: '#9ca3af',
  fontSize: '14px',
  '::before': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
    marginRight: '16px',
  },
  '::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
    marginLeft: '16px',
  },
});

export const footer = style({
  marginTop: '24px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '14px',
});
