import React, { useEffect, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Map, { PlaceResultWithId } from '../../../../../hooks/map';

type Props = Pick<BoxProps, 'sx'>;

// type Footprint = {
//   address: { formattedName: string; longName: string; shortName: string };
//   count: number;
//   geoPoint: { latitude: number; longitude: number };
//   placeId: string;
//   types: string[];
// };

export default function MomentImageForm({ sx }: Props) {
  const { autocomplete, getPlaceWithId, initAutocomplete } = Map.useContainer();
  const ref = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState<PlaceResultWithId>();
  const { t } = useTranslation();

  useEffect(() => {
    initAutocomplete({ ref });
  }, [ref]);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', async () => setPlace(await getPlaceWithId()));
    }
  }, [autocomplete]);

  const handleSubmit = () => console.log('place', place);

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth inputRef={ref} label={t('moment.form.label.place')} />
        </Grid>
      </Grid>
      <LoadingButton disabled={!place} onClick={handleSubmit}>
        {t('moment.form.button.add')}
      </LoadingButton>
    </Box>
  );
}
