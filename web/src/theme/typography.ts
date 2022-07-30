function pxToRem(value: number) {
  return `${value / 14}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': { fontSize: pxToRem(sm) },
    '@media (min-width:900px)': { fontSize: pxToRem(md) },
    '@media (min-width:1200px)': { fontSize: pxToRem(lg) },
  };
}

const typography = {
  body1: { fontSize: pxToRem(16) },
  body2: { fontSize: pxToRem(14) },
  button: { fontSize: pxToRem(14), fontWeight: 700, textTransform: 'none' },
  h1: {
    fontSize: pxToRem(16),
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 24, md: 24, lg: 24 }),
  },
  subtitle1: { fontSize: pxToRem(16), fontWeight: 600 },
  subtitle2: { fontSize: pxToRem(14), fontWeight: 600 },
  fontFamily: "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif",
} as const;

export default typography;
