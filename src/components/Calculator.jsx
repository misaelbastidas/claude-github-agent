import { useState } from 'react'
import './Calculator.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperator = (op) => {
    const current = parseFloat(display)
    if (prevValue !== null && !waitingForOperand) {
      const result = calculate(prevValue, current, operator)
      setDisplay(String(result))
      setPrevValue(result)
    } else {
      setPrevValue(current)
    }
    setOperator(op)
    setWaitingForOperand(true)
  }

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b === 0 ? 'Error' : a / b
      default: return b
    }
  }

  const handleEquals = () => {
    if (operator === null || prevValue === null) return
    const current = parseFloat(display)
    const result = calculate(prevValue, current, operator)
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const buttons = [
    { label: 'C', type: 'clear', action: handleClear },
    { label: '±', type: 'operator', action: () => setDisplay(String(parseFloat(display) * -1)) },
    { label: '%', type: 'operator', action: () => setDisplay(String(parseFloat(display) / 100)) },
    { label: '÷', type: 'operator', action: () => handleOperator('/') },
    { label: '7', type: 'number', action: () => handleNumber('7') },
    { label: '8', type: 'number', action: () => handleNumber('8') },
    { label: '9', type: 'number', action: () => handleNumber('9') },
    { label: '×', type: 'operator', action: () => handleOperator('*') },
    { label: '4', type: 'number', action: () => handleNumber('4') },
    { label: '5', type: 'number', action: () => handleNumber('5') },
    { label: '6', type: 'number', action: () => handleNumber('6') },
    { label: '−', type: 'operator', action: () => handleOperator('-') },
    { label: '1', type: 'number', action: () => handleNumber('1') },
    { label: '2', type: 'number', action: () => handleNumber('2') },
    { label: '3', type: 'number', action: () => handleNumber('3') },
    { label: '+', type: 'operator', action: () => handleOperator('+') },
    { label: '0', type: 'number wide', action: () => handleNumber('0') },
    { label: '.', type: 'number', action: handleDecimal },
    { label: '=', type: 'equals', action: handleEquals },
  ]

  return (
    <div className="calculator">
      <div className="display">
        <span className="operator-indicator">{operator}</span>
        <span className="display-value">{display}</span>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={`btn btn-${btn.type.split(' ')[0]}${btn.type.includes('wide') ? ' btn-wide' : ''}`}
            onClick={btn.action}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
