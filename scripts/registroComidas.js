//Variables
let seguirCarga, res, totalCalorias, caloriasDia = 0, mje
let alimentos = []

const regCom = document.getElementById("resComida")
const contReg = document.getElementById("containerAlimentos")
const titReg = document.getElementById("titleComidas")
const buttonRegistro = document.getElementById("alimentos")
const inputNombre = document.getElementById("inputNombre")
const inputCalorias = document.getElementById("inputCalorias")
const inputPorcion = document.getElementById("inputPorcion")
const selectGrupo = document.getElementById("selectGrupo")
const formAlimentos = document.getElementById("formAlimentos")
const contAlimentos = document.getElementById("containerFormAlimentos")
const botonAlim = document.getElementById("mostrarAlim")
const botonCalorias = document.getElementById("totalCals")
const rtaTotalCals = document.getElementById("totalCals-div")

//clases
class Alimentos {
    constructor(nombre, tipo, calorias, porcion) {
        this._nombre = nombre
        this._tipo = tipo
        this._calorias = calorias
        this._porcion = porcion
    }
}

//Eventos 
buttonRegistro.addEventListener('click', () => {//Al hacer click en el botón despliega el formulario
    document.getElementById("formAlimentos").reset()
    contIMC.style.display = "none"
    contTMB.style.display = "none"
    contFormTMB.style.display = "none"
    contFormIMC.style.display = "none"
    contAlimentos.style.display = "block"
    rtaTotalCals.style.display = "none"
    regCom.innerHTML = ""

    alimentos = JSON.parse(localStorage.getItem("alimentos")) ?? []
    alimentos.length == 0 ? (contReg.style.display = "none") : (contReg.style.display = "block")
    alimentos.length == 0 ? (titReg.style.display = "none") : (titReg.style.display = "block")

    alimentos.forEach((alim, indice) => {
        regCom.innerHTML += `   <div class="card" style="width: 16rem; margin:14px" id="alimento${indice}">
                                    <div class="card-header">${alim._nombre}</div>
                                    <div class="card-body" >
                                        <p class="card-text-al">Grupo: ${alim._tipo}</p>
                                        <p class="card-text-al">Calorías cada 100g: ${alim._calorias}</p>
                                        <p class="card-text-al">Porción en g: ${alim._porcion}</p>
                                        <button id="botonAlim" class="button"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>`
    })
    eliminarAlimento()
})

inputNombre.addEventListener('input', () => { // Ingresa el nombre y se guarda en la propiedad
    _nombre = inputNombre.value
});

inputCalorias.addEventListener('input', () => {// Ingresa las calorías y se guarda en la propiedad
    _calorias = inputCalorias.value

});

inputPorcion.addEventListener('input', () => {// Ingresa la porción y se guarda en la propiedad
    _porcion = inputPorcion.value
});

selectGrupo.addEventListener('change', () => {//Selecciona una opción del combobox y se guarda en la propiedad
    let value = document.getElementById("selectGrupo").selectedOptions[0].text;
    _grupo = value
})

formAlimentos.addEventListener('submit', (e) => {//Al hacer click en el botón de submit se añade el alimento ingresado
    e.preventDefault()
    titReg.style.display = "none"
    contReg.style.display = "none"
    contFormTMB.style.display = "none"
    contFormIMC.style.display = "none"
    rtaTotalCals.style.display = "none"

    const alimento = new Alimentos(_nombre, _grupo, _calorias, _porcion, 0)
    alimentos.push(alimento)

    Toastify({
        text: "Alimento añadido",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to bottom, #e2ebeb, #94c3c6)",
            fontFamily: "Arial, Helvetica, sans-serif"
        },
    }).showToast()
    document.getElementById("formAlimentos").reset()
})

botonAlim.addEventListener('click', () => { // Al hacer click en mostrar alimentos carga los alimentos añadidos y permite eliminar uno a uno
    if (alimentos.length == 0) {
        arrayVacio()
    }
    regCom.innerHTML = ""
    alimentos.length == 0 ? (contReg.style.display = "none") : (contReg.style.display = "block")
    alimentos.length == 0 ? (titReg.style.display = "none") : (titReg.style.display = "block")
    rtaTotalCals.style.display = "none"

    alimentos.forEach((alim, indice) => {
        regCom.innerHTML += `   <div class="card" style="width: 16rem; margin:14px" id="alimento${indice}">
                                    <div class="card-header">${alim._nombre}</div>
                                    <div class="card-body" >
                                        <p class="card-text-al">Grupo: ${alim._tipo}</p>
                                        <p class="card-text-al">Calorías cada 100g: ${alim._calorias}</p>
                                        <p class="card-text-al">Porción en g: ${alim._porcion}</p>
                                        <button id="botonAlim" class="button"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>`
    })

    document.getElementById("formAlimentos").reset()
    eliminarAlimento()
    localStorage.setItem('alimentos', JSON.stringify(alimentos))
})

botonCalorias.addEventListener("click", () => { // Al hacer click en Ver calorías totales se visualiza el total de calorías consumidas
    caloriasTotales()
})

//Funciones
//funcion para determinar porcentaje del total de alimentos de cada grupo
function filtrarGrupo() {
    const cantElementos = alimentos.length

    const grupo1 = alimentos.filter(alim => alim._tipo == "Frutas y verduras")
    const grupo2 = alimentos.filter(alim => alim._tipo == "Proteínas y legumbres")
    const grupo3 = alimentos.filter(alim => alim._tipo == "Lácteos")
    const grupo4 = alimentos.filter(alim => alim._tipo == "Hidratos y cereales")
    const grupo5 = alimentos.filter(alim => alim._tipo == "Grasas y aceites")
    const grupo6 = alimentos.filter(alim => alim._tipo == "Dulces")

    const cantGrupo1 = acumularTipos(grupo1)
    const cantGrupo2 = acumularTipos(grupo2)
    const cantGrupo3 = acumularTipos(grupo3)
    const cantGrupo4 = acumularTipos(grupo4)
    const cantGrupo5 = acumularTipos(grupo5)
    const cantGrupo6 = acumularTipos(grupo6)

    const porcGrupo1 = calcularPorcentaje(cantGrupo1, cantElementos)
    const porcGrupo2 = calcularPorcentaje(cantGrupo2, cantElementos)
    const porcGrupo3 = calcularPorcentaje(cantGrupo3, cantElementos)
    const porcGrupo4 = calcularPorcentaje(cantGrupo4, cantElementos)
    const porcGrupo5 = calcularPorcentaje(cantGrupo5, cantElementos)
    const porcGrupo6 = calcularPorcentaje(cantGrupo6, cantElementos)


    regCom.innerHTML += `   <div id="divPorcentajes">
                                 <h5 id="titlePorc"> Porcentaje ingerido según cada grupo de alimentos: </h5> 
                                 <p> Frutas y verduras: ${porcGrupo1.toFixed(2)}% <br> Proteínas y legumbres: ${porcGrupo2.toFixed(2)}% <br> Lácteos: ${porcGrupo3.toFixed(2)}% <br>
                                 Hidratos y cereales: ${porcGrupo4.toFixed(2)}% <br> Grasas y aceites: ${porcGrupo5.toFixed(2)}% <br> Dulces: ${porcGrupo6.toFixed(2)}% </p>
                            </div>`
}

//función para acumular cuantos alimentos de cada grupo hay
function acumularTipos(grupo) {
    let acumulador = 0
    for (i = 0; i < grupo.length; i++) {
        acumulador += 1
    }
    return acumulador
}

// función para calcular porcentaje según grupo de alimentos del día
function calcularPorcentaje(cantGrupo, totalAlimentos) {
    let porcentaje = (cantGrupo / totalAlimentos) * 100
    return porcentaje
}

// función para sumar las calorías totales por alimento según calorías cada 100g y porción en gramos
function sumaCalorias(porcion, calorias) {
    let cantCaloriasPorcion = 100 / porcion
    let cals = calorias / cantCaloriasPorcion
    return cals
}

//función para eliminar alimentos registrados
function eliminarAlimento() {
    alimentos.forEach((a, indice) => {
        const cardAlim = document.getElementById(`alimento${indice}`)

        cardAlim.children[1].children[3].addEventListener('click', () => {
            rtaTotalCals.innerHTML = ""
            rtaTotalCals.style.display = "none"
            cardAlim.remove()
            alimentos.splice(indice, 1)
            localStorage.setItem('alimentos', JSON.stringify(alimentos))
            alimentos.length == 0 ? (contReg.style.display = "none") : (contReg.style.display = "block")
        })
    })
}

//función para calcular calorías totales
function caloriasTotales() {
    rtaTotalCals.style.display = "block"
    rtaTotalCals.innerHTML = ""
    caloriasDia = 0
    alimentos.forEach((alim) => {
        totalCalorias = sumaCalorias(alim._porcion, alim._calorias)
        caloriasDia += totalCalorias
    })
    rtaTotalCals.innerHTML += `<h5> Total de calorías ingeridas en el día: <b> ${caloriasDia.toFixed(2)} </b> </h5> `
}

//función para mostrar alerta de que no tiene alimentos añadidos
function arrayVacio() {
    Swal.fire({
        icon: 'warning',
        title: 'Ups...',
        text: 'No tenés alimentos a mostrar',
        customClass: {
            confirmButton: 'swalBtnAlim',
            title: 'swalTitle1'
        },
    })
}