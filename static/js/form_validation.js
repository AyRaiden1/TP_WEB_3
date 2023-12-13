document.addEventListener('DOMContentLoaded', initialiserValidationFormulaire);

function initialiserValidationFormulaire() {
    const formulaires = document.querySelectorAll('.needs-validation');
    formulaires.forEach(appliquerValidationTempsReel);
}

function appliquerValidationTempsReel(formulaire) {
    Array.from(formulaire.elements).forEach(attacherGestionnaireSaisie);
    formulaire.addEventListener('submit', function (evenement) {
        gererSoumission(evenement, formulaire);
    });
}

function attacherGestionnaireSaisie(element) {
    element.addEventListener('input', function () {
        gererSaisie(element);
    });
}

function gererSaisie(input) {
    definirMessagesDeValiditePersonnalisee(input);
    verifierValiditeChamp(input);
}

function gererSoumission(evenement, formulaire) {
    evenement.preventDefault();
    evenement.stopPropagation();

    let formulaireEstValide = true;
    Array.from(formulaire.elements).forEach(input => {
        definirMessagesDeValiditePersonnalisee(input);
        input.checkValidity();
        verifierValiditeChamp(input);
        formulaireEstValide = formulaireEstValide && input.validity.valid;
    });

    if (formulaireEstValide) {
        console.log('Le formulaire est valide et peut être soumis.');
        // Ajouter ici la logique de soumission du formulaire
        // formulaire.submit();
    } else {
        formulaire.classList.add('a-ete-valide');
    }
}

function verifierValiditeChamp(input) {
    if (input.validity.valid) {
        input.classList.remove('est-invalide');
        input.classList.add('est-valide');
        if (input.tagName === 'INPUT') {
            input.nextElementSibling.style.display = 'none';
        } else if (input.tagName === 'TEXTAREA') {
            input.parentElement.nextElementSibling.style.display = 'none';
        }
    } else {
        input.classList.remove('est-valide');
        input.classList.add('est-invalide');
        if (input.tagName === 'INPUT') {
            input.nextElementSibling.style.display = 'block';
            input.nextElementSibling.textContent = input.validationMessage;
        } else if (input.tagName === 'TEXTAREA') {
            input.parentElement.nextElementSibling.style.display = 'block';
            input.parentElement.nextElementSibling.textContent = input.validationMessage;
        }
    }
}

function definirMessagesDeValiditePersonnalisee(input) {
    switch (input.id) {
        case 'nomAnimal' :
            validerNomAnimal(input);
            break;
        case 'especeAnimal' :
            validerEspeceAnimal(input);
            break;
        case 'raceAnimal' :
            validerRaceAnimal(input);
            break;
        case 'ageAnimal' :
            validerAgeAnimal(input);
            break;
        case 'descriptionAnimal' :
            validerDescriptionAnimal(input);
            break;
        case 'courrielProprietaire' :
            validerCourrielProprietaire(input);
            break;
        case 'adresseProprietaire' :
            validerAdresseProprietaire(input);
            break;
        case 'villeProprietaire' :
            validerVilleProprietaire(input);
            break;
        case 'codePostalProprietaire' :
            validerCodePostalProprietaire(input);
            break;
    }
}

function validerNomAnimal(input) {
    if (input.value.includes(',')) {
        input.setCustomValidity('Le nom ne doit pas contenir de virgule.');
    } else if (input.value.length < 3 || input.value.length > 20) {
        input.setCustomValidity('Le nom doit contenir entre 3 et 20 caractères.');
    } else {
        input.setCustomValidity('');
    }
}

function validerEspeceAnimal(input) {
    if (input.value.includes(',')) {
        input.setCustomValidity('L\'espece ne doit pas contenir de virgule.');
    } else {
        input.setCustomValidity('');
    }
}

function validerRaceAnimal(input) {
    if (input.value.includes(',')) {
        input.setCustomValidity('La race ne doit pas contenir de virgule.');
    } else {
        input.setCustomValidity('');
    }
}

function validerAgeAnimal(input) {
    const age = Number(input.value);
    if (input.value.includes(',')) {
        input.setCustomValidity('L\'âge ne doit pas contenir de virgule.');
    } else if (isNaN(age) || age < 0 || age > 30) {
        input.setCustomValidity('L\'âge doit être un nombre entre 0 et 30.');
    } else {
        input.setCustomValidity('');
    }
}

function validerDescriptionAnimal(input) {
    console.log("ok");
    if (input.value.includes(',')) {
        input.setCustomValidity('La description ne doit pas contenir de virgule.');
    } else {
        input.setCustomValidity('');
    }
}

function validerCourrielProprietaire(input) {
    // Expression régulière pour la validation du format de l'email
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Vérification si le courriel correspond au format attendu
    if (!regexEmail.test(input.value)) {
        input.setCustomValidity('Le courriel doit avoir un format valide.');
    } else {
        input.setCustomValidity('');
    }
}

function validerAdresseProprietaire(input) {
    if (input.value.includes(',')) {
        input.setCustomValidity('Le nom ne doit pas contenir de virgule.');
    } else {
        input.setCustomValidity('');
    }
}

function validerVilleProprietaire(input) {
    if (input.value.includes(',')) {
        input.setCustomValidity('Le nom ne doit pas contenir de virgule.');
    } else {
        input.setCustomValidity('');
    }
}


function validerCodePostalProprietaire(input) {
    // Expression régulière pour la validation du format de code postal canadien
    let regexCodePostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    // Vérification si le code postal correspond au format attendu
    if (!regexCodePostal.test(input.value)) {
        input.setCustomValidity('Le code postal doit être au format canadien (ex: A1A 1A1).');
    } else {
        input.setCustomValidity('');
    }
}


