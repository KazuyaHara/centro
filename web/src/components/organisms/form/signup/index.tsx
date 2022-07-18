/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, BoxProps, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LinkWithEmail } from '../../../../hooks/auth';

export type Submit = LinkWithEmail;
type Props = { loading: boolean; onSubmit: (data: Submit) => void; sx?: BoxProps['sx'] };

export default function SignUp({ loading, onSubmit, sx }: Props) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('auth.error.email.invalid'))
      .required(t('auth.error.email.required')),
    password: yup
      .string()
      .min(6, t('auth.error.password.min'))
      .required(t('auth.error.password.required')),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Submit>({ mode: 'onBlur', resolver: yupResolver(schema) });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sx}>
      <Stack spacing={3}>
        <TextField
          {...register('email')}
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email?.message}
          label={t('auth.label.email')}
          name="email"
          size="small"
          type="email"
        />
        <TextField
          {...register('password')}
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password?.message}
          label={t('auth.label.password')}
          size="small"
          type="password"
        />
      </Stack>

      <LoadingButton
        fullWidth
        loading={loading}
        size="large"
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
      >
        {t('auth.label.signup')}
      </LoadingButton>
    </Box>
  );
}
