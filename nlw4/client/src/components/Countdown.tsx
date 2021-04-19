import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const [time, setTime] = useState<number>(0.05 * 60)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [hasFinished, setHasFinished] = useState<boolean>(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  const startCount = () => {
    setIsActive(true)
  }

  const finishedCount = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(25 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time <= 0) {
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button type="button" disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : isActive ? (
        <button
          type="button"
          onClick={finishedCount}
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        >
          Pausar
        </button>
      ) : (
        <button
          type="button"
          onClick={startCount}
          className={styles.countdownButton}
        >
          Iniciar
        </button>
      )}
    </div>
  )
}
