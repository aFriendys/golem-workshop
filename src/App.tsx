import { GridWrapper } from './components/GridWrapper'
import styles from './App.module.scss'
import { TBlockSelector } from './components/TBlockSelector'
function App() {
  return (
    <main className={styles.main}>
    <h1>Golem Workshop</h1>
      <GridWrapper />
      <TBlockSelector />
    </ main>
  )
}

export default App
