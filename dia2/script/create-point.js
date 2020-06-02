function populateUfs() {
	const UfSelect = document.querySelector("select[name=uf]")

	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then( res => res.json() )
	.then( 
		states => {

			for (const state of states) {
				UfSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
			}
			
		})
}

populateUfs()

function getCities(event){
	const citiesSelect = document.querySelector("[name=city]")
	const stateInput = document.querySelector("[name=state]")

	const ufValue = event.target.value

	const indexOfSelectedState = event.target.selectedIndex
	stateInput.value = event.target.options[indexOfSelectedState].text


	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

	fetch(url).then(
		res => res.json()).then(
		cities => {
			for (const city of cities) {
				citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
			}

			citiesSelect.disabled = false
		})
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)