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
        notificationFeedback =document.querySelectorAll(".feedback__notification"),
        innerFeedback = document.querySelectorAll(".feedback__inner"),
        modalBtnClose = document.querySelectorAll(".feedback__close"),
        dropDownBtn = document.querySelector(".dropdown-menu"),
        dropDownLines = dropDownBtn.querySelector(".dropdown-menu__inner"),
        headerList = document.querySelector(".header__list"),
        anchorNav = document.querySelectorAll(".anchor"),
        feedbackForm = document.querySelector(".feedback__form"),
        calcForm = document.querySelector(".calc"),
        calcFormBottom = calcForm.querySelector(".calc__bottom"),
        feedbackInputName = feedbackForm.querySelector("[name='Name']"),
        feedbackInputNameCalc = calcFormBottom.querySelector("[name='Name']"),
        feedbackInputContact = feedbackForm.querySelector("[name='Contact']"),
        feedbackInputContactCalc = calcFormBottom.querySelector(
            "[name='Contact']"
        ),
        inputAll = document.querySelectorAll("input"),
        textareaAll = document.querySelectorAll("textarea"),
        checkName = feedbackForm.querySelector("#feedCheck"),
        checkNameLabel = feedbackForm.querySelector(".checkbox-label"),
        checkCalc = calcFormBottom.querySelector("#calcCheck"),
        checkCalcLabel = calcFormBottom.querySelector(".checkbox-label"),
        regName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']{2,20}?$/u,
        regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    let windowWidth, inputValueName;

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

    // Плавный переход по якорным ссылкам
    let anchorAttr;
    anchorNav.forEach((item) => {
        item.addEventListener("click", (event) => {
            anchorAttr = item.getAttribute("href"); //сохраняем в переменную атрибут href якорной ссылки на которую кликнули
            const anchorAttrLenght = anchorAttr.length; // сохраняем в переменную длину строки атрибута
            for (let i = 0; i < anchorAttrLenght; i++) {
                // перебираем строку, которую сохранили
                if (anchorAttr[i] === "#") {
                    // до знака #,
                    anchorAttr = anchorAttr.slice(i); // обрезаем, все до знака # включительно. переназначаем значение переменной
                }
            }
            document.querySelector("" + anchorAttr).scrollIntoView({
                // находим элемент c id, c подставленным значением anchorAttr, в DOM и
                behavior: "smooth", //плавно переходим к найденому элементу
                block: "start",
            });
            event.preventDefault(); // отмена стандартного поведения ссылки
        });
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                document.documentElement.style.overflow = "hidden";
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

    // Фунция закрытия модального окна

    function closeModal() {
        feedback.forEach((item) => {
            item.classList.remove("feedback--active");
        });
        document.documentElement.style.overflow = "hidden auto";
        document.body.style.overflow = "hidden auto";
        document.body.style.marginRight = "0";
        innerFeedback.forEach((item) => {
            item.classList.remove("feedback__inner--active");
        });
        replacementPlaceholder(feedbackInputName, "Имя"); // | =
        replacementPlaceholder(feedbackInputNameCalc, "Имя"); // | =
        replacementPlaceholder(feedbackInputContact, "Телефон или Email"); // | =
        replacementPlaceholder(feedbackInputContactCalc, "Телефон или Email"); // | =
        inputAll.forEach((item) => {
            // | =
            item.classList.remove("input--wrong"); // | == \\\ восстановление начального вида
            item.value = ""; // | == ---
            item.checked = false; //выключение чекбокса                         // | == ||| модального окна
        }); // | =
        textareaAll.forEach((item) => {
            // | =
            item.value = ""; // | =
        });
    }

    modalBtnClose.forEach((item) => {
        item.addEventListener("click", closeModal);
    });
    ////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    // slider options
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
        watchOverflow: true,

        breakpoints: {
            // when window width is >= 220px
            1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },

            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            576: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            220: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },
        },
    });
    /////////////////////////////////////////////////////////////////////////////////////////

    // Меню навигации header

    dropDownBtn.addEventListener("click", () => {
        let menuHeaderHeight, menuHeaderScrollTop;
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
        headerList.classList.add("header__list--transition");
        headerList.classList.toggle("header__list--active");
        dropDownLines.classList.toggle("dropdown-menu__inner--close");
        window.addEventListener("scroll", () => {
            menuHeaderHeight = headerList.clientHeight;
            menuHeaderScrollTop =
                headerList.getBoundingClientRect().top + menuHeaderHeight;
            if (menuHeaderScrollTop < 0) {
                headerList.classList.remove("header__list--active");
                dropDownLines.classList.remove("dropdown-menu__inner--close");
            }
        });
    });
    ///////////////////////////////////////////////////////////////////////////

    //убираем плавное закрытие меню, которое возникает при уменьшении экрана(избавдяемся от бага)
    window.addEventListener("resize", () => {
        windowWidth = document.documentElement.offsetWidth;
        if (windowWidth > 768) {
            headerList.classList.remove("header__list--transition");
        }
    });
    /////////////////////////////////////////////////////////////////

    //валидация формы
    // Функция - замена placeholder footerInput
    function replacementPlaceholder(className, text) {
        className.removeAttribute("placeholder");
        className.setAttribute("placeholder", text);
        className.value = ""; //очищаем поле инпута
    }

    // Функция удаления красного бордера инпута при фокусе
    function deleteClassWrong(inputSelector) {
        inputSelector.addEventListener("focus", () => {
            inputSelector.classList.remove("input--wrong");
        });
    }

    // функция проверки правильного заполнения формы имени
    function blurInputName(inputSelector, reg, textPlaceholder) {
        inputSelector.addEventListener("blur", () => {
            inputValueName = inputSelector.value; // Считываем введеные данные
            if (inputValueName === "" || reg.test(inputValueName) == false) {
                //если пустая строка или условие не выполняется
                replacementPlaceholder(inputSelector, textPlaceholder); //меняем на placeholder-подсказку
                inputSelector.classList.add("input--wrong"); //добавляем инпуту красный бордер
            }
        });
    }

    // функция проверки правильного заполнения формы телефон и e-mail
    function blurInputPhone(inputSelector, reg, textPlaceholder, secondReg) {
        inputSelector.addEventListener("blur", () => {
            inputValueName = inputSelector.value; // Считываем введеные данные
            if (
                inputValueName === "" ||
                (reg.test(inputValueName) == false &&
                    secondReg.test(inputValueName) == false)
            ) {
                //если пустая строка или условие не выполняется
                replacementPlaceholder(inputSelector, textPlaceholder); //меняем на placeholder-подсказку
                inputSelector.classList.add("input--wrong"); //добавляем инпуту красный бордер
            }
        });
    }

    deleteClassWrong(feedbackInputName);
    deleteClassWrong(feedbackInputContact);
    deleteClassWrong(feedbackInputNameCalc);
    deleteClassWrong(feedbackInputContactCalc);

    blurInputName(feedbackInputName, regName, "Пример: Иван");
    blurInputName(feedbackInputNameCalc, regName, "Пример: Иван");

    blurInputPhone(
        feedbackInputContact,
        regPhone,
        "Пример: +7-999-888-77-66 или post@mail.ru",
        regEmail
    );
    blurInputPhone(
        feedbackInputContactCalc,
        regPhone,
        "Пример: +7-999-888-77-66 или post@mail.ru",
        regEmail
    );

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   submit
    function submitForm(
        inputSelector,
        inputName,
        inputContact,
        checkID,
        checkLabel
    ) {
        inputSelector.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!inputName.value) {
                inputName.classList.add("input--wrong");
                return;
            }

            if (!inputContact.value) {
                inputContact.classList.add("input--wrong");
                return;
            }

            if (!checkID.checked) {
                checkLabel.classList.add("checkbox-label--shake");
                setTimeout(() => {
                    checkLabel.classList.remove("checkbox-label--shake");
                }, 500);
                return;
            }
            //Change
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize(),
            }).done(function () {
                innerFeedback.forEach((item) => {
                    item.classList.add("feedback__inner--done");
                });
                notificationFeedback.forEach(item =>{
                    item.classList.add("feedback__notification--done");
                });
            });
            return false;
        });
    }

    submitForm(
        feedbackForm,
        feedbackInputName,
        feedbackInputContact,
        checkName,
        checkNameLabel
    );
    submitForm(
        calcForm,
        feedbackInputNameCalc,
        feedbackInputContactCalc,
        checkCalc,
        checkCalcLabel
    );
    ///////////////////////////////////////////////////////////////////////////
    window.onload = function () {
        const headerParent = document.querySelector(".header"),
            heightHeader = headerParent.clientHeight,
            buttonReturn = document.querySelector(".button-return"),
            buttonReturnArrow = document.querySelector(".button-return__arrow");
        let windowScrollTop;
        window.addEventListener("scroll", () => {
            windowScrollTop = document.documentElement.scrollTop;
            if (windowScrollTop > heightHeader) {
                buttonReturn.classList.add("button-return--active");
                setTimeout(() => {
                    buttonReturnArrow.classList.add(
                        "button-return__arrow--active"
                    );
                }, 1500);
            }
            if (windowScrollTop < heightHeader) {
                buttonReturn.classList.remove("button-return--active");
                buttonReturnArrow.classList.remove(
                    "button-return__arrow--active"
                );
            }
        });
    };
});
