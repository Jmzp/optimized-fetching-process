import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  padding: '0',
  overflow: 'hidden',
});

export const appBar = style({
  background: 'transparent !important',
  boxShadow: 'none !important',
});

export const toolbar = style({
  justifyContent: 'space-between',
  paddingTop: '16px',
  paddingBottom: '16px',
  paddingLeft: '24px',
  paddingRight: '24px',
  '@media': {
    'screen and (max-width: 600px)': {
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
});

export const headerSection = style({});

export const title = style({
  fontWeight: '700 !important',
  color: 'white !important',
  fontSize: '1.5rem !important',
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '1.25rem !important',
    },
  },
});

export const subtitle = style({
  opacity: 0.95,
  color: 'white !important',
  fontSize: '0.875rem !important',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '0.75rem !important',
      maxWidth: '150px',
    },
  },
});

export const logoutButton = style({
  backgroundColor: 'white !important',
  color: '#11998e !important',
  borderRadius: '12px !important',
  textTransform: 'none !important',
  fontWeight: '600 !important',
  paddingLeft: '24px !important',
  paddingRight: '24px !important',
  paddingTop: '8px !important',
  paddingBottom: '8px !important',
  fontSize: '1rem !important',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15) !important',
  '@media': {
    'screen and (max-width: 600px)': {
      paddingLeft: '16px !important',
      paddingRight: '16px !important',
      paddingTop: '6px !important',
      paddingBottom: '6px !important',
      fontSize: '0.875rem !important',
    },
  },
});

globalStyle(`${logoutButton}:hover`, {
  backgroundColor: '#f8f9fa !important',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2) !important',
});

export const logoutIcon = style({
  fontSize: '20px !important',
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '18px !important',
    },
  },
});
