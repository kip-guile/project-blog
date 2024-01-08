'use client'
import React from 'react'
import clsx from 'clsx'
import { motion, LayoutGroup } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'react-feather'

import Card from '@/components/Card'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './CircularColorsDemo.module.css'

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
]

function Controls({ isPlaying, handlePause, handlePlay, handleReset }) {
  const controlFunction = isPlaying ? handlePause : handlePlay

  return (
    <>
      <button onClick={controlFunction}>
        {isPlaying ? <Pause /> : <Play />}
        <VisuallyHidden>Play</VisuallyHidden>
      </button>
      <button onClick={handleReset}>
        <RotateCcw />
        <VisuallyHidden>Reset</VisuallyHidden>
      </button>
    </>
  )
}

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const [intervalID, setIntervalID] = React.useState(null)
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0)
  const id = React.useId()

  React.useEffect(() => {
    if (intervalID) {
      const moveColors = () => {
        if (selectedColorIndex === COLORS.length - 1) {
          setSelectedColorIndex(0)
        } else {
          setSelectedColorIndex((selectedColorIndex) => selectedColorIndex + 1)
        }
      }
      moveColors()
    }
  }, [timeElapsed, intervalID])

  const handlePlay = () => {
    if (intervalID) clearInterval(intervalID)

    const newIntervalID = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1)
    }, 1000)

    setIntervalID(newIntervalID)
  }

  const handlePause = () => {
    if (intervalID) {
      clearInterval(intervalID)
      setIntervalID(null)
    }
  }

  const handleReset = () => {
    if (intervalID) {
      clearInterval(intervalID)
      setIntervalID(null)
    }
    setTimeElapsed(0)
    setSelectedColorIndex(0)
  }

  const selectedColor = COLORS[selectedColorIndex]

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value
          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <Controls
            isPlaying={intervalID}
            handlePlay={handlePlay}
            handlePause={handlePause}
            handleReset={handleReset}
          />
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
