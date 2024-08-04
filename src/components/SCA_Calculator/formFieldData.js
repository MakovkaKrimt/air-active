
export const FIELD_CALC_PARAMS = {
    PASSED_VAL: 'providedValue',
    MEASURE_UNIT: 'unit',
    MEASURED_VAL: 'valueWithUnit',
    CALCED_VAL: 'calcedValue'
}

export const BLOCK_NAMES = {
    NETWORK_PARAMS: 'networkParams',
    VOLTAGE_RANGE: 'voltageRange'
}

export const BLOCK_FIELD_NAMES = {
    VOLTAGE: 'voltage',
    CURRENT: 'current',
    POWER: 'power',
    MIN_VOLTAGE: 'minVoltage',
    MAX_VOLTAGE: 'maxVoltage',
    VOLTAGE_DEVIATION: 'voltageDeviation',
}


export const CALC_LABELS = {
    FIELDS_LABELS: {
        FIELD_NAMES: {
            [BLOCK_FIELD_NAMES.VOLTAGE]: 'Напряжение',
            [BLOCK_FIELD_NAMES.CURRENT]: 'Сила тока',
            [BLOCK_FIELD_NAMES.POWER]: 'Мощность',
            [BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION]: 'Допустимое отклонение',
            [BLOCK_FIELD_NAMES.MIN_VOLTAGE]: 'Минимальное напряжение',
            [BLOCK_FIELD_NAMES.MAX_VOLTAGE]: 'Максимальное напряжение'
        },
        INFO: {
            PASSED_VALUE: 'Введенное значение :',
            CALCED_VALUE: 'Рассчитанное значение :',
            DEFAULT: {
                [BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION]: 'Введите значение от 0 до',
                [BLOCK_FIELD_NAMES.MIN_VOLTAGE]: 'Введите значение не более',
                [BLOCK_FIELD_NAMES.MAX_VOLTAGE]: 'Введите значение не менее',
            }
        },
        ERROR: {
            INVALID_INPUT: {
                // MAIN: 'Некорректное значение: ',
                [BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION]: {
                    START: 'ОШИБКА: Значение отклонения превышает ранее указанную величину напряжения',
                    END: 'Проверьте корректность введенного значения или единицу измерения'
                },
                [BLOCK_FIELD_NAMES.MIN_VOLTAGE]: {
                    START: 'ОШИБКА: Значение превышает ранее указанную величину напряжения',
                    END: 'Проверьте корректность введенного значения или единицу измерения'
                },
                [BLOCK_FIELD_NAMES.MAX_VOLTAGE]: {
                    START: 'ОШИБКА: Значение ниже ранее указанной величины напряжения',
                    END: 'Проверьте корректность введенного значения или единицу измерения'
                }
            }
        }
    },
    FORM_LABELS: {
        ERROR: {
            networkParams: 'Заполните ДВА из трех обязательных полей!',
            voltageRange: 'Введите либо диапазон значений либо отклонение!'
        },
        RESET: 'Очистить форму',
        HEADERS: {
            networkParams: 'Параметры сети',
            voltageRange: 'Допускаемый диапазон рабочего напражения'
        }

    },
    STEPPER_LABELS: {
        BACK: 'Назад',
        NEXT: 'Вперед',
        FINISH: 'Рассчитать',
        RESET: 'Очистить'
    }

}
export const setFormFieldSelectUnit = (shortLabel, fullLabel, value) => {
    return {
        shortLabel,
        fullLabel,
        combinedLabel: `${fullLabel} [${shortLabel}]`,
        value
    }
}

export const formFieldSelectBlocks = {
    [BLOCK_FIELD_NAMES.VOLTAGE]: [
        setFormFieldSelectUnit('B', 'Вольт', ''),
        setFormFieldSelectUnit('мB', 'миллиВольт', 0.001),
        setFormFieldSelectUnit('кB', 'килоВольт', 1000),
    ],
    [BLOCK_FIELD_NAMES.CURRENT]: [
        setFormFieldSelectUnit('A', 'Aмпер', ''),
        setFormFieldSelectUnit('мА', 'миллиАмпер', 0.001),
    ],
    [BLOCK_FIELD_NAMES.POWER]: [
        setFormFieldSelectUnit('Вт', 'Ватт', ''),
        setFormFieldSelectUnit('мВт', 'миллиВатт', 0.001),
        setFormFieldSelectUnit('кВт', 'килоВатт', 1000),
        setFormFieldSelectUnit('МВт', 'мегаВатт', 1000000),
    ]
}

export const formFieldCalcDataUnit = {
    [FIELD_CALC_PARAMS.PASSED_VAL]: '',
    [FIELD_CALC_PARAMS.MEASURE_UNIT]: '',
    [FIELD_CALC_PARAMS.MEASURED_VAL]: '',
    [FIELD_CALC_PARAMS.CALCED_VAL]: ''
}

// TODO: Correct firstBlockData

export const networkParamsFormFieldData = [
    {
        [BLOCK_FIELD_NAMES.VOLTAGE]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES.VOLTAGE },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.VOLTAGE]
        }
    },
    {
        [BLOCK_FIELD_NAMES.CURRENT]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES.CURRENT },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.CURRENT]
        }
    },
    {
        [BLOCK_FIELD_NAMES.POWER]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES.POWER },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.POWER]
        }
    },

]

export const voltageRangeFormFieldData = [
    {
        [BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES[BLOCK_FIELD_NAMES.VOLTAGE_DEVIATION] },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.VOLTAGE]
        }
    },
    {
        [BLOCK_FIELD_NAMES.MIN_VOLTAGE]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES[BLOCK_FIELD_NAMES.MIN_VOLTAGE] },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.VOLTAGE]
        }
    },
    {
        [BLOCK_FIELD_NAMES.MAX_VOLTAGE]: {
            input: { label: CALC_LABELS.FIELDS_LABELS.FIELD_NAMES[BLOCK_FIELD_NAMES.MAX_VOLTAGE] },
            select: formFieldSelectBlocks[BLOCK_FIELD_NAMES.VOLTAGE]
        }
    },

]

export const BLOCK_PROPS = {
    [BLOCK_NAMES.NETWORK_PARAMS]: networkParamsFormFieldData.flatMap(obj => Object.keys(obj)),
    [BLOCK_NAMES.VOLTAGE_RANGE]: voltageRangeFormFieldData.flatMap(obj => Object.keys(obj))
}
