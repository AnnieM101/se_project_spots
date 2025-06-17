import "./index.css";
import {
  enableValidation,
  config,
  resetValidation,
  disableButton,
} from "../scripts/validation";
import { Api } from "../utils/Api.js";
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "A photo of a scenic window that overlooks a snowy mountain town",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "A photo of a quaint café",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "A photo of a busy café's outdoor dining area",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "A photo of a vast wooden and metal suspension bridge over lush forest",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "A photo of a tunnel",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "A photo of a scenic log cabin covered in snow",
  },
];

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "006c392a-eb8d-47f7-97bf-98a71ebd7540",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

api.getAppInfo().then(([cards]) => {
  console.log(cards);
});

api.getUserInfo().then((user) => {
  {
    const profileImage = document.querySelector("#profile__image");
    const userID = document.querySelector("#_id");
    profileName.textContent = user.name;
    profileImage.src = user.avatar;
    profileDescription.textContent = user.about;
  }
});
//Profile Elements
const addCardButton = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

//Edit Elements
const editFormElement = document.querySelector(".modal__form");

const editModal = document.querySelector("#edit-profile-modal");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

const editModalNameInput = editModal.querySelector("#profile-name-input");

const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//Card Elements
const addModal = document.querySelector("#add-card-modal");

const addModalCloseButton = addModal.querySelector(".modal__close-button");

const addCardForm = addModal.querySelector(".modal__form");

const cardImageInput = addModal.querySelector("#image-link-input");

const cardCaptionInput = addModal.querySelector("#caption-input");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

const cardSubmitButton = addModal.querySelector(".modal__submit-button");

let selectedCardElement, selectedCardId;
let selectedLikeButton;

//Preview Elements

const previewModal = document.querySelector("#preview-modal");

const previewModalImageEl = previewModal.querySelector(".modal__image");

const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const previewCloseButton = previewModal.querySelector(
  ".modal__close-button_preview"
);

//Avatar Modal Elements
const avatarModalButton = document.querySelector(".profile__image-button");

const avatarModal = document.querySelector("#edit-avatar-modal");

const avatarModalCloseButton = avatarModal.querySelector(
  ".modal__close-button"
);

const avatarForm = avatarModal.querySelector(".modal__form");

const avatarImageInput = avatarModal.querySelector("#profile-avatar-input");

//Delete Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalButton = document.querySelector(".modal__delete-button");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close-button_delete");

//Cancel Element
const cancelButton = document.querySelector(".modal__cancel-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.addEventListener("click", (evt) => {
    submitButton.textContent = "Saving...";
  });
  const profileImage = document.querySelector("#profile__image");
  api
    .editAvatarInfo({ avatar: avatarImageInput.value })
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.addEventListener("click", (evt) => {
    submitButton.textContent = "Saving...";
  });
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.addEventListener("click", (evt) => {
    submitButton.textContent = "Saving...";
  });
  api
    .addCard({
      name: cardCaptionInput.value,
      link: cardImageInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      disableButton(cardSubmitButton, config);
      closeModal(addModal);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  deleteModalButton.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      if (selectedCardElement) {
        selectedCardElement.remove();
      }
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteModalButton.textContent = "Delete";
    });
}

function handleLike(evt, _id) {
  evt.target.classList.toggle("card__like-button_liked");
  cardLikeButton.addEventListener("click", () => {
    selectedCardId = data._id;
    selectedLikeButton = cardLikeButton;
    selectedLikeButton.classList.toggle("card__like-button_liked");
    if (
      selectedLikeButton.classList.contains("card__like-button_liked") === true
    ) {
      api.cardLike(selectedCardId);
    } else {
      api.cardDislike(selectedCardId);
    }
  });
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");

  const cardImage = cardElement.querySelector(".card__image");

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;

  cardNameEl.textContent = data.name;

  cardImage.alt = data.alt;

  cardLikeButton.addEventListener("click", handleLike);

  cardDeleteButton.addEventListener("click", (evt) => {
    const cardElement = evt.target.closest(".card");
    selectedCardId = data._id;
    selectedCardElement = cardElement;
    openModal(deleteModal);
  });

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.name;
  });

  return cardElement;
}

//Event Listeners

previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    config
  );
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

addCardButton.addEventListener("click", () => {
  openModal(addModal);
});

addModalCloseButton.addEventListener("click", () => {
  closeModal(addModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

editFormElement.addEventListener("submit", handleEditFormSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

cancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalButton.addEventListener("click", (evt) => {
  handleDeleteCardSubmit(evt);
});

deleteModalCloseButton.addEventListener("click",(evt) => {
  closeModal(deleteModal);
})

//initialCards.forEach((item) => {
//  console.log(item);
//const cardElement = getCardElement(item);
//cardsList.append(cardElement);
//});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const targetModal = document.querySelector(".modal_opened");
    closeModal(targetModal);
  }
}

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.target);
    }
  });
});
