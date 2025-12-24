import React, { memo } from 'react';
import { Card, CardContent, Avatar, Typography, Box, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { User } from '../../types/user.types';
import * as styles from './UserCard.styles.css.ts';

interface UserCardProps {
  user: User;
  style?: React.CSSProperties;
}

const UserCard = ({ user, style }: UserCardProps) => {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <Card className={styles.card} style={style}>
      <CardContent className={styles.content}>
        <Box className={styles.header}>
          <Avatar
            src={user.picture.thumbnail}
            alt={fullName}
            className={styles.avatar}
          />
          <Box className={styles.nameSection}>
            <Typography variant="h6" className={styles.name}>
              {fullName}
            </Typography>
            <Chip
              label={user.gender}
              size="small"
              color={user.gender === 'male' ? 'primary' : 'secondary'}
              className={styles.genderChip}
            />
          </Box>
        </Box>

        <Box className={styles.infoSection}>
          <Box className={styles.infoRow}>
            <EmailIcon fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.infoText}>
              {user.email}
            </Typography>
          </Box>

          <Box className={styles.infoRow}>
            <PhoneIcon fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.infoText}>
              {user.phone}
            </Typography>
          </Box>

          <Box className={styles.infoRow}>
            <LocationOnIcon fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.infoText}>
              {location}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(UserCard);
