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


const addCardButton = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const editFormElement = document.querySelector(".modal__form");

const editModal = document.querySelector("#edit-profile-modal");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

const editModalNameInput = editModal.querySelector("#profile-name-input");

const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const addModal = document.querySelector("#add-card-modal");

const addModalCloseButton = addModal.querySelector(".modal__close-button");

const addCardModal = addModal.querySelector(".modal__form");

const cardImageInput = addModal.querySelector("#image-link-input");

const cardCaptionInput = addModal.querySelector("#caption-input");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");

const previewModalImageEl = previewModal.querySelector(".modal__image");

const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const previewCloseButton = previewModal.querySelector(".modal__close-button_preview");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
    profileName.textContent = editModalNameInput.value,
    profileDescription.textContent = editModalDescriptionInput.value,
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardImageInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  cardCaptionInput.value="",
  cardImageInput.value="",
  closeModal(addModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImageAlt = cardElement.querySelector(".card__image");

  const cardNameEl = cardElement.querySelector(".card__caption");

  const cardImage = cardElement.querySelector(".card__image");

  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;

  cardNameEl.textContent = data.name;

  cardImageAlt.alt = data.alt;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () =>{
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.name;

  })

  previewCloseButton.addEventListener("click", () => {
    closeModal(previewModal);
  })

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
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

editFormElement.addEventListener("submit", handleEditFormSubmit);

addCardModal.addEventListener("submit", handleAddCardSubmit);



initialCards.forEach((item) => {
  console.log(item);
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
