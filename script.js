// *ELEMENTOS TOMADOS DEL DOCUMENTO:
let pMontoInput = document.getElementById("montoInput")
let depositarBtn = document.getElementById("depositarBtn")
let retirarBtn = document.getElementById("retirarBtn")
let balanceText = document.getElementById("balanceText")
let balanceSpan = document.getElementById("balance")
let tabla = document.getElementById("tablaTransacciones")
let resetBtn = document.getElementById("resetBtn")

// *VARIABLES A UTILIZAR:
let vBalanceTotal = 0
let vBalanceParcial = 0
let vFechaMovimiento = ""
let vMontoIngresado = 0


// !FUNCIONES:
function validarCampo() {
    vMontoIngresado = Number(pMontoInput.value)

    if (vMontoIngresado === 0) {
        alert("Ingrese un monto mayor a 0")
        limpiarBalance()
        return false
    } else {
        return true
    }
}

function depositarDinero() {
    if (validarCampo() == true) {
        vBalanceTotal = vBalanceTotal + vMontoIngresado
        actualizarBalance()
        limpiarBalance()
        agregarMovimiento()
    }
}

function retirarDinero() {
    if (validarCampo() == true) {
        if (vMontoIngresado > vBalanceTotal + 10000) {
            alert("No puedes retirar ese monto. Superaría el límite de -10000")
            return
        }
        vBalanceTotal = vBalanceTotal - vMontoIngresado
        actualizarBalance()
        limpiarBalance()
        agregarMovimiento()
    }
}

function agregarMovimiento() {
    let fecha = new Date()
    let fechaMovimiento = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`

    let fila = document.createElement("tr")

    let celdaFecha = document.createElement("td")
    let celdaMonto = document.createElement("td")
    let celdaBalanceParcial = document.createElement("td")

    celdaFecha.textContent = fechaMovimiento
    celdaMonto.textContent = vMontoIngresado
    celdaBalanceParcial.textContent = vBalanceTotal

    fila.appendChild(celdaFecha)
    fila.appendChild(celdaMonto)
    fila.appendChild(celdaBalanceParcial)

    if (vBalanceTotal < 0) {
        fila.classList.add("retiro")
    } else {
        fila.classList.add("deposito")
    }

    tabla.querySelector("tbody").appendChild(fila)
}


function actualizarBalance() {
    if (vBalanceTotal < 0) {
        balanceSpan.style.color = "red"
        balanceSpan.textContent = vBalanceTotal
    } else {
        balanceSpan.style.color = "black"
        balanceSpan.textContent = vBalanceTotal
    }
}

function reiniciar() {
    vBalanceTotal = 0
    vBalanceParcial = 0
    vFechaMovimiento = ""
    vMontoIngresado = 0
    balanceSpan.textContent = vBalanceTotal
    tabla.querySelector("tbody").innerHTML = ""
}

function limpiarBalance() {
    pMontoInput.value = ""
}

depositarBtn.addEventListener("click", () => {
    depositarDinero()
})

retirarBtn.addEventListener("click", () => {
    if (vBalanceTotal > -10000) {
        retirarDinero()
    } else {
        alert("No puedes retirar si tienes saldo negativo de 10 mil")
    }

})

resetBtn.addEventListener("click", () => {
    reiniciar()
})

pMontoInput.addEventListener("input", () => {
    if (isNaN(pMontoInput.value)) {
        pMontoInput.value = ""
    }
})

