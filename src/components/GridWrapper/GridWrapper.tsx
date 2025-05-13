import { GridAxis } from "../GridAxis/GridAxis";
import { Grid } from "../Grid/Grid";
import styles from "./GridWrapper.module.scss"

export function GridWrapper(){
    return <div className={styles.gridWrapper}>
        <GridAxis text="Время" orientation="horizontal" className={styles.horizontal}/>
        <GridAxis text="Расстояние" orientation="vertical" className={styles.vertical}/>
        <Grid className={styles.grid}/>
        </div>
}