/* global google */
import React, { useEffect, useRef } from 'react';

import { Grid, GridProps, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type PlaceResult = Pick<
  google.maps.places.PlaceResult,
  'address_components' | 'formatted_address' | 'geometry'
>;
type Props = Pick<GridProps, 'sx'>;

export default function MomentImageForm({ sx }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (ref.current) {
      const autocomplete = new google.maps.places.Autocomplete(ref.current);
      autocomplete.setFields(['address_component', 'formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace() as PlaceResult;
        console.log('place', place);
      });
    }
  }, [ref]);

  return (
    <Grid container spacing={3} sx={sx}>
      <Grid item xs={12}>
        <TextField fullWidth inputRef={ref} label={t('moment.form.label.place')} />
      </Grid>
    </Grid>
  );
}
