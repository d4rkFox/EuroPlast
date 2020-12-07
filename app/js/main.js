"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const btnSearch = document.querySelector(".header__search"),
        formSearch = document.querySelector(".search"),
        inputSearch = formSearch.querySelector(".search__input"),
        listSearch = formSearch.querySelector(".search__list"),
        btnSearchFormClose = formSearch.querySelector(".search__btn-close"),
        btnModal = document.querySelectorAll(".btn-modal"),
        btnCalculating = document.querySelectorAll(".btn-calc"),
        feedback = document.querySelectorAll(".feedback"),
        modalFeedback = document.querySelector("#feedback"),
        modalCalculating = document.querySelector("#calculating"),
        innerFeedback = document.querySelectorAll(".feedback__inner"),
        modalBtnClose = document.querySelectorAll(".feedback__close");

    // форма поиска в header
    function defaultSearch() {
        btnSearch.classList.remove("header__search--off");
        formSearch.classList.remove("search--active");
        listSearch.classList.remove("search__list--active");
        inputSearch.value = "";
    }

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    btnSearch.addEventListener("click", () => {
        btnSearch.classList.add("header__search--off");
        formSearch.classList.add("search--active");
    });

    inputSearch.addEventListener("click", () => {
        listSearch.classList.add("search__list--active");
    });

    inputSearch.addEventListener("keyup", () => {
        listSearch.classList.remove("search__list--active");
    });

    btnSearchFormClose.addEventListener("click", defaultSearch);
    window.addEventListener("scroll", defaultSearch);

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // модальное окно обратной связи
    function openModalWindow(classNameBtnModal, idModal) {
        classNameBtnModal.forEach((item) => {
            item.addEventListener("click", () => {
                idModal.classList.add("feedback--active");
                idModal.addEventListener("click", (event) => {
                    const target = event.target;
                    if (target && target.classList.contains("feedback")) {
                        closeModal();
                    }
                });
                document.body.style.overflow = "hidden";
                setTimeout(function () {
                    innerFeedback.forEach((item) => {
                        item.classList.add("feedback__inner--active");
                    });
                }, 300);
                //Определение ширины скролла
                const div = document.createElement("div");
                div.style.overflowY = "scroll";
                div.style.width = "50px";
                div.style.height = "50px";
                document.body.append(div);
                let scrollWidth = div.offsetWidth - div.clientWidth;
                div.remove();
                ////////////////////////////////////////////////
                document.body.style.marginRight = `${scrollWidth}px`;
            });
        });
    }
    openModalWindow(btnModal, modalFeedback);
    openModalWindow(btnCalculating, modalCalculating);

    // Кнопка закрытия модального окна

    function closeModal() {
        feedback.forEach((item) => {
            item.classList.remove("feedback--active");
        });
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0";
        innerFeedback.forEach((item) => {
            item.classList.remove("feedback__inner--active");
        });
    }

    modalBtnClose.forEach((item) => {
        item.addEventListener("click", closeModal);
    });
    ////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    let productSlider = new Swiper(".swiper-container", {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 10,
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        watchOverflow: true
    });
    let dataAttribute;
    let packagesWrapperID;
    const dataSort = document.querySelectorAll(".sort__btn"),
        packagesParent = document.querySelector(".packages"),
        packagesWrapper = document.querySelectorAll(".packages__box");
    dataSort.forEach((item) => {
        item.addEventListener("click", (event) => {
            const target = event.target;
            dataAttribute = target.getAttribute("data-sort");

            for (let i = 0; i < packagesWrapper.length; i++) {
                if (packagesWrapper[i].id === "all") {
                    packagesWrapper[i].classList.remove(
                        "packages__box--disable"
                    );
                } else if (packagesWrapper[i].id === dataAttribute) {
                    packagesWrapper[i].classList.remove(
                        "packages__box--disable"
                    );
                } else {
                    packagesWrapper[i].classList.add("packages__box--disable");
                    console.log(packagesWrapper[i]);
                    // item.remove();
                }
                // packagesWrapper[i].classList.toggle("packages__box--disable");
                // packagesWrapperID = packagesParent.querySelector(`#${dataAttribute}`).id;
                // if (dataAttribute === packagesWrapperID) {
                // packagesWrapper[i].classList.remove(
                //     "packages__box--disable"
                // );
                // console.log("d");
                // } else {
                //     packagesWrapper[i].classList.add("packages__box--disable");
                //     console.log(packagesWrapper[i]);
                //     // item.remove();
                // }
            }
        });
    });
});
