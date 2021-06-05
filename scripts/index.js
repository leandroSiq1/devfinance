const Modal = {
  state() {
    const modal = document.querySelector(".modal-overlay");

    modal.classList.toggle("active");
  }
}