import { useState, useEffect, useCallback } from 'react'
import './Calculator.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const calculate = useCallback((a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b === 0 ? 'Error' : a / b
      default: return b
    }
  }, [])

  const handleNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(prev => prev === '0' ? String(num) : prev + num)
    }
  }, [waitingForOperand])

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    setDisplay(prev => prev.includes('.') ? prev : prev + '.')
  }, [waitingForOperand])

  const handleOperator = useCallback((op) => {
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
  }, [display, prevValue, operator, waitingForOperand, calculate])

  const handleEquals = useCallback(() => {
    if (operator === null || prevValue === null) return
    const current = parseFloat(display)
    const result = calculate(prevValue, current, operator)
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }, [display, prevValue, operator, calculate])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }, [])

  const handleBackspace = useCallback(() => {
    if (waitingForOperand) return
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
  }, [waitingForOperand])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key)
      } else if (e.key === '.') {
        handleDecimal()
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key)
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        handleEquals()
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear()
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNumber, handleDecimal, handleOperator, handleEquals, handleClear, handleBackspace])

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
