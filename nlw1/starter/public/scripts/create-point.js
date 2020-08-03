const statesElement = document.querySelector('select[name=state]');
const cityElement = document.querySelector('select[name=city]');
const hiddenState = document.querySelector('input[name=state-hidden]');
const hiddenCity = document.querySelector('input[name=city-hidden]');
const itensCollect = document.querySelectorAll('.itens-grid li');

let selectedItens = [];

populateUf();

statesElement.addEventListener('change', (e) => {
    const stateValue = e.target.value;
    hiddenState.value = e.target.options[e.target.selectedIndex].text;
    
    cityElement.innerHTML = "";
    cityElement.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`)
    .then( res => res.json() )
    .then( data => {
        data.forEach( city => {
            const cityOption = document.createElement('option');
            cityOption.value = city.id;
            cityOption.innerText = city.nome;
            cityElement.append(cityOption);
        })
    })
    cityElement.disabled = false;
});

const hiddenItens = document.querySelector('input[name=itens]');

itensCollect.forEach( item => {
    item.addEventListener('click', handleSelectItem);
})

function populateUf() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json() )
    .then( data => {
        data.forEach(state => {
            const stateOption = document.createElement('option');
            stateOption.value = state.id;
            stateOption.innerText = state.sigla
            statesElement.append(stateOption);
            // statesElement.innerHTML += `<option value="${state.id}">${state.sigla}</option>`;
        })
    })
    .catch(err => console.log(err));
}

function handleSelectItem(e) {
    const itemLi = e.target;

    itemLi.classList.toggle('selected');

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItens.findIndex( item => (
        item === itemId
    ));

    if (alreadySelected >= 0) {
        const filteredItens = selectedItens.filter( item => item != itemId);
        selectedItens = filteredItens;
    } else {
        selectedItens.push(itemId);
    }
    hiddenItens.value = selectedItens;
}