import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { endpoint } from '@/utils/paths';

export default function BasicCard({ user }) {

  return (
    <Link href={`${endpoint.user}${user.id}`}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
          >
            {user.name}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {user.email}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {user.phone}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {user.website}
          </Typography>
          <Typography variant="body2">
            {user.company.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>

  );
}
