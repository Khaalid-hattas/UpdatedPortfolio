<script setup>
import { computed, onUnmounted, ref } from 'vue'

const emit = defineEmits(['complete'])

const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const gameMode = ref('cpu')
const isThinking = ref(false)
let cpuTimer
let redirectTimer

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const getWinner = (cells) => {
  const winningLine = winningLines.find(([first, second, third]) => {
    return (
      cells[first] &&
      cells[first] === cells[second] &&
      cells[first] === cells[third]
    )
  })

  return winningLine ? cells[winningLine[0]] : null
}

const winner = computed(() => getWinner(board.value))

const isDraw = computed(() => !winner.value && board.value.every(Boolean))
const isTwoPlayer = computed(() => gameMode.value === 'two-player')

const statusMessage = computed(() => {
  if (winner.value) {
    return isTwoPlayer.value
      ? `Player ${winner.value} wins! Redirecting to the portfolio...`
      : winner.value === 'X'
      ? 'You win! Redirecting to the portfolio...'
      : 'The CPU wins! Redirecting to the portfolio...'
  }
  if (isDraw.value) return 'It’s a draw! Redirecting to the portfolio...'
  if (isThinking.value) return 'The CPU is thinking...'
  return isTwoPlayer.value ? `Player ${currentPlayer.value}'s turn` : 'Your turn — you are X'
})

const finishGame = () => {
  redirectTimer = window.setTimeout(() => emit('complete'), 1400)
}

const minimax = (cells, maximizing, depth = 0) => {
  const result = getWinner(cells)

  if (result === 'O') return 10 - depth
  if (result === 'X') return depth - 10
  if (cells.every(Boolean)) return 0

  const scores = []

  cells.forEach((cell, index) => {
    if (cell) return

    const nextCells = [...cells]
    nextCells[index] = maximizing ? 'O' : 'X'
    scores.push(minimax(nextCells, !maximizing, depth + 1))
  })

  return maximizing ? Math.max(...scores) : Math.min(...scores)
}

const getBestCpuMove = () => {
  let bestScore = -Infinity
  let bestMove

  board.value.forEach((cell, index) => {
    if (cell) return

    const nextCells = [...board.value]
    nextCells[index] = 'O'
    const score = minimax(nextCells, false)

    if (score > bestScore) {
      bestScore = score
      bestMove = index
    }
  })

  return bestMove
}

const playCpuMove = () => {
  const move = getBestCpuMove()

  if (move !== undefined) board.value[move] = 'O'

  isThinking.value = false

  if (winner.value || isDraw.value) {
    finishGame()
    return
  }

  currentPlayer.value = 'X'
}

const play = (index) => {
  if (board.value[index] || winner.value || isDraw.value || isThinking.value) return
  if (!isTwoPlayer.value && currentPlayer.value !== 'X') return

  board.value[index] = currentPlayer.value

  if (winner.value || isDraw.value) {
    finishGame()
    return
  }

  if (isTwoPlayer.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    return
  }

  currentPlayer.value = 'O'
  isThinking.value = true
  cpuTimer = window.setTimeout(playCpuMove, 500)
}

const resetGame = () => {
  window.clearTimeout(cpuTimer)
  window.clearTimeout(redirectTimer)
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  isThinking.value = false
}

const selectMode = (mode) => {
  gameMode.value = mode
  resetGame()
}

onUnmounted(() => {
  window.clearTimeout(cpuTimer)
  window.clearTimeout(redirectTimer)
})
</script>

<template>
  <main class="game-page">
    <section class="game-shell" aria-labelledby="game-title">
      <p class="game-eyebrow">Welcome to my portfolio</p>
      <h1 id="game-title">Tic-Tac-Toe</h1>
      <p class="game-intro">Choose a mode, then complete a quick game to enter my portfolio.</p>

      <div class="game-modes" aria-label="Choose game mode">
        <button
          class="game-mode-button"
          :class="{ active: gameMode === 'cpu' }"
          type="button"
          :aria-pressed="gameMode === 'cpu'"
          @click="selectMode('cpu')"
        >
          1 Player · CPU
        </button>
        <button
          class="game-mode-button"
          :class="{ active: gameMode === 'two-player' }"
          type="button"
          :aria-pressed="gameMode === 'two-player'"
          @click="selectMode('two-player')"
        >
          2 Players
        </button>
      </div>

      <div class="game-status" aria-live="polite">{{ statusMessage }}</div>

      <div class="tic-tac-toe-board" role="grid" aria-label="Tic-Tac-Toe board">
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="tic-tac-toe-cell"
          :class="{ x: cell === 'X', o: cell === 'O' }"
          type="button"
          role="gridcell"
          :aria-label="cell ? `Position ${index + 1}: ${cell}` : `Position ${index + 1}: empty`"
          :disabled="Boolean(cell) || Boolean(winner) || isDraw"
          @click="play(index)"
        >
          {{ cell === 'X' ? '×' : cell === 'O' ? '○' : '' }}
        </button>
      </div>

      <button class="game-reset" type="button" @click="resetGame">Restart game</button>
      <p class="game-help">
        {{ isTwoPlayer ? 'Players take turns as X and O.' : 'You are X. The CPU is O.' }}
      </p>
    </section>
  </main>
</template>
