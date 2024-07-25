export const isoDate = (date) => {
    const fixDate = new Date(date);
    const iso = fixDate.toISOString();
    return iso;
}
export const shortDate = (date) => {
    const fixDate = new Date(date);
    const isoShort = fixDate.toISOString().split('T')[0];
    return isoShort;
}
export const utcDate = (date) => {
    const fixDate = new Date(date);
    const utc = fixDate.toUTCString();
    return utc;
}
export const getTime = (date) => {
    const fixDate = new Date(date);
    const time = fixDate.getTime();
    return time;
}