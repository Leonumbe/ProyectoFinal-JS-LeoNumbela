//declaracion variables golabales
let reserva;
let deleteCard;
let userBooked;
let buttonSubmit;
//dates
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");
let checkInDate;
let checkOutDate;

//Nuestra reserva la guardamos en el localStorage
//se reemplaza por TERNARIO
reserva = (JSON.parse(localStorage.getItem('reserva'))) ? 
    reserva = JSON.parse(localStorage.getItem('reserva')):
    localStorage.setItem('reserva', JSON.stringify([]))
    reserva = JSON.parse(localStorage.getItem('reserva'));


//--------------boton borrar--------------------------///
            
document.addEventListener("click", (e) => {
    if(e.target && e.target.matches("button.deleteBtn")){
    const item = reserva.find(prod => prod.id === e.target.id)
    //obtengo indice del item   
    const indice = reserva.indexOf(item)
    //elimino carrito del array
    reserva.splice(indice, 1)
    window.location.reload();
    }
    localStorage.setItem('reserva', JSON.stringify(reserva))
})

//---------------page Booked---------------------//
//Funcion suma n booked
//reduce ciclo de producto mas acum. Monto total mas fee 0.1
const totalReserved = () => {
    return reserva.reduce((acumulador, prod) => acumulador + (prod.price * prod.cantidad, 0 ))
}

const body = document.getElementById('bookedInProgress');
//desplegamos reserva en el Dom
if(reserva.length == 0){
    const noBookedSelection = 
        `
        <h1 class="title subTAdapt">You are not selected any room</h1>
        <a class="" href="../index.html">
            <button class="btn">Back</button>
        <a/>
        `
    body.innerHTML += noBookedSelection; 
   
    refreshStorage ();  
    }else{
    const summary = `
        <h1 id="bookedSelection"class="subT  h1adapted">Booked Selection</h1>
        <div id='tBody'></div>
        <a id="filter" class="btn" href="../index.html">Back</a>
        <a href="#Form" class="btn">End Booked</a>
        `
    body.innerHTML += summary

    const tbody = document.getElementById('tBody')
    for (let i = 0; i < reserva.length; i++) {
        const element = reserva[i];
        const { id, category, name, price, img, cantidad } = element;
        const reservaFinal =
         `
        <div id=${id} >
            <img class="imgBooked" src="${img}" alt="Imagen de la room"> 
            <div class='boxBooked'>
                <div class="head">Name: ${name}</div>
                <div class="subT">Category: ${category}</div>
                <div>Quantity booked: ${cantidad}</div>
                <div class="price">Price per night: $${price.toLocaleString()}- Euros</div>
                <div>Total Amount: $ ${(cantidad * price * localStorage.getItem("dateTotal")).toLocaleString()}- Euros</div>
            </div>
            <button id='${id}' class='btn deleteBtn'>Delete</button>
        </div>
        ` 
        tbody.innerHTML += reservaFinal
    }
}


//---------------Form---------------------//

//Nuestro formulario es guardado en el localStorage
//Operador ternario
userBooked =  (JSON.parse(localStorage.getItem('userBooked'))) ? 
    userBooked = JSON.parse(localStorage.getItem('userBooked'))
    : localStorage.setItem('userBooked', JSON.stringify({}))
    userBooked = JSON.parse(localStorage.getItem('userBooked'));

//Completar formulario
function endBooked() {
    class user {
        constructor(name,surname,email,phone,text){
            this.name = name,
            this.surname = surname,
            this.email = email,
            this.phone = phone,
            this.text = text
        }
    }
    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let text = document.getElementById('dato');
    
    userBooked = new user(name.value, surname.value, email.value, phone.value, text.value)
    
    
    if ((((userBooked.name == '') || (userBooked.surname == '')) || (userBooked.email == '')) || (userBooked.phone == '')) {
        //SE REEMPLAZA ALERT POR SWEAT
         //alert('Sorry, but you must complete the form to submit!!!')
         Swal.fire({
            title: 'Sorry, but you must complete the form to be able to send it!!!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        userBooked += new user(name.value, surname.value, email.value, phone.value, text.value);
    }else{
        Swal.fire({
            title: 'Great, your booked were processed correctly!!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })

    } 
    
    localStorage.setItem('userBooked', JSON.stringify(userBooked))
    console.log(userBooked);
    console.log(reserva)
}

buttonSubmit = document.getElementById('buttonSubmit');

buttonSubmit.onclick = (e) => {
    e.preventDefault()
    endBooked()
    window.location.href = "#bookedInProgress";
}

//-----------------------check-in-out-------------------------------//

//Cargo guests
let guests = [ '', 1, 2];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(arrayGuests, opcion){
    let guestsChoose = "";
    for (let i = 0; i <arrayGuests.length; i++){
        guestsChoose += "<option>" + arrayGuests[i] + "</option>";
    }
    opcion.innerHTML = guestsChoose
} 
opciones(guests, pasajeros)

//Guests select
function obtenerPasajero(){
    let pasajeroSelect = document.getElementById("pasajeros");
    localStorage.setItem(pasajeroSelect.id, pasajeroSelect.value)
}

Date
let actualDate;
function fechaActualizada(){
    actualDate = new Date();
    //console.log(actualDate.getTime())
}
fechaActualizada()


// funcion onbtener Date
function obtenerFecha(){   
    localStorage.setItem(checkIn.id, checkIn.value);
    localStorage.setItem(checkOut.id, checkOut.value);
   
    checkInDate = new Date(checkIn.value);
    checkOutDate = new Date(checkOut.value);
    //console.log(checkInDate.getTime())

    //Se reemplaza por TERNARIO
    //SE reemplaza alert por SWEAT
    checkInDate = (checkInDate.getTime() < actualDate.getTime()) ?
        Swal.fire({ icon: 'warning', title: 'Mistake', text: "You must choose a valid date for your checkin!!!"
                      + "\n Today is: " + actualDate, showConfirmButton: false, timer: 7000
              })
        : new Date(checkIn.value);
        
    //Se reemplaza por TERNARIO
    //Se reemplaza alert por Sweat
    checkOutDate = (checkOutDate <= checkInDate ) ? 
        Swal.fire({ icon: 'warning', title: 'Mistake', text: "You must choose a date after the checkin date!!!", showConfirmButton: false, timer: 5000})
        : new Date(checkOut.value);
  
    // //ver validacion
    // if (localStorage.getItem(dateTotal) == NaN) {
    //     alert("debe definir fechas")
    // } else {
    //     alert("Ha reservado esta habitacion por "+dateTotal/(1000 * 60 * 60 * 24)+" noche/s") 
    // }
}

function pasajeroDatos(){
    obtenerFecha()
    obtenerPasajero()
    
    if(checkIn.value,checkOut.value,pasajeros.value === null || checkIn.value,checkOut.value,pasajeros.value === ''){
        //alert("Select a date and guests to continue")
        let timerInterval
        Swal.fire({
            title: 'Select a date and guests to continue!',
            timer: 2500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                //b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }else{
        let dateTotal = 0
        dateTotal += checkOutDate - checkInDate;
        localStorage.setItem("dateTotal", Math.floor(dateTotal / (1000 * 60 * 60 * 24)));
        //SE REEEMPLAZA ALERT POR TOASTIFY
        //alert("Ha reservado esta habitacion por "+dateTotal/(1000 * 60 * 60 * 24)+" noche/s")
        Toastify({
            text:"Ha reservado esta habitacion por "+ dateTotal/(1000 * 60 * 60 * 24)+" noche/s",
            duration: 5000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: " linear-gradient(to right, rgb(106, 6, 236), rgb(220, 0, 240)",
            },
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 100,// vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
        }).showToast();
         // SE AGREGA SETTIMEOUT   
        setTimeout(() => {
            window.location.reload();
        }, 3000); 
    }
}

// funcion para vaciar el storage si no hay reservas seleccionadas
function refreshStorage () {
        checkIn = '';
        checkOut = '';
        pasajeroSelect = '';
        userBooked = {};
        dateTotal = 0;
        localStorage.setItem('dateTotal',JSON.stringify(dateTotal))
        localStorage.setItem('check-in',JSON.stringify(checkIn));
        localStorage.setItem('check-out',JSON.stringify(checkOut));
        localStorage.setItem('dateTotal',JSON.stringify(dateTotal));
        localStorage.setItem('pasajeros',JSON.stringify(pasajeroSelect));
        localStorage.setItem('userBooked', JSON.stringify(userBooked));
    }
