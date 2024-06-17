const cardContainer = document.querySelector('.container-card');
const inputName = document.querySelector('.input-name')
const inputDescription = document.querySelector('.input-description')
const inputPrice = document.querySelector('.input-price ')
const submitButton = document.querySelector('.submit-button')

fetch('/icecreams')
.then(data => data.json())
.then(jsonData => showIcecream(jsonData));

function showIcecream(icecreamData) {
    let htmlCode = '';
    for (let i = 0; i < icecreamData.length; i++) {
        const icecream = icecreamData[i];

        htmlCode += createIcecream(icecream);
    }

    cardContainer.innerHTML += htmlCode;
}

function createIcecream(icecream) {
    const card = `
            <div class="card">
            <div class="card-body">
            <h4 class="card-title">${icecream.icecream}</h4>
            <p class="card-text">${icecream.description}</p>
            <p class="card-text">${icecream.price}</p>
            </div>
        </div>
    `
    return card
}

submitButton.addEventListener('click', function (e) {
    //met preventDefault stoppen we het default submitten van het HTML formulier (we voeren zelf de POST uit)
    e.preventDefault();

    //we lezen de waarden uit van het formulier
    const name = inputName.value;
    const description = inputDescription.value;
    const price = inputPrice.value;

    (async () => {
        //we voeren de fetch uit naar de url /user-add, gebruiken de POST methode en gaan json versturen in de body
        const rawResponse = await fetch('/add-icecreams', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ icecream: name, description: description, price: price })
        });
        //het antwoord wat we van de server terugkrijgen zetten we om naar een JavaScript object met json();
        const content = await rawResponse.json();

        //in het object wat we terugkrijgen verwachten we de property userAdded die ofwel true of false is
        if(content.icecreamAdded){
            //als de waarde true is dan is de gebruiker toegevoegd
            alert('Gebruiker toegevoegd');
        } else{
            //als de waarde false is dan is er iets misgegaan met het toevoegen
            alert('Niet gelukt om de gebruiker toe te voegen');
        }

    })();

});
