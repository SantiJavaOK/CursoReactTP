import { Grid, Typography, Box, Toolbar, Paper, Container } from '@mui/material';
import Header from '../../components/header/Header';

const Inicio = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <Container maxWidth="lg">
        <Paper
          sx={{
            mx: 'auto',
            maxWidth: '1200px',
            padding: 4,
            mt: 4,
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              py: 8, // padding vertical interno
              textAlign: 'center',
            }}
          >
            <Grid item xs={12}>
              <Box>
                <Typography variant="h3" component="h1" gutterBottom>
                  Curso React
                </Typography>
                <Typography variant="h5" component="h2" color="text.secondary">
                  Trabajo Final
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Inicio;

