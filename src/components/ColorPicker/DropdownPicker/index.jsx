import React, { useState, useEffect, useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import css from './styles.module.css'

function Button({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={isOpen ? css.buttonOpen : css.button}
      onClick={onClick}
    />
  )
}

function ColorOption({ label, value, handleClick }) {
  return (
    <button
      type="button"
      onClick={() => handleClick(value)}
      className={css.colorOption}
    >
      <div className={css.colorOptionLabel}>{label}</div>
      <div className={css.colorOptionPreview} style={{ backgroundColor: value }} />
    </button>
  )
}

function Dropdown({ colors, handleColorPick }) {
  return (
    <div className={css.dropdown}>
      {colors.map(color => (
        <ColorOption key={color.label} {...color} handleClick={handleColorPick} />
      ))}
    </div>
  )
}

function DropdownPicker({ colors, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (!isOpen || !dropdownRef.current) return
    const isClickOnDropdown = dropdownRef.current.contains(e.target)
    if (isClickOnDropdown) return
    setIsOpen(false)
  }

  const handleColorPick = (value) => {
    setIsOpen(false)
    onChange(value)
  }

  useOnClickOutside(dropdownRef, handleClickOutside)

  return (
    <div ref={dropdownRef} className={css.dropdownPicker}>
      <Button
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      { isOpen && (
        <Dropdown
          colors={colors}
          handleColorPick={handleColorPick}
        />
      )}
    </div>
  )
}

export default DropdownPicker
