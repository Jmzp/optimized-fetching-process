import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '1200px',
  height: 'calc(100vh - 100px)',
  margin: '0 auto',
  padding: '24px',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '24px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const header = style({
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  paddingBottom: '16px',
  borderBottom: '2px solid #e5e7eb',
  flexShrink: 0,
});

export const title = style({
  fontWeight: 700,
  color: '#11998e',
});

export const list = style({
  outline: 'none',
});

export const centerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '20px',
});

export const loadingMore = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 20px',
  background: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '12px',
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  boxShadow: '0 8px 24px rgba(17, 153, 142, 0.3)',
  border: '2px solid #11998e',
  backdropFilter: 'blur(12px)',
});

export const endMessage = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  marginTop: '10px',
  background: 'rgba(17, 153, 142, 0.1)',
  borderRadius: '12px',
  borderTop: '2px solid #11998e',
});
