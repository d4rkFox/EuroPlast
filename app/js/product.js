"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const headerProductImg = document.querySelectorAll(".header__bottom--increased .header__img"),
          logoOrderWrapperImg = document.querySelectorAll(".logo-order__wrapper-img");

    let windowWidth = document.documentElement.offsetWidth;
    // перемещение изображения при изменении разрешения
    window.addEventListener("resize", () => {
        windowWidth = document.documentElement.offsetWidth;
        if (windowWidth < 992) {
            replacementImages(logoOrderWrapperImg,"logo-order__wrapper-img--off",1,0);
        } else {
            replacementImages(logoOrderWrapperImg,"logo-order__wrapper-img--off",0,1);
        }

        if (windowWidth < 768) {
            replacementImages(headerProductImg,"header__img--off",0,1);
        } else {
            replacementImages(headerProductImg,"header__img--off",1,0);
        }
    });

    function replacementImages(elem, className, i, j) {
        elem[i].classList.add(className);
        elem[j].classList.remove(className);
    }
    /////////////////////////////////////////////////////////////////////////////////////

    if (windowWidth < 992) {
        logoOrderWrapperImg.forEach((item) => {
            item.classList.toggle("logo-order__wrapper-img--off");
        });
    }

    if (windowWidth < 768) {
        headerProductImg.forEach((item) => {
            item.classList.toggle("header__img--off");
        });
    }

    //валидация формы
    const applicationForm = document.querySelector(".application__form"),       
    feedbackInputNameApplication = applicationForm.querySelector("[name='Name']"),
    feedbackInputContactApplication = applicationForm.querySelector("[name='Contact']"),
    checkApplication = applicationForm.querySelector("#applicationCheck"),
    applicationNotification = applicationForm.querySelector(".application__notification"),
    checkApplicationLabel = applicationForm.querySelector(".checkbox-label"),
    notificationFeedback =document.querySelectorAll(".feedback__notification"),
    innerFeedback = document.querySelectorAll(".feedback__inner"),
    regName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']{2,20}?$/u,
    regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    let inputValueName;

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
            if (inputValueName === "" || reg.test(inputValueName) == false && secondReg.test(inputValueName) == false) {
                //если пустая строка или условие не выполняется
                replacementPlaceholder(inputSelector, textPlaceholder); //меняем на placeholder-подсказку
                inputSelector.classList.add("input--wrong"); //добавляем инпуту красный бордер
            }
        });
    }
        blurInputName(feedbackInputNameApplication, regName, "Пример: Иван");
        blurInputPhone(feedbackInputContactApplication,regPhone,"Пример: +7-999-888-77-66 или post@mail.ru",regEmail);
        deleteClassWrong(feedbackInputNameApplication);
        deleteClassWrong(feedbackInputContactApplication);

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
            applicationNotification.classList.add("application__notification--done");
        });
        return false;
    });
}

submitForm(applicationForm, feedbackInputNameApplication, feedbackInputContactApplication, checkApplication, checkApplicationLabel);
// /////////////////////////////////////////////////////////////

});

window.onload = function(){

    let bulletsSlider,
    distancePrevButtonRigth;
    // Расчет расстояния стрелки слайдера(Prev) в зависимости от количества dots
    calcDistanceRigthPrevButton(".shirt");
    calcDistanceRigthPrevButton(".products");
    
    function calcDistanceRigthPrevButton (className){
        const parentWrapper = document.querySelector(className),
              prevButtonSlider = parentWrapper.querySelector(".swiper-button-prev");
    
          addDistanceRigthPrevButton();
        
          window.addEventListener("resize", addDistanceRigthPrevButton);
    
          function addDistanceRigthPrevButton () {
               bulletsSlider = parentWrapper.querySelectorAll(".swiper-pagination-bullet");
               distancePrevButtonRigth = 23 + 10*`${bulletsSlider.length}` + 10*`${bulletsSlider.length - 1}`;
               prevButtonSlider.style.right = distancePrevButtonRigth + "px";
          }
        }
        /////////////////////////////////////////////////////////////////
};