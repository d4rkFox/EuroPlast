"use strict";

window.onload = function () {
    // сортировка товаров по категории
    const heihgtBoxList = [],
        dataSort = document.querySelectorAll(".sort__btn"),
        packagesWrapper = document.querySelectorAll(".packages__box");

    let dataAttribute, heihgtBox;

    packagesWrapper.forEach((item, i) => {
        // для каждого элемента -
        heihgtBox = item.clientHeight; // определяем высоту блоков категорий
        heihgtBoxList[i] = heihgtBox; //  добавляем высоты всех блоков в массив,
        item.style.height = `${heihgtBoxList[i]}px`; // добавляем инланого высоту к каждому блоку категории
    });

    //Сортировка

    dataSort.forEach((item) => {
        //для каждой кнопки сортировки
        item.addEventListener("click", (event) => {
            //добавдяем событие клика
            const target = event.target;
            dataSort.forEach((elem) => {
                elem.classList.remove("sort__btn--active"); // удаляем активное значение со всех кнопок(синий фон)
            });
            console.dir(target);
            if (target.classList.contains("sort__btn")) {
                item.classList.add("sort__btn--active"); //добавляем активное значение только одной кнопке, на которую нажали
            }
            dataAttribute = target.getAttribute("data-sort"); //получаем атрибут элемента, на котором произошло событие клика
            packagesWrapper.forEach((item) => {
                item.classList.add("packages__box--disable"); //удаляем все блоки с категориями со страницы
                item.style.height = 0; // добавляем нулевую высоту всем блокам категорий
            });
            for (let j = 0; j < packagesWrapper.length; j++) {
                if (dataAttribute === "all") {
                    //если клик на элементе с атрибутом all
                    packagesWrapper[j].classList.remove(
                        "packages__box--disable"
                    ); //добавляем все блоки на страницу
                    packagesWrapper[j].style.height = `${heihgtBoxList[j]}px`; // добавляем высоту всем блокам категорий
                } else if (packagesWrapper[j].id === dataAttribute) {
                    //если клик на элементе с полученным атрибутом
                    packagesWrapper[j].classList.remove(
                        "packages__box--disable"
                    ); // добавляем на страницу блок соответвующей категории
                    packagesWrapper[j].style.height = `${heihgtBoxList[j]}px`; //добавляем высоту к блоку который добавили
                }
            }
        });
    });
    ////////////////////////////////////////////////////////////////

    window.addEventListener("resize", () => {});
};
