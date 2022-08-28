//Variables
let calculoTmbH, calculoTmbM, edad
const resTMB = document.getElementById("resTMB")
const contTMB = document.getElementById("containerResultadosTMB")
const tit = document.getElementById("titleResultadosTMB")
const buttonTmb = document.getElementById("tmb")
const inputEdad = document.getElementById("inputEdad2")
const inputPesoTmb= document.getElementById("inputPeso2")
const inputAlturaTmb = document.getElementById("inputAltura2")
const formTmb = document.getElementById("formCalculadoraTMB")
const contFormTMB = document.getElementById("containerFormTMB")
const radios = document.getElementsByName("genero2")

//Eventos
buttonTmb.addEventListener('click', () => {// Al hacer click en el botón despliega el formulario
    document.getElementById("formCalculadoraTMB").reset()
    contFormIMC.style.display = "none"
    contIMC.style.display = "none"
    contFormTMB.style.display = "block"
    contAlimentos.style.display = "none"
    contReg.style.display = "none"
})

inputPesoTmb.addEventListener('input', () => {// Ingresa el peso y se guarda en la propiedad
    peso = inputPesoTmb.value
});

inputAlturaTmb.addEventListener('input', () => {// Ingresa la altura y se guarda en la propiedad
    altura = inputAlturaTmb.value
});

inputEdad.addEventListener('input', () => {// Ingresa la edad y se guarda en la propiedad
    edad = inputEdad.value
});

formTmb.addEventListener('submit', (e) => { // Al hacer click en el botón de submit se muestra el resultado
    e.preventDefault()

    for (let radio of radios){
        if (radio.checked) {
            genero = radio.value
        }
    }
    resultadoTmb(genero, peso, altura, edad)
    document.getElementById("formCalculadoraTMB").reset()
})

//Funciones
//Calcula y devuelve el resultado de la TMB
function resultadoTmb(genero = "", peso = 0, altura = 0, edad = 0) {
    tit.style.display = "block"
    contIMC.style.display = "none"
    contTMB.style.display = "block"
    titulo.style.display = "block"
    contReg.style.display = "none"

    if (genero == "Hombre") {
        calculoTmbH = ((10 * peso) + (6.25 * altura) + (5 * edad) + 5)
        resTMB.innerHTML = ` <div>  
                                    <p> 
                                        El número de calorías que necesitas por día para estar saludable es: <b>${calculoTmbH.toFixed(0)}</b>
                                        <i onclick="infoTmb()" class="fa-solid fa-circle-info"></i>
                                    </p> 
                             </div> `
    }
    else if (genero == "Mujer") {
        calculoTmbM = ((10 * peso) + (6.25 * altura) + (5 * edad) - 161)
        resTMB.innerHTML = ` <div>  
                                <p> 
                                    El número de calorías que necesitas por día para estar saludable es: <b>${calculoTmbM.toFixed(0)}</b>
                                    <i onclick="infoTmb()" class="fa-solid fa-circle-info"></i>
                                </p> 
                             </div> `
    }
}

//genera alerta de interpretación de TMB
function infoTmb(){
    Swal.fire({
        title: 'Interpretación de la TMB',
        imageUrl: 'Images/macro-calculator.jpg',
        html: `<p>La tasa metabólica basal (TMB) es la cantidad mínima de energía que necesita tu cuerpo para sobrevivir realizando las funciones básicas, tales como respirar, 
        parpadear, filtrar la sangre, regular la temperatura del cuerpo o sintetizar hormonas.</p>
        <p>Aunque estés en absoluto reposo, tu cuerpo sigue trabajando para llevar a cabo aquellas funciones vitales necesarias para el correcto funcionamiento de tu organismo.</p>`,
        imageWidth: 200,
        imageHeight: 150,
        customClass: {
            confirmButton: 'swalBtn',
            title: 'titleTmb'
        }
      })
}

