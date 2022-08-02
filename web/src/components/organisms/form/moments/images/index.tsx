import React, { useEffect, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Map, { GeocoderResult } from '../../../../../hooks/map';

export type Submit = GeocoderResult[];

type Props = Pick<BoxProps, 'sx'> & { loading: boolean; onSubmit: (data: Submit) => void };

export default function MomentImageForm({ loading, onSubmit, sx }: Props) {
  const { autocomplete, getPlace, initAutocomplete, reverseGeocode } = Map.useContainer();
  const ref = useRef<HTMLInputElement>(null);
  const [geocoderResults, setGeocoderResults] = useState<GeocoderResult[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    initAutocomplete({ ref });
  }, [ref]);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', async () => {
        const place = getPlace();
        if (!place) return;
        setGeocoderResults(await reverseGeocode(place));
      });
    }
  }, [autocomplete]);

  const handleSubmit = () => {
    if (geocoderResults.length > 0) onSubmit(geocoderResults);
  };

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth inputRef={ref} label={t('moment.form.label.place')} />
        </Grid>
      </Grid>
      <LoadingButton
        disabled={geocoderResults.length === 0}
        loading={loading}
        onClick={handleSubmit}
      >
        {t('moment.form.button.add')}
      </LoadingButton>
    </Box>
  );
}
