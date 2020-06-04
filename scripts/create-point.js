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
        .querySelector("select[name=city");

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


populateUFs();


document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities);