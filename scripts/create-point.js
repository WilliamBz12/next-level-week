function populateUFs() {
    const ufSelect = document
        .querySelector("select[name=uf");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += '<option value="' + state.id + '">' + state.nome + '</option>';
            }

        });
}

function getCities(event) {
    const citySelect = document
        .querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");
    const index = event.target.selectedIndex;
    stateInput.value = event.target.options[index].text;

    citySelect.innerHTML = "<option value>Selecione uma cidade</option>";
    citySelect.disabled = true;
    const id = event.target.value;
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id + "/municipios";
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += '<option value="' + city.id + '">' + city.nome + '</option>';
            }
            citySelect.disabled = false;

        });
}

let selectedItems = [];
const typeInput = document.querySelector("[name=items]")


function handleSelectedItem(event) {



    const itemLi = event.target;
    //add or remove 
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex((item) => item == itemId);
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(
            item => item != itemId
        );
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    typeInput.value = selectedItems;

}


populateUFs();


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


//colect itens

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}