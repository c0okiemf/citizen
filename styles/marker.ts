export const markerStyle = (level: number): string => {
    const size = (30 / 3) * level
    return `
        width: ${size}px;
        height: ${size}px;
        background-color: #ea374d;
        border-radius: 50%;
        border: 2px solid black;
    `
}
