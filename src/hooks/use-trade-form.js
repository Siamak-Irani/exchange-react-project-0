import { useDispatch, useSelector } from "react-redux";
import { tradingActions } from "../store/trading-data";
import useGetAssets from "./use-get-assets";
import useInput from "./use-input";
import persianNumsToEnglish from "../util/persianNums-to-english";

const validator = (val) => {
  let regex = /^[0-9]+\.?[0-9]*$/;
  const condition1 = regex.test(val);

  const isValid = condition1;
  const errorMessage = isValid ? "543543" : "لطفا مقدار معتبر وارد کنید.";

  return {
    isValid,
    errorMessage,
  };
};

export function useTradeForm(formType, orderType) {
  const uid = useSelector((state) => state.auth.uid);
  const userAssets = useGetAssets();
  const dispatch = useDispatch();

  const {
    tradeForm: inputsData,
    pairs,
    current_price: currentPrice,
  } = useSelector((state) => state.tradingData);

  const inputsValue = inputsData[formType];

  const changeInputsValue = (value, inputName) => {
    dispatch(
      tradingActions.updateOneInput({
        formType,
        inputName,
        value: {
          value,
          isValid: true,
          isTouched: true,
        },
      })
    );
  };

  const stopInput = useInput({
    isMutableIfHasError: false,
    valueValidator: validator,
    valueModifier: persianNumsToEnglish,
    isUsingInternalState: false,
    externalState: {
      extValue: inputsValue.stop.value,
      extValueUpdateFn: (value) => {
        changeInputsValue(value, "stop");
      },
    },
  });

  const priceInput = useInput({
    isMutableIfHasError: false,
    valueValidator: validator,
    valueModifier: persianNumsToEnglish,
    isUsingInternalState: false,
    externalState: {
      extValue: inputsValue.price.value,
      extValueUpdateFn: (value) => {
        changeInputsValue(value, "price");
      },
    },
  });

  const amountInput = useInput({
    isMutableIfHasError: false,
    valueValidator: validator,
    valueModifier: persianNumsToEnglish,
    isUsingInternalState: false,
    externalState: {
      extValue: inputsValue.amount.value,
      extValueUpdateFn: (value) => {
        changeInputsValue(value, "amount");
      },
    },
  });

  let formIsValid = false;
  let formErrMessages = [];

  if (uid || userAssets.data) {
    const { tether, [pairs]: pair = 0 } = userAssets.data;
    const { stop, price, amount } = inputsData[formType];
    switch (orderType.state) {
      case "LIMIT": {
        let condition1 = priceInput.isValid && amountInput.isValid;
        let condition2 = true;
        if (uid) {
          if (formType === "buy") {
            if (+price.value * +amount.value > tether) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            }
          } else if (formType === "sell") {
            if (+amount.value > pair) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            }
          }
        } else {
          condition2 = false;
        }
        formIsValid = condition1 && condition2;
        break;
      }
      case "MARKET": {
        let condition1 = amountInput.isValid;
        let condition2 = true;
        if (uid) {
          if (formType === "buy") {
            if (+currentPrice * +amount.value > tether) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            }
          } else if (formType === "sell") {
            if (+amount.value > pair) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            }
          }
        } else {
          condition2 = true;
        }
        formIsValid = condition1 && condition2;
        break;
      }
      case "STOP_LIMIT": {
        let condition1 =
          stopInput.isValid && priceInput.isValid && amountInput.isValid;
        let condition2 = true;
        let condition3 = true;

        if (uid) {
          if (formType === "buy") {
            if (+price.value * +amount.value > tether) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            } else {
              condition2 = true;
            }
          } else if (formType === "sell") {
            if (+amount.value > pair) {
              formErrMessages.push("موجودی شما برای این معامله کافی نیست.");
              condition2 = false;
            } else {
              condition2 = true;
            }
          }
        } else {
          condition2 = true;
        }
        const inputsAreNotEmpty = stop.value !== "" && price.value !== "";
        const inputsAreTouched = stop.isTouched && price.isTouched;

        if (formType === "buy" && (inputsAreNotEmpty || inputsAreTouched)) {
          condition3 = +stop.value <= +price.value;
          if (!condition3) {
            formErrMessages.push(
              "مقدار حد ضرر نمیتواند بالاتر از قیمت خرید باشد"
            );
          }
        } else if (
          formType === "sell" &&
          (inputsAreNotEmpty || inputsAreTouched)
        ) {
          condition3 = +stop.value >= +price.value;
          if (!condition3)
            formErrMessages.push(
              "مقدار حد ضرر نمیتواند پایین تر از قیمت فروش باشد"
            );
        }
        formIsValid = condition1 && condition2 && condition3;
        break;
      }
    }
  }

  const errorMessages = {
    stop: [stopInput.errorMessage],
    price: [orderType.state === "MARKET" ? "" : priceInput.errorMessage],
    amount: [amountInput.errorMessage],
    form: formErrMessages,
  };

  return { formIsValid, stopInput, priceInput, amountInput, errorMessages };
}
