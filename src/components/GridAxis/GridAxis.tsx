import styles from "./GridAxis.module.scss"

export function GridAxis({text, orientation, className}: {text: string, orientation: "horizontal" | "vertical", className: string}){
    return <div className={`${className} ${styles.axis} ${orientation === "horizontal" ? styles.horizontal : styles.vertical}`}><span>{text}</span></div>
}