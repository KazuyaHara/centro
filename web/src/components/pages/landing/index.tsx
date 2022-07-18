import React from 'react';

import { Box, Button, Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/images/logo/black-with-tagline.png';

// TODO: Retrieve featured photos of the day from the API
import Sample01 from '../../../assets/images/sample/01.jpeg';
import Sample02 from '../../../assets/images/sample/02.jpeg';
import Sample03 from '../../../assets/images/sample/03.jpeg';
import Sample04 from '../../../assets/images/sample/04.jpeg';
import Sample05 from '../../../assets/images/sample/05.jpeg';
import Sample06 from '../../../assets/images/sample/06.jpeg';
import Sample07 from '../../../assets/images/sample/07.jpeg';
import Sample08 from '../../../assets/images/sample/08.jpeg';
import Sample09 from '../../../assets/images/sample/09.jpeg';
import Sample10 from '../../../assets/images/sample/10.jpeg';

import InfiniteCarousel from '../../organisms/infiniteCarousel';

const images = [
  Sample01,
  Sample02,
  Sample03,
  Sample04,
  Sample05,
  Sample06,
  Sample07,
  Sample08,
  Sample09,
  Sample10,
];

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
  return array;
};

export default function Landing() {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" py={10}>
      <Container>
        <Box
          alt="Centro"
          component="img"
          display="flex"
          mx="auto"
          src={Logo}
          sx={{ maxWidth: { xs: 240, sm: 300 } }}
        />
      </Container>
      <Box mt={3}>
        <InfiniteCarousel imagePaths={shuffle(images)} />
        <InfiniteCarousel imagePaths={shuffle(images)} startOffset={0.5} />
      </Box>
      <Container>
        <Stack alignItems="center" mt={3} spacing={2}>
          <Button color="primary" size="large" variant="contained">
            {t('auth.label.login')}
          </Button>
          <Button component={Link} size="large" to="/signup">
            {t('auth.label.signup')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
