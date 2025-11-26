import IndicadorPOAForm from '@/components/poa/IndicadorPOAForm'
import React from 'react'

const page = () => {
   const actividades =  [
  { "id": 1, "descripcion": "Taller de capacitación" },
  { "id": 2, "descripcion": "Campaña educativa" }
]
  return (
    <IndicadorPOAForm actividades={actividades}/>
  )
}

export default page