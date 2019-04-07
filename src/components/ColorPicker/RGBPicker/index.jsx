import React, { useState, useEffect, useRef } from 'react'
import hexToRGB from 'hex-rgb'
import RGBToHex from 'rgb-hex'
import useOnClickOutside from 'use-onclickoutside'
import css from './styles.module.css'

const ColorPreview = ({ color, onClick }) => (
  <button
    className={css.colorPreviewWrapper}
    type="button"
    onClick={onClick}
  >
    <div
      className={css.colorPreview}
      style={{ backgroundColor: color }}
    />
  </button>
)

const ColorRange = ({ label, value, onChange, color }) => (
  <div className={css.colorRange}>
    <div className={css.colorRangeLabel}>{label}</div>
    <input
      className={css.colorRangeInput}
      type="range"
      min={0}
      max={255}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ background: `linear-gradient(to right, #000, ${color})` }}
    />
  </div>
)

const Dropdown = ({ children, onSubmit, onCancel }) => (
  <div className={css.dropdown}>
    { children }
    <div className={css.dropdownButtons}>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSubmit}>OK</button>
    </div>
  </div>
)

function RGBPicker({ value, onChange: submitColor }) {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState(value)
  const [RGB, setRGB] = useState(hexToRGB(value))
  const dropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (!isOpen || !dropdownRef.current) return
    const isClickOnDropdown = dropdownRef.current.contains(e.target)
    if (isClickOnDropdown) return
    setIsOpen(false)
    setColor(value)
    setRGB(hexToRGB(value))
  }

  const submitHandler = () => {
    submitColor(color)
    setIsOpen(false)
  }

  const cancelHandler = () => {
    setIsOpen(false)
    setColor(value)
    setRGB(hexToRGB(value))
  }

  const colorRangeHandler = prop => (rangeValue) => {
    setRGB({ ...RGB, [prop]: Number(rangeValue) })
    const { red, green, blue } = RGB
    setColor(`#${RGBToHex(red, green, blue)}`)
  }

  useEffect(() => {
    setColor(value)
    setRGB(hexToRGB(value))
  }, [value])

  useOnClickOutside(dropdownRef, handleClickOutside)

  return (
    <div ref={dropdownRef} className={css.rgbPicker}>
      <ColorPreview
        color={color}
        onClick={() => setIsOpen(!isOpen)}
      />
      { isOpen && (
        <Dropdown
          onSubmit={submitHandler}
          onCancel={cancelHandler}
        >
          <div className={css.colorRangeWrapper}>
            <ColorRange
              label="R"
              color="#ff0000"
              value={RGB.red}
              onChange={colorRangeHandler('red')}
            />
            <ColorRange
              label="G"
              color="#00ff00"
              value={RGB.green}
              onChange={colorRangeHandler('green')}
            />
            <ColorRange
              label="B"
              color="#0000ff"
              value={RGB.blue}
              onChange={colorRangeHandler('blue')}
            />
          </div>
        </Dropdown>
      )}
    </div>
  )
}

export default RGBPicker
