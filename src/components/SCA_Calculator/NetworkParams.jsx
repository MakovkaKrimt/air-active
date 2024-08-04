import {
  CALC_LABELS,
  BLOCK_NAMES,
  networkParamsFormFieldData,
  BLOCK_FIELD_NAMES,
  BLOCK_PROPS,
  FIELD_CALC_PARAMS,
} from "./formFieldData";
import { roundFloatValue } from "../../utils";
import store from "../../store/store";
import {
  updateField,
  clearField,
  unfilledFieldsSelector,
  workStateSelector,
  lastUnfilledFieldSelector,
  totalStateSelector,
} from "../../store/SCA_Calculator/networkParamsSlice";
import {
  setFormIsFilled,
  setFormIsUnFilled,
} from "../../store/SCA_Calculator/calcFormSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const FormStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 2,
};

const CURR_BLOCK_NAME = BLOCK_NAMES.NETWORK_PARAMS;
const { INFO } = CALC_LABELS.FIELDS_LABELS;

export const NetworkParams = () => {
  const currentBlockState = useSelector(workStateSelector);
  const unfilledFields = useSelector(unfilledFieldsSelector);
  const lastUnfilledField = useSelector(lastUnfilledFieldSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastUnfilledField) {
      dispatch(setFormIsFilled({ blockName: CURR_BLOCK_NAME }));
    } else {
      dispatch(setFormIsUnFilled({ blockName: CURR_BLOCK_NAME }));
    }
  }, [unfilledFields]);

  const dispatchCalcedField = (fieldKey) => {
    const currentState = store.getState().networkParams;
    let calcedValue;
    switch (fieldKey) {
      case BLOCK_FIELD_NAMES.VOLTAGE:
        calcedValue = Number(
          currentState[BLOCK_FIELD_NAMES.POWER][
            FIELD_CALC_PARAMS.MEASURED_VAL
          ] /
            currentState[BLOCK_FIELD_NAMES.CURRENT][
              FIELD_CALC_PARAMS.MEASURED_VAL
            ]
        );
        break;
      case BLOCK_FIELD_NAMES.CURRENT:
        calcedValue = Number(
          currentState[BLOCK_FIELD_NAMES.POWER][
            FIELD_CALC_PARAMS.MEASURED_VAL
          ] /
            currentState[BLOCK_FIELD_NAMES.VOLTAGE][
              FIELD_CALC_PARAMS.MEASURED_VAL
            ]
        );
        break;
      case BLOCK_FIELD_NAMES.POWER:
        calcedValue = Number(
          currentState[BLOCK_FIELD_NAMES.VOLTAGE][
            FIELD_CALC_PARAMS.MEASURED_VAL
          ] *
            currentState[BLOCK_FIELD_NAMES.CURRENT][
              FIELD_CALC_PARAMS.MEASURED_VAL
            ]
        );
        break;
    }

    if (!Number.isInteger(calcedValue))
      calcedValue = roundFloatValue(calcedValue);

    const payload = {
      fieldKey,
      [FIELD_CALC_PARAMS.MEASURED_VAL]: "",
      [FIELD_CALC_PARAMS.CALCED_VAL]: calcedValue,
    };
    dispatch(updateField(payload));
  };

  const handleInputChange = (fieldKey, passedValue) => {
    const unit = currentBlockState[fieldKey][FIELD_CALC_PARAMS.MEASURE_UNIT];
    const payload = {
      fieldKey,
      [FIELD_CALC_PARAMS.PASSED_VAL]: passedValue === "" ? "" : +passedValue,
      [FIELD_CALC_PARAMS.MEASURED_VAL]: !passedValue
        ? ""
        : !unit
        ? +passedValue
        : unit * +passedValue,
    };

    dispatch(updateField(payload));
    if (unfilledFields.length == 2 && unfilledFields.includes(fieldKey)) {
      const emptyFieldName = unfilledFields.filter(
        (item) => item !== fieldKey
      )[0];
      return dispatchCalcedField(emptyFieldName);
    }

    lastUnfilledField && dispatchCalcedField(lastUnfilledField);
  };

  const handleUnitChange = (fieldKey, passedVal) => {
    const providedValue =
      currentBlockState[fieldKey][FIELD_CALC_PARAMS.PASSED_VAL];
    let valWithUnit = "";
    if (!passedVal) {
      valWithUnit = providedValue;
    } else if (providedValue) {
      valWithUnit = Number(providedValue * +passedVal);
      if (!Number.isInteger(valWithUnit)) {
        valWithUnit = roundFloatValue(valWithUnit);
      }
    }

    const payload = {
      fieldKey,
      [FIELD_CALC_PARAMS.MEASURE_UNIT]: passedVal === "" ? "" : +passedVal,
      [FIELD_CALC_PARAMS.MEASURED_VAL]:
        valWithUnit !== "" ? valWithUnit : providedValue,
    };

    dispatch(updateField(payload));
    if (unfilledFields.length == 2 && unfilledFields.includes(fieldKey)) {
      const emptyFieldName = unfilledFields.filter(
        (item) => item !== fieldKey
      )[0];
      return dispatchCalcedField(emptyFieldName);
    }

    lastUnfilledField && dispatchCalcedField(lastUnfilledField);
  };

  const handleClearField = (fieldKey) => {
    handleInputChange(fieldKey, "");
  };

  return (
    <Box
      sx={{
        display: "flex",
        mt: 2,
        minWidth: "600px",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {networkParamsFormFieldData.map((item, index) => {
        return (
          <FormControl key={`${index}_fc`} sx={FormStyle}>
            {currentBlockState[Object.keys(item)][
              FIELD_CALC_PARAMS.PASSED_VAL
            ] && lastUnfilledField !== Object.keys(item)[0] ? (
              <IconButton
                variant="outlined"
                onClick={() => handleClearField(Object.keys(item)[0])}
              >
                <CloseIcon color="error" />
              </IconButton>
            ) : (
              <Box sx={{ minWidth: "40px", minHeight: "40px" }}></Box>
            )}

            <TextField
              key={`${index}_tf`}
              sx={{ flex: 1 }}
              type="number"
              label={Object.values(item)[0].input.label}
              // InputLabelProps={{
              //     shrink: true,
              //     sx: {
              //         fontSize: 18
              //     }

              // }}
              value={
                lastUnfilledField == Object.keys(item)[0]
                  ? currentBlockState[Object.keys(item)][
                      FIELD_CALC_PARAMS.CALCED_VAL
                    ]
                  : currentBlockState[Object.keys(item)][
                      FIELD_CALC_PARAMS.PASSED_VAL
                    ]
              }
              disabled={
                lastUnfilledField == Object.keys(item)[0] ? true : false
              }
              onChange={(e) =>
                handleInputChange(Object.keys(item)[0], e.target.value)
              }
              helperText={
                currentBlockState[Object.keys(item)][
                  FIELD_CALC_PARAMS.MEASURED_VAL
                ]
                  ? `${INFO.PASSED_VALUE} ${
                      currentBlockState[Object.keys(item)][
                        FIELD_CALC_PARAMS.MEASURED_VAL
                      ]
                    } ${Object.values(item)[0].select[0].fullLabel}`
                  : lastUnfilledField !== Object.keys(item)[0]
                  ? ""
                  : `${INFO.CALCED_VALUE} ${
                      currentBlockState[Object.keys(item)][
                        FIELD_CALC_PARAMS.CALCED_VAL
                      ]
                    } ${Object.values(item)[0].select[0].fullLabel}`
              }
            ></TextField>
            <Select
              key={Object.values(item)[0]}
              sx={{ flex: 1, textAlign: "center" }}
              fullWidth
              size="medium"
              value={
                currentBlockState[Object.keys(item)][
                  FIELD_CALC_PARAMS.MEASURE_UNIT
                ]
              }
              onChange={(e) =>
                handleUnitChange(Object.keys(item), e.target.value)
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              disabled={
                lastUnfilledField == Object.keys(item)[0] ? true : false
              }
            >
              {Object.values(item)[0].select.map((obj, index) => {
                return (
                  <MenuItem key={`${obj.value} ${index}`} value={obj.value}>
                    {obj.combinedLabel}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
    </Box>
  );
};
