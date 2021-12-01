import { Box, BoxProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

export function Container({ children, ...rest }: BoxProps): ReactElement {
  return (
    <Box
      maxW={{ base: 'xl', md: '7xl' }}
      px={{ base: '6', md: '8' }}
      mx="auto"
      {...rest}
    >
      {children}
    </Box>
  )
}
