import React from 'react'
import css from './styles.module.css'

function ColorDisplay({ value }) {
  return (
    <div className={css.colorDisplay}>
      { value }
    </div>
  )
}

export default ColorDisplay
