import Box from '@mui/material/Box'
import { FC } from 'react'

type Props = {
  onClick?: () => void,
  sty:{ xs: string, md: string }
}

const FullTruckLogo: FC<Props> = ({ onClick,sty }) => {
  return (
    <Box
      component="img"
      sx={{
        height: 20,
        width: 160,
        display: sty, mr: 1 ,
        '&:hover': {
          cursor: onClick ? 'pointer' : 'default',
        },
      }}
      alt="The FullTruck logo"
      src={'./logo.png'}
      onClick={onClick}
    />
  )
}

export default FullTruckLogo
