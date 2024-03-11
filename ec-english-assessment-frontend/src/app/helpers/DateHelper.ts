export const DateFromBackendToDateWithoutTime = (date: string) => {
    const realDate = date.split("T")[0];
    return realDate;
};
export const DateWithoutTimeToDateFromBackend = (date: string) => {
    const realDate = date + "T00:00:00";
    return realDate;
};
