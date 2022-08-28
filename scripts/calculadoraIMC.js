//Variables
let genero, peso, altura, calculoImc, mensaje, pesoAnterior, pesoActual

const resIMC = document.getElementById("p1")
const compImc = document.getElementById("p2")
const contIMC = document.getElementById("containerResultadosIMC")
const titulo = document.getElementById("titleResultados")
const buttonImc = document.getElementById("imc")
const formImc = document.getElementById("formCalculadoraIMC")
const select = document.getElementById("generos")
const inputPeso = document.getElementById("inputPeso")
const inputAltura = document.getElementById("inputAltura")
const contFormIMC = document.getElementById("containerFormIMC")
const radiosImc = document.getElementsByName("genero")
const compare = document.getElementById("compararPeso")

//Eventos
buttonImc.addEventListener('click', () => { // Al hacer click en el botón despliega el formulario
    document.getElementById("formCalculadoraIMC").reset()
    contFormIMC.style.display = "block"
    contTMB.style.display = "none"
    contFormTMB.style.display = "none"
    contAlimentos.style.display = "none"
    contReg.style.display = "none"
})

inputPeso.addEventListener('input', () => { // Ingresa el peso y se guarda en la propiedad
    peso = inputPeso.value
});

inputAltura.addEventListener('input', () => { // Ingresa la altura y se guarda en la propiedad
    altura = inputAltura.value
});

formImc.addEventListener('submit', (e) => { // Al hacer click en el botón de submit muestra los resultados
    e.preventDefault()
    compImc.style.display = "none"

    for (let radio of radiosImc) {
        if (radio.checked) {
            genero = radio.value
        }
    }
    resultadoImc(genero, peso, altura)
})

compare.addEventListener("click", () => { // Al hacer click en Comparar con último peso muestra los valores antiguo y actual
    compImc.innerHTML = ""
    compImc.innerHTML += `<p> Último peso registrado: <b> ${pesoAnterior} </b> </p>
                           <p> Peso resgistrado hoy: <b> ${peso} </b> </p>`
    comparePeso()
})

//Funciones
//Calcula el valor del IMC
const calcularIMC = (peso, altura) => (peso / Math.pow(altura / 100, 2))

//Devuelve la interpretación de IMC
function resultadoImc(genero, peso, altura) {
    contIMC.style.display = "block"
    titulo.style.display = "block"
    contReg.style.display = "none"

    switch (genero) {
        case "Hombre":
            calculoImc = calcularIMC(peso, altura)
            interpretacionImcH(calculoImc)
            break

        case "Mujer":
            calculoImc = calcularIMC(peso, altura)
            interpretacionImcM(calculoImc)
            break
    }
    guardarPeso()
    document.getElementById("formCalculadoraIMC").reset()
}

//Interpretación de IMC para hombres
function interpretacionImcH(calculoImc) {

    if (calculoImc <= 20) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b>  <i onclick="infoImcH()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="low"> 
                                        <i class="fa-solid fa-face-grimace"></i><br>
                                        <b> Bajo peso </b> 
                                    </p>
                            </div>`
    }
    else if (20 < calculoImc && calculoImc <= 25) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i  onclick="infoImcH()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="normal"> 
                                        <i class="fa-solid fa-face-laugh-wink"></i><br>
                                        <b> Peso normal </b> 
                                    </p>
                            </div>`    }
    else if (25 < calculoImc && calculoImc <= 30) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b>  <i  onclick="infoImcH()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="low-alert"> 
                                        <i class="fa-solid fa-face-grimace"></i><br>
                                        <b> Obesidad leve </b> 
                                    </p>
                            </div>`
    }
    else if (30 < calculoImc && calculoImc <= 40) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i  onclick="infoImcH()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="mid-alert"> 
                                        <i class="fa-solid fa-face-frown"></i><br>
                                        <b> Obesidad severa </b> 
                                    </p>
                            </div>`
    }
    else if (40 < calculoImc) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i  onclick="infoImcH()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="alert"> 
                                        <i class="fa-solid fa-face-sad-tear"></i><br>
                                        <b> Obesidad muy severa </b> 
                                    </p>
                            </div>`
    }
}

//Interpretación de IMC para mujeres
function interpretacionImcM(calculoImc) {
    if (calculoImc <= 20) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i onclick="infoImcM()" class="fa-solid fa-circle-info"></i></p>
                                <p> Interpretación:  </p>
                                    <p id="low"> 
                                        <i class="fa-solid fa-face-grimace"></i><br>
                                        <b> Bajo peso </b> 
                                    </p>
                            </div>`
    }
    else if (20 < calculoImc && calculoImc <= 24) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i onclick="infoImcM()" class="fa-solid fa-circle-info"></i></p>
                                <p> Interpretación:  </p>
                                    <p id="normal"> 
                                        <i class="fa-solid fa-face-laugh-wink"></i><br>
                                        <b> Peso normal </b> 
                                    </p>
                            </div>`
    }
    else if (24 < calculoImc && calculoImc <= 29) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b><i onclick="infoImcM()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="low-alert"> 
                                        <i class="fa-solid fa-face-grimace"></i><br>
                                        <b> Obesidad leve </b> 
                                    </p>
                            </div>`
    }
    else if (29 < calculoImc && calculoImc <= 37) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b><i onclick="infoImcM()" class="fa-solid fa-circle-info"></i> </p>
                                <p> Interpretación:  </p>
                                    <p id="mid-alert"> 
                                        <i class="fa-solid fa-face-frown"></i><br>
                                        <b> Obesidad severa </b> 
                                    </p>
                            </div>`
    }
    else if (37 < calculoImc) {
        resIMC.innerHTML = `<div> 
                                <p> Tu IMC es: <b> ${calculoImc.toFixed(2)} </b> <i onclick="infoImcM()" class="fa-solid fa-circle-info"></i></p>
                                <p> Interpretación:  </p>
                                    <p id="alert"> 
                                        <i class="fa-solid fa-face-sad-tear"></i><br>
                                        <b> Obesidad muy severa </b> 
                                    </p>
                            </div>`
    }
}

//genera alerta de interpretación de IMC para hombres
function infoImcH(){
    Swal.fire({
        title: 'Interpretación del IMC para hombres',
        html: `<div>
                    El IMC es un valor orientativo y de medida que permite realizar una valoración del peso corporal. 
                    Se obtiene de la relación entre el peso corporal y la altura. 
                    En la evaluación se distingue entre las siguientes categorías:  
              </div>
              <div style="margin-top:15px">
                <table style="border-color:black; border: 1px solid; margin-left:auto; margin-right:auto; font-size:14px ">
                    <thead>
                        <th style="border-color:black; border: 1px solid; color:cadetblue">IMC</th>
                        <th style="border-color:black; border: 1px solid; color:cadetblue">Nivel de peso</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border-color:black; border: 1px solid">Menor a 20</td>
                            <td style="border-color:black; border: 1px solid">Bajo peso</td>
                        </tr>
                        <tr>
                        <td style="border-color:black; border: 1px solid">21 a 25</td>
                        <td style="border-color:black; border: 1px solid">Peso normal</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">26 a 30</td>
                            <td style="border-color:black; border: 1px solid">Obesidad leve</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">31 a 40</td>
                            <td style="border-color:black; border: 1px solid">Obesidad severa</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">41 o más</td>
                            <td style="border-color:black; border: 1px solid">Obesidad muy severa</td>
                        </tr>
                    </tbody>
                </table>
           </div>  `,
        imageUrl: 'Images/como-calcular-indice-masa-corporal.png',
        imageWidth: 400,
        imageHeight: 200,
        customClass: {
            confirmButton: 'swalBtn',
            title:'swalTitle'
        }
      })
}

//genera alerta de interpretación de IMC para mujeres
function infoImcM(){
    Swal.fire({
        title: 'Interpretación del IMC para mujeres',
        html: `<div>
                    El IMC es un valor orientativo y de medida que permite realizar una valoración del peso corporal. 
                    Se obtiene de la relación entre el peso corporal y la altura. 
                    En la evaluación se distingue entre las siguientes categorías:  
              </div>
              <div style="margin-top:15px">
                <table style="border-color:black; border: 1px solid; margin-left:auto; margin-right:auto; font-size:14px ">
                    <thead>
                        <th style="border-color:black; border: 1px solid; color:cadetblue">IMC</th>
                        <th style="border-color:black; border: 1px solid; color:cadetblue">Nivel de peso</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border-color:black; border: 1px solid">Menor a 20</td>
                            <td style="border-color:black; border: 1px solid">Bajo peso</td>
                        </tr>
                        <tr>
                        <td style="border-color:black; border: 1px solid">21 a 24</td>
                        <td style="border-color:black; border: 1px solid">Peso normal</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">25 a 29</td>
                            <td style="border-color:black; border: 1px solid">Obesidad leve</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">30 a 37</td>
                            <td style="border-color:black; border: 1px solid">Obesidad severa</td>
                        </tr>
                        <tr>
                            <td style="border-color:black; border: 1px solid">38 o más</td>
                            <td style="border-color:black; border: 1px solid">Obesidad muy severa</td>
                        </tr>
                    </tbody>
                </table>
           </div>  `,
        imageUrl: 'Images/como-calcular-indice-masa-corporal.png',
        imageWidth: 400,
        imageHeight: 200,
        customClass: {
            confirmButton: 'swalBtn',
            title:'swalTitle'

        }
      })
}

//Guarda el último peso en el local storage
function guardarPeso() {
    if (localStorage.getItem("peso")) {
        pesoAnterior = localStorage.getItem("peso")
        localStorage.setItem("peso", peso)
    } else {
        localStorage.setItem("peso", peso)
    }
    pesoActual = localStorage.getItem("peso")
    pesoAnterior ?? (pesoAnterior = 0)
    pesoAnterior == 0 ? (compare.style.display = "none") : (compare.style.display = "block")
}

//Compara el valor del último peso con el actual
function comparePeso() {
    compImc.style.display = "block"
    if (pesoAnterior < pesoActual) {
        compImc.innerHTML += `  <div>
                                    <p> <i class="fa-solid fa-arrow-trend-up"></i> </p>
                                    <p> Aumentaste ${pesoActual - pesoAnterior} Kg</p>
                                 </div> `
    }
    else if (pesoAnterior > pesoActual) {
        compImc.innerHTML += `  <div>
                                    <p> <i class="fa-solid fa-arrow-trend-down"></i></p>
                                    <p> Bajaste ${pesoAnterior - pesoActual} Kg</p> 
                                </div>`
    }
    else {
        compImc.innerHTML += `  <div>
                                    <p><i class="fa-solid fa-scale-balanced"></i></p>
                                    <p> Mantuviste tu peso</p>
                                 </div>`
    }
}