import { Head } from '@inertiajs/inertia-react';
import { Button, ButtonGroup, Grid } from '@mui/material';

export default function Movies() {
  return (
    <>
      <Head title="Movies" />
      <Grid container justifyContent={'center'}>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
    </>
  );
}
