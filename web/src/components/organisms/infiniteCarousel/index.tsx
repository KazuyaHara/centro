import React, { useEffect, useRef, useState } from 'react';

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

type Props = { imagePaths: Array<string>; startOffset?: 0 | 0.5 | 1 };

export default function InfiniteCarousel({ imagePaths, startOffset = 0 }: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(imagePaths);

  const itemWidth = isMobile ? 150 : 300;
  const spacing = 5;
  const itemWidthWithGap = itemWidth + spacing * 8;
  const itemsWidth = items.length * itemWidthWithGap;

  useEffect(() => {
    const offsetWidth = ref.current?.offsetWidth;
    if (!offsetWidth) return;

    const carouselWidth = offsetWidth + itemWidthWithGap;
    if (itemsWidth < carouselWidth) {
      const lackedItems = Math.floor((carouselWidth - itemsWidth) / imagePaths.length);
      const fillableCount = Math.ceil(lackedItems / imagePaths.length);

      const newItems = [...items];
      [...Array(fillableCount)].forEach(() => newItems.push(...items));
      setItems(newItems);
    }
  }, [ref.current]);

  return (
    <Box alignItems="center" mx="auto" overflow="hidden" ref={ref} width="100%">
      <AnimatePresence>
        <motion.div
          animate={{ x: itemWidthWithGap }}
          onUpdate={(latest) => {
            if (latest.x >= itemWidthWithGap) {
              const newItems = [...items];
              newItems.unshift(items[items.length - 1]);
              newItems.pop();
              setItems(newItems);
            }
          }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
        >
          <Stack
            direction="row"
            my={2}
            spacing={spacing}
            ml={`${itemWidth * -(1 + startOffset)}px`}
            width={itemsWidth}
          >
            {items.map((item) => (
              <Box
                borderRadius={2}
                component="img"
                height={(itemWidth / 3) * 2}
                key={item}
                src={item}
                sx={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))', objectFit: 'cover' }}
                width={itemWidth}
              />
            ))}
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
