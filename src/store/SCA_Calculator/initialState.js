import { BLOCK_NAMES, BLOCK_PROPS, formFieldCalcDataUnit } from "../../components/SCA_Calculator/formFieldData"


export const stateFieldParamsModule = formFieldCalcDataUnit

export const invalidDataUnit = {
    fieldName: '',
    fieldValue: ''
}

export const createFieldInitState = (origArray, value) => {
    const transformedObject = {};
    origArray.forEach(item => {
        transformedObject[item] = value;
    });
    return transformedObject

}

const createFormInitState = (obj, value) => {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        acc[val] = value;
        return acc;
    }, {});
}


export const networkParamsInitState = createFieldInitState(BLOCK_PROPS[BLOCK_NAMES.NETWORK_PARAMS], stateFieldParamsModule)


export const voltageRangeInitState = {
    ...createFieldInitState(BLOCK_PROPS[BLOCK_NAMES.VOLTAGE_RANGE], stateFieldParamsModule),
    invalidData: invalidDataUnit
}


export const calcFormInitState = {
    fillControl: createFormInitState(BLOCK_NAMES, false),
    validControl: createFormInitState(BLOCK_NAMES, false),
    activeBlockName: ''
}
