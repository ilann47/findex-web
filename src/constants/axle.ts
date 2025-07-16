export interface AxleType {
  id: string
  name: string
  description?: string
}

export const LOCATION_AXLES: AxleType[] = [
  {
    id: 'x',
    name: 'Eixo X',
    description: 'Eixo horizontal'
  },
  {
    id: 'y', 
    name: 'Eixo Y',
    description: 'Eixo vertical'
  },
  {
    id: 'z',
    name: 'Eixo Z', 
    description: 'Eixo de profundidade'
  }
]
