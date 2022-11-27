export const getRidOfDups = (array: string[]) => {
    const object = array.reduce((reducer: Record<string, boolean>, item) => {
        reducer[item] = true;
        return reducer;
    }, {});

    return Object.keys(object);
}