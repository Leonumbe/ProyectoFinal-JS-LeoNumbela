
//Declaracion variables globales
let reserva;

let searcher = document.getElementById('inputSearch');
let btnSearcher = document.getElementById('filtrar');
let contAboutUs = document.getElementById('contAboutUs')

const contador = document.getElementById('counter')
const btnAdd = document.getElementsByClassName('btnAdd')

//---incluimos de manera dinamica html desde API simulada por json a traves de fetch----//

//1RO fetch sobre data
const fetchLocalData = () =>{
    fetch('scripts/data.json').then((response) => response.json())
    .then((result) => {
        renderAboutUs(result)
        // console.log(result)
    }).catch((err)=>{
        console.log(err)   
    })
}
    
//2do render sobre api data.json
// 2 agrego el codigo
const renderAboutUs = (body) => {
    //console.log(body)
    const bodyAboutUs =  `
        <h1 class="title">${body.mainTittle}</h1>
        <div class="carousel">
            <div class='subTbox'>
                <h2 class="subT subTA">${body.subTittle.text1}</h2>
                <h2 class="subT subTB">${body.subTittle.text2}</h2>
                <h2 class="subT subTC">${body.subTittle.text3}</h2>
            </div>
            <div class='contCardBox'>
                <div class='cardBox'>
                    <div class='box'>
                        <i class="${body.cardA.icon1}"></i>
                        <div class="text">${body.cardA.tMission}</div>
                        <p class="pText">${body.cardA.mission}</p>
                    </div>
                </div>
                <div class='cardBox'>
                    <div class='box'>
                        <i class="${body.cardB.icon2}"></i>
                        <div class="text">${body.cardB.tValues}</div>
                        <p class="pText">${body.cardB.values}</p>
                    </div>
                </div>
                <div class='cardBox'>
                    <div class='box'>
                        <i class="${body.cardC.icon3}"></i>
                        <div class="text">${body.cardC.tTarget}</div>
                        <p class="pText">${body.cardC.target}</p>
                    </div>
                </div>
            </div>
        </div>
     `
    contAboutUs.innerHTML += bodyAboutUs
}

//Funcion guardar reserva en el localStorage
function saveReserva(){
    reserva = (JSON.parse(localStorage.getItem('reserva'))) ? 
    reserva = JSON.parse(localStorage.getItem('reserva')):
    localStorage.setItem('reserva', JSON.stringify([]))
    reserva = JSON.parse(localStorage.getItem('reserva'));
}

//Funcion card dinamica mediante Dom
function showRooms() {
    //tbm podia usar un foreach
    for (let i= 0; i< rooms.length; i++) {
        const element = rooms[i];
        //creo una variable para evitar escribir element
        const {id, category, name, price, img} = element
        const card =  `
        <div class='card'>
            <div class='box'>
                <img src="${img}" alt="">    
                <div class="head">${name}</div>
                <div class="subT">${category}</div>
                <div class="price">$${price.toLocaleString()}- Euros</div>
                <button id=${id} class="btnAdd btn">Booked</button>
            </div>
        </div>
        `
        const contenedora = document.getElementById('contenedora')
        contenedora.innerHTML += card
    } 
}


//Funcion agregar habitacion por medio de evento
const addRoom = () =>{
    for (let i = 0; i < btnAdd.length; i++) {
        const element = btnAdd[i];
        element.addEventListener('click', addReserve)
    }
}


//Funcion para asociar el click con la habitacion por medio del ID
function addReserve(e){
    //capturamos el evento en una constante por id
    const btn = e.target;
    const idBtn = btn.getAttribute('id')
    const roomSelect = rooms.find(prod => prod.id == idBtn)
    //acumula los click del mismo prod
    const inReserve = reserva.find(prod => prod.id == roomSelect.id)
    //Condicional que acumula reservas iguales para que no se repitan
    if (!inReserve) {
        //si no esta lo pusheo
        reserva.push({...roomSelect, cantidad: 1})
        //alert("Great Opcion")
        Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Great Opcion!!!',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        //si esta lo borro y
        let filterReserve = reserva.filter(prod => prod.id != inReserve.id)
        //reescribo la cantidad agregandole 1
        reserva = [...filterReserve, {...inReserve, cantidad: inReserve.cantidad + 1}]
    }
    console.log(reserva)
    localStorage.setItem('reserva', JSON.stringify(reserva))
    setTimeout(() => {
        refreshCounter();
    }, 1000); 
}

//Funcion Contador acumula booked
function refreshCounter(){
    contador.innerHTML = reserva.length 
}

//Funcion Filtro por categoria
function filterByCategory() {
    //creo elemento bottom
    let showAllRooms = document.createElement('button')
    showAllRooms.setAttribute("class","btn")
    showAllRooms.innerHTML = ('showAllRooms')
    //filtro lista por categoria
    const filteredProduct = rooms.filter((room) => room.category === searcher.value)
    console.log(filteredProduct)
    //replico html por nueva lista filtrada
    filteredProduct.forEach((element) => {
            const card =  `
            <div class='card'>
                <div class='box'>
                    <img src="${element.img}" alt="">    
                    <div class="head">${element.name}</div>
                    <div class="subT">${element.category}</div>
                    <div class="price">$${element.price.toLocaleString()}- Euros</div>
                    <button id=${element.id} class="btnAdd btn">Booked</button>
                </div>
            </div>
            `
        const contenedora = document.getElementById('contenedora')
        contenedora.innerHTML += card
    });
    showAllRooms.onclick = () =>{
        contenedora.innerHTML = ''
        showRooms();
        addRoom();
    }

    //llamo al btn filtrar
    buttonFilter.append(showAllRooms)

    //Llamo a la function addReserva mediante el onclick ya declarado
    const btnAdd = document.getElementsByClassName('btnAdd')
    for (let i = 0; i < btnAdd.length; i++) {
        const element = btnAdd[i];
        element.addEventListener('click', addReserve)
    }
}

//Eventos del filtro por categoria
searcher.onchange = () =>{
    contenedora.innerHTML = ''
    const buttonFilter = document.getElementById('buttonFilter')
    buttonFilter.innerHTML = '';    
    filterByCategory()
}
btnSearcher.onclick = () =>{
    contenedora.innerHTML = '';
    const buttonFilter = document.getElementById('buttonFilter')
    buttonFilter.innerHTML = '';
    filterByCategory()
}

//llamado de funciones
saveReserva();
showRooms();
refreshCounter();
addRoom();
fetchLocalData()

