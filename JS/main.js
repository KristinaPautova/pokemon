// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

let ol = document.querySelector(".ul")
// fetch("https://pokeapi.co/api/v2/pokemon/")
//     .then((result) => result.json())
//     .then((data) => {
//         console.log(data)
//         data.results.forEach((elem,index) => {
//             // console.log(elem)
//             ol.innerHTML +=`<li><button onclick="askPokimon(${index+1})">${elem.name} </button></li>`
//         });
//     });


let mainModal = document.querySelector('.main-modal');
let div = document.querySelector('.inp-edit');
let btnCloser = document.querySelector('.btn-closer');
let btnSave = document.querySelector('.btn-save')
function askPokimon(index){
    mainModal.style.display = 'block';
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)
        .then((result) => result.json())
        .then((data) => {
            console.log(data)
            div.innerHTML = `
            <div>Имя: ${data.name}</div>
            <div>Тип: ${data.types[0].type.name}</div>
            <div>Рост:${data.height}</div>
            <div>Вес: ${data.weight}</div>
            <img src="${data.sprites.front_default}" style="  width:200px; height:200px; background-size:cover;" alt="">`
        });

}

btnCloser.addEventListener('click',() => {
    mainModal.style.display = 'none';
    //закрывем модальное окно
})

let btnNext = document.querySelector('.next');
let btnLast = document.querySelector('.last');
let id = 0;
console.log(id)



    btnNext.addEventListener('click', () => {
        if(id >= 0 && id <= 1154){
            id += 20
        }
        render()
    })
    btnLast.addEventListener('click', () => {
        if(id >= 20 && id <= 1154){
            id -= 20
        }
        render()
    })

const API = "https://pokeapi.co/api/v2/pokemon/?";
function render(){
    fetch(`${API}offset=${id}&limit=20`).then((result) => result.json())
        .then((data) => {
            console.log(data)
            ol.innerHTML = ''
            data.results.forEach((elem, index) => {
                ol.innerHTML += `<li><button onclick="askPokimon(${id + index + 1})">${elem.name} </button></li>`
            });
        });
}
render()


// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight
// const API = "https://pokeapi.co/api/v2/pokemon/{id}/"
// let id = 1;
// let btn = document.querySelector(".ul")
// btn.addEventListener("click", ()=>{
//   fetch(`${API}/${id}`)
// })



// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее
