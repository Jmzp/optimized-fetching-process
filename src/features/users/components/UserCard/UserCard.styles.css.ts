import { style } from '@vanilla-extract/css';

export const card = style({
  margin: '8px 16px',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  background: 'white',
  borderRadius: '16px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(17, 153, 142, 0.2)',
    borderColor: '#11998e',
  },
  '@media': {
    'screen and (max-width: 480px)': {
      margin: '6px 8px',
      borderRadius: '12px',
    },
  },
});

export const content = style({
  padding: '16px !important',
  '@media': {
    'screen and (max-width: 480px)': {
      padding: '12px !important',
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '12px',
      marginBottom: '12px',
    },
  },
});

export const avatar = style({
  flexShrink: 0,
  width: '56px !important',
  height: '56px !important',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '48px !important',
      height: '48px !important',
    },
  },
});

export const nameSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  minWidth: 0,
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '6px',
    },
  },
});

export const name = style({
  fontWeight: 600,
  fontSize: '1.1rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
});

export const genderChip = style({
  width: 'fit-content',
  textTransform: 'capitalize',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '6px',
    },
  },
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '8px',
    },
  },
});

export const icon = style({
  color: '#666',
  flexShrink: 0,
});

export const infoText = style({
  color: '#555',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: '0.875rem',
    },
  },
});
