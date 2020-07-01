import { useState } from 'react'

export function useFormField(initialState) {
  const [formField, setFormField] = useState(initialState)

  return [formField, function(event) {
    setFormField({...formField, [event.target.id]: event.target.value})
  }]
}