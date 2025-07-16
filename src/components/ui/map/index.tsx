import React from 'react'
import { Box } from '@mui/material'

interface MapProps {
  children?: React.ReactNode
  height?: string | number
  width?: string | number
  zoom?: number
}

export const Map: React.FC<MapProps> = ({ 
  children, 
  height = 300, 
  width = '100%',
  zoom = 10
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      title={`Map zoom: ${zoom}`}
    >
      {children || 'Map Component Placeholder'}
    </Box>
  )
}
