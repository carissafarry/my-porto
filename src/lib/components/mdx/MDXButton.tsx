'use client';

import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export default function MDXButton({ text }: { text: string }) {
  const [toggle, setToggle] = useState(false);

  return (
    <Button colorScheme="facebook" onClick={() => setToggle(!toggle)}>
      {toggle ? text : 'Click Me'}
    </Button>
  );
}
