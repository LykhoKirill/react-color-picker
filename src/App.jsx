import React, { useState } from 'react'
import css from './App.module.css'
import ColorPicker from './components/ColorPicker'

const COLORS = [
  { label: 'Red', value: '#FF0000' },
  { label: 'Yellow', value: '#FFFF00' },
  { label: 'Blue', value: '#0000FF' },
]

function App() {
  const [color, setColor] = useState('#000000')

  const handleChangeColor = value => setColor(value)

  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1>Color Picker</h1>
      </header>
      <main>
        <div className={css.colorPickerContainer}>
          <ColorPicker
            value={color}
            onChange={handleChangeColor}
            colors={COLORS}
          />
        </div>
      </main>
    </div>
  )
}

export default App
