let moveCounter = 0
let balance = 0

function saveMove() {

    moveCounter++

    const moveDesc = document.getElementById("register-description").value
    const movePrice = parseFloat(document.getElementById("register-value").value)
    const moveDate = document.getElementById("register-date").value
    data = new Date(moveDate)
    formatedDate = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    const moveType = document.getElementById("move-type").value

    console.log(moveType)
    switch (moveType) {
        case "input":
            balance += movePrice
            console.log(`Somou ${balance}`)
            break

        case "output":
            balance -= movePrice
            console.log(`Subtraiu ${balance}`)
            break
    }

    const newTr = document.createElement("tr")
    newTr.setAttribute("id", `move_${moveCounter}`)
    newTr.classList.add(moveType)

    const removeBtn = document.createElement("button")
    removeBtn.type = "button"
    removeBtn.innerText = "Remover"
    removeBtn.setAttribute("onclick", "removeMovement(this)");
    removeBtn.setAttribute("id", "rmvBtn")
    removeBtn.setAttribute("class", "remove-button")

    const idTd = document.createElement("td")
    idTd.innerText = moveCounter
    const descTd = document.createElement("td")
    descTd.innerText = moveDesc
    const priceTd = document.createElement("td")
    priceTd.innerText = ` R$ ${movePrice}`
    const dateTd = document.createElement("td")
    dateTd.innerText = formatedDate

    newTr.appendChild(idTd)
    newTr.appendChild(descTd)
    newTr.appendChild(priceTd)
    newTr.appendChild(dateTd)
    newTr.appendChild(removeBtn)

    document.getElementById("januaryBudget").appendChild(newTr)
    document.getElementById("balance").innerText = `R$ ${balance.toFixed(2)}`

}

function removeMovement(button) {
    let removedRegister = button.parentNode;
    removedRegister.parentNode.removeChild(removedRegister);

    // Atualiza o saldo ao remover uma movimentação
    const removedPrice = parseFloat(removedRegister.childNodes[2].innerText); // Obtém o valor da movimentação removida
    const moveType = removedRegister.classList.contains("entrada") ? "entrada" : "saida"; // Verifica o tipo de movimento removido

    if (moveType === "entrada") {
        balance -= removedPrice;
    } else if (moveType === "saida") {
        balance += removedPrice;
    }

    document.getElementById("balance").innerText = balance.toFixed(2);
}

