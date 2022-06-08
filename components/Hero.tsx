import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import Link from 'next/link'

const Hero = () => {

  return (
    <Box style={{
      backgroundImage: '/assets/qui-som.png'
    }}>
      <Grid container spacing={6} style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1300px',
        padding: '50px',
    }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" >
          Cistelles de fruita i verdura de temporada</Typography>
          <Typography variant="h6">
            Agricultura regenerativa, ecològica i de temporada. Del camp a la taula!
          </Typography>
          <Link href="/subscripcio">
          <a style={{ textDecoration: 'none' }}>
          <Button
            style={{
              color: 'white',
              margin: '30px auto',
              backgroundColor: '#99b67e',
              borderRadius: 30,
              textAlign: 'center',
              padding: 10,
              width: '100%',
              maxWidth: 250,
            }}
            
          >
            Vull cistelles
          </Button>
          </a>
            </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src='assets\cistella-verdura.png' alt="My Team" style={{
              maxWidth:'200px',
            }}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;