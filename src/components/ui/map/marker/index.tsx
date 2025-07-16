import React from 'react'
import { Box } from '@mui/material'

interface MarkerProps {
  lat?: number
  lng?: number
  position?: [number, number] | { lat: number; lng: number }
  children?: React.ReactNode
  color?: string
}

export const Marker: React.FC<MarkerProps> = ({ 
  lat, 
  lng, 
  position,
  children, 
  color = '#ff0000' 
}) => {
  // Determine as coordenadas a partir dos props
  let finalLat = lat;
  let finalLng = lng;
  
  if (position) {
    if (Array.isArray(position)) {
      finalLat = position[0];
      finalLng = position[1];
    } else {
      finalLat = position.lat;
      finalLng = position.lng;
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: color,
        borderRadius: '50%',
        border: '2px solid white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: 'white',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      }}
      title={`Lat: ${finalLat}, Lng: ${finalLng}`}
    >
      {children || '📍'}
    </Box>
  )
}
