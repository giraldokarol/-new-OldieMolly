export function hasEmptyValues(el:any):boolean{
    return Object.values(el).some(value => value === "" || value === null || value === undefined);
}

export function identifyEmptyValue(el:any) {
    const emptyValues:any[] = [];
    Object.entries(el).forEach(([key, value]) => {
        if(value === "" || value === null || value === undefined){
            emptyValues.push(key);
        }
    });
    return emptyValues;
}