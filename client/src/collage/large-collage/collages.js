export function getCollage() {
    const collages = window.sn.data.collages;
    return collages[Math.floor(Math.random() * collages.length)];
}
