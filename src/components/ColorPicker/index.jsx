import React from 'react'
import css from './styles.module.css'
import ColorDisplay from './ColorDisplay'
import DropdownPicker from './DropdownPicker'
import RGBPicker from './RGBPicker'

function ColorPicker({ value, onChange, colors }) {
  return (
    <div className={css.colorPicker}>
      <div className={css.colorDisplay}>
        <ColorDisplay value={value} />
      </div>
      <div className={css.rgbPicker}>
        <RGBPicker value={value} onChange={onChange} />
      </div>
      <div className={css.dropdownPicker}>
        <DropdownPicker onChange={onChange} colors={colors} />
      </div>
    </div>
  )
}

export default ColorPicker
