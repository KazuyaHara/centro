function pxToRem(value: number) {
  return `${value / 14}rem`;
}

const typography = {
  button: { fontSize: pxToRem(14), fontWeight: 700, textTransform: 'none' },
  fontFamily: "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif",
} as const;

export default typography;
