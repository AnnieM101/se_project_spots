const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_state_error",
  errorClass: "modal__error"
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};


const checkInputValidity = (formElement, inputElement) => {
 if (!inputElement.validity.valid){
  showInputError(formElement, inputElement, inputElement.validationMessage);
 }
 else{
  hideInputError(formElement, inputElement) ;
 }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    disableButton(buttonElement);
  }
  else{
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  //TODO Handle initial states.

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function(){
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  })
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
};

document.addEventListener("keydown", function(evt) {
  if (evt.key.toLowerCase() === "escape") {
    const targetModal = document.querySelector(".modal_opened");
    closeModal(targetModal);
  }
});

document.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("modal") && evt.target.classList.contains("modal_opened")){
    closeModal(evt.target);
   }
});

enableValidation(config);