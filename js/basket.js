// Import de la classe Contact qui va vérifier la validité des champs de formulaires en transmettant un message Erreur
import Contact from "./Contact.js";

/**
* Permet d'obtenir un tableau contenant les ID des produits qui ont été ajoutés au panier par l'utilisateur
* @param {string} array le tableau dont on va extraire les ID. Ici il correspond au panier de notre utilisateur
* @return La valeure des différents ID présent dans le panier
*/
function arrayProductId (array){
    let valueId = [];
    array = JSON.parse(array);
    for (const i in array) {
        valueId.push(array[i].id);
    }
    return valueId;
}

/** Fonction qui permet d'empecher à l'utilisateur de saisir une quantité manuellement dans l'input.
* @param {string} inputID l'id ou la classe de l'input 
* @param {number} defaultValue la valeur par défaut que l'on souhaite avoir dans l'input
* @return Un input qui à pour valeur par défaut 1
*/
function inputPreventManuelEntryByUser (inputID, defaultValue) {
    inputID.addEventListener('keyup', function(){
        alert("Merci de ne pas saisir de chiffre manuellement");
        return inputID.value = `${defaultValue}`;
    })
}

function messageAlertRemoveItem (inputID){
    inputID.addEventListener('click', function() {
        if(confirm("Souhaitez vous bien supprimer cet article ?")){
            return true
        }
        return false
    })
}


// Panier de l'utilisateur :
let basket = localStorage.getItem("basket");
let basketArray = JSON.parse(basket);

// Requete l'API pour obtenir les elements : Img, prix
fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){

        // Affiche les elements du panier selon les produits 
        for (const i in basketArray) {

            // Container Général
            let container = document.querySelector("#cart__items");
            
            // Container
            let containerAllProduct = document.createElement("article");
            containerAllProduct.className = 'cart__item';
            let idProductInBasket = basketArray[i].id;
            let quantityProductInBasket = basketArray[i].quantity;
            let colorProductInBasket = basketArray[i].color;
            containerAllProduct.setAttribute('data-id',idProductInBasket);
            containerAllProduct.setAttribute('data-color', colorProductInBasket);
            container.appendChild(containerAllProduct);
            
            // Images
            let containerImage = document.createElement("div");
            let containerProduct = document.querySelector(".cart__item");
            containerAllProduct.appendChild(containerImage);
            containerImage.className = "cart__item__img";
            let imageProductInBasket = document.createElement("img");

            
            //Container general de la section (nom,couleur,prix) + quantité + supprimer
            var containerNameColorPriceQuantityRemove = document.createElement("div");
            containerNameColorPriceQuantityRemove.className = "cart__item__content";
            containerAllProduct.appendChild(containerNameColorPriceQuantityRemove);

            // Div general nom,couleur,prix
            let containerNameColorPrice = document.createElement("div");
            containerNameColorPrice.className = "cart__item__content__description";
            containerNameColorPriceQuantityRemove.appendChild(containerNameColorPrice);
    
            // Nom du produit
            let containerDescriptionNameProduct = document.createElement("h2");
            
            // Couleur du produit
            let containerColorProduct = document.createElement("p");
            containerColorProduct.textContent = colorProductInBasket;
            containerNameColorPrice.appendChild(containerColorProduct);
            
            
            // Gestion de la modification et suppression d'element dans le panier (div cart__item__content__settings)       
            //  Ajout au DOM => Quantité + input + delete  
            let productSettings = document.createElement("div");
            productSettings.className = "cart__item__content__settings";
            containerNameColorPriceQuantityRemove.appendChild(productSettings);

            let containerQuantityInput = document.createElement("div");
            containerQuantityInput.className = "cart__item__content__settings__quantity";
            productSettings.appendChild(containerQuantityInput);

            // Quantité (p)
            let productQuantity = document.createElement("p");
            productQuantity.textContent = "Qté : ";
            containerQuantityInput.appendChild(productQuantity);

            // Input 
            var productInputModificatorQuantity = document.createElement("input");
            productInputModificatorQuantity.setAttribute('type',"number");
            productInputModificatorQuantity.setAttribute('name',"itemQuantity");
            productInputModificatorQuantity.setAttribute('min',"1");
            productInputModificatorQuantity.setAttribute('max',"100");
            productInputModificatorQuantity.setAttribute('value',quantityProductInBasket);
            productInputModificatorQuantity.className = "itemQuantity";
            containerQuantityInput.appendChild(productInputModificatorQuantity);
            
            // Evenement empêche l'utilisateur de saisir un nombre manuellement
            inputPreventManuelEntryByUser(productInputModificatorQuantity,1);

            // Div supprimer
            let containerRemove = document.createElement('div');
            containerRemove.className = "cart__item__content__settings__delete";
            productSettings.appendChild(containerRemove);

            // Button supprimer
            let linkRemoveProduct = document.createElement('p');
            linkRemoveProduct.textContent = "Supprimer";
            linkRemoveProduct.className = "deleteItem";
            containerRemove.appendChild(linkRemoveProduct);

            

            

            // Modification de la quantité (DOM + LocalStorage) depuis la page panier
            productInputModificatorQuantity.addEventListener('change', (event) => {
                let basket = localStorage.getItem("basket");                             
                basketArray = JSON.parse(basket);                               
                let quantityChangeByUserInBasket = event.target.value; // La valeur modifié par l'utilisateur                                   
                let containerParentArticle = event.target.closest(".cart__item");
                let dataColor = containerParentArticle.getAttribute("data-color");
                let dataId = containerParentArticle.getAttribute("data-id");

                //Changement de la quantité
                for (const j in basketArray) {
                    if(basketArray[j].id === dataId && basketArray[j].color === dataColor){
                        basketArray[j].quantity = quantityChangeByUserInBasket;
                    }
                }
                // Stockage de la nouvelle quantité / Reload pour le prix    
                localStorage.setItem("basket",JSON.stringify(basketArray));    
                window.location.reload();
            })


    
                       
            // Suppression du produit dans le DOM + dans le localStorage
            let basketProductToRemoveInBasketPage = JSON.parse(localStorage.getItem("basket"));
            let btnSupprimer = document.querySelectorAll(".deleteItem");
            console.log(btnSupprimer);

            for(let l = 0; l< btnSupprimer.length; l++){
                btnSupprimer[l].addEventListener("click", () => {
                    let idSelectionnerSuppression = basketProductToRemoveInBasketPage[l].id;  // ID du produit selectionner par l'utilisateur
                    let colorSelectionnerSuppression = basketProductToRemoveInBasketPage[l].color; // Color du produit selectionner par l'utilisateur
                    console.log(idSelectionnerSuppression) 

                    basketProductToRemoveInBasketPage = basketProductToRemoveInBasketPage.filter( el => el.id != idSelectionnerSuppression || el.color != colorSelectionnerSuppression);
                    console.log(basketProductToRemoveInBasketPage);

                    localStorage.setItem(
                        "basket",
                        JSON.stringify(basketProductToRemoveInBasketPage)
                    )
                    window.location.reload()  
                })
            }
            
            
                    
                

            

            // Requete Fetch pour recuperer des data de l'API selon l'id du produit
            fetch(`http://localhost:3000/api/products/${idProductInBasket}`)
            .then(function(res){
                return res.json();
            })
            .then(function (value){
                // Recuperation imageUrl/altTxt
                imageProductInBasket.setAttribute("src",value.imageUrl);
                imageProductInBasket.setAttribute('alt',value.altTxt);
                containerImage.appendChild(imageProductInBasket);
                
                // Recuperation nom du produit
                let nameProduct = value.name;
                containerDescriptionNameProduct.textContent = nameProduct;
                containerNameColorPrice.appendChild(containerDescriptionNameProduct);
                
                // Recuperation prix 
                let containerPriceProduct = document.createElement('p');
                containerPriceProduct.textContent = value.price + " €";
                containerNameColorPrice.appendChild(containerPriceProduct);
            })
            .catch (function(err){
                alert("Une erreure est survenue " + "\n" + err);
            })
        }
    })
    .catch (function(err){
        alert("Une erreure est survenue " + "\n" + err);
    })








//**** Affichage du prix total des articles ****\\
// Recuperation du panier
let productsInLocalStorage = localStorage.getItem("basket");
productsInLocalStorage = JSON.parse(productsInLocalStorage);
let basketTotalPrice= 0;

//Recuperation de tous les id dans le panier
for (const i in productsInLocalStorage) {
    var idProduct = productsInLocalStorage[i].id;

    // Une requete fetch pour recuperer le prix des produits
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    
    // Additionne les produits en fonction de leur quantité dans la variable glocale basketPrice et l'affiche
    .then(function(value){
        basketTotalPrice += value.price * productsInLocalStorage[i].quantity;
        document
            .querySelector("#totalPrice")
            .textContent = basketTotalPrice;
    })
    .catch(function(err){
        return alert("Une erreure est survenue " + "\n" + err);
    })
}




//**** Données à fournir pour le corps de la requete POST ****\\
// Instanciation de la classe avec notre formulaire pour créer l'objet Contact
let contact = new Contact(firstName,lastName,address,city,email);
// Tableau d'ID
let arrayProductString = arrayProductId(basket);


let form = document.querySelector(".cart__order__form");
form.addEventListener('submit', function (e) {
    
    e.preventDefault();
    
    if(contact.isValid()){

        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {
                'Accept': "application/json",
                'Content-Type': "application/json" 
            },
            body : JSON.stringify ({
                contact: contact,
                products : arrayProductString
            })
        })
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(value){
            // Transmission de la valeure de la requete POST dans l'URL afin de la récuperer pour afficher le numéro de commande dans la page confirmation.html
            location.href = `confirmation.html?orderId=${value.orderId}`;     
        })
        .catch (function(err){
            alert("Une erreure est survenue " + "\n" + err);
        })
    }
    else{
        console.log("Il y a une erreure dans les données du corps de la requete POST");
    }
})




























