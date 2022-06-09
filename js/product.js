/**
* Message de confirmation d'ajout d'element dans le panier (apparait 3s)
* @param {number} quantityProduct la quantité choisie 
* @param {string} nameProduct le nom du produit choisi
* @param {string} colorProduct la couleur du produit choisi
* @return Un message de confirmation qui disparait au bout de 3 secondes.
*/
function confirmAddBasketDOM (quantityProduct,nameProduct,colorProduct){
    let messageConfirm = document.createElement("div");
    messageConfirm.style.minWidth = "200px";
    messageConfirm.style.padding = "15px 15px";
    messageConfirm.style.position = "absolute";
    messageConfirm.style.top = "100px";
    messageConfirm.style.marginTop = "15px"
    messageConfirm.style.borderRadius = "50px";
    messageConfirm.style.backgroundColor = "rgb(10, 59, 77)"; // Couleur du logo Kanap
    messageConfirm.style.fontWeight = "600";
    messageConfirm.textContent = `${quantityProduct} ${nameProduct} de couleur ${colorProduct} ajouté avec succés !`;
    document.querySelector(".item__content__addButton").style.position = "relative"
    document.querySelector(".item__content__addButton").appendChild(messageConfirm);

    return setTimeout(function () {messageConfirm.style.display="none"}, 3000);
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


// Lien entre un produit de la page d'acceuil et page produit (récuperation ID produit)
let urlName = new URLSearchParams(window.location.search);
let requeteId = urlName.get('id');

let requete = fetch(`http://localhost:3000/api/products/${requeteId}`)
    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })
    
    .then (function (value) {
        // Requete l'API pour obtenir les details des produits
        let requeteImg = value.imageUrl;
        let requeteImgAlt = value.altTxt;
        let requeteName = value.name;
        let requetePrice = value.price;
        let requeteDescription = value.description;
        let requeteColors = value.colors;

        // Ajout des elements au DOM
        let productImage = document.createElement("img");
        let productName = document.createElement("span");
        let productPrice = document.createElement("span");
        let productDescription = document.createElement("p");
        

        // Personnalisation des elements
        productImage.setAttribute("src",requeteImg);
        productImage.setAttribute("alt",requeteImgAlt);
        productName.textContent = requeteName;
        productPrice.textContent = requetePrice;
        productDescription.textContent = requeteDescription;


        // Affichage des elements
        document.querySelector(".item__img").append(productImage);
        document.querySelector("#title").append(productName);
        document.querySelector("#price").append(productPrice);
        document.querySelector("#description").append(requeteDescription);
        document.querySelector("head title").textContent = `${value.name}`;
        

        // Ajouter/personnalisation/affichage des couleurs dans le menu deroulant
        for (const i of requeteColors) {
            var productColors = document.createElement("option");
            productColors.value = i;
            productColors.textContent = `${i}`;
            document.querySelector("#colors").append(productColors);
        }

        // Empecher à l'utilisateur de saisir une quantité manuellement dans l'input.
        let inputQuantity = document.querySelector("#quantity");
        inputPreventManuelEntryByUser(inputQuantity, 1)

        // Ajout au panier
        let btn = document.querySelector("#addToCart");
        btn.addEventListener('click', () => {
            let basket;
            let chosenQuantityByUser = document.querySelector("#quantity").value; 
            let focusSelectColorByUser = document.querySelector("#colors").value; 

            // Le produit choisi par l'utilisateur {objet}
            let produit = {                                                 
                id : requeteId, 
                quantity : chosenQuantityByUser,
                color : focusSelectColorByUser,
            }
            
            // Recuperation du panier
            let basketString = localStorage.getItem("basket");
            

            //*** Les différentes conditions d'ajout du produit au panier***\\
            // Couleur vide
            if(produit.color == ""){
                alert("Merci de saisir une couleur");
            }
            
            // Quantité vide
            else if (produit.quantity == 0){
                alert("Merci de saisir une quantité");
            }

            else{
                // Aucun produit dans le panier
                if(basketString === null){
                    basket = [];
                    confirmAddBasketDOM(chosenQuantityByUser,requeteName,focusSelectColorByUser);
                    basket.push(produit);                                       
                    localStorage.setItem("basket", JSON.stringify(basket));     
                }

                // Un produit est déjà présent dans le panier
                else{
                    basket = JSON.parse(basketString);

                    basket = basket.filter(function (el, index){
                        // Si un doublon je n'ajoute pas le produit
                        if(produit.id === el.id && produit.color === el.color){
                            confirmAddBasketDOM(chosenQuantityByUser,requeteName,focusSelectColorByUser);
                            return false;
                        }
                        // Si pas de doublon alors j'ajoute le produit
                        else{
                            confirmAddBasketDOM(chosenQuantityByUser,requeteName,focusSelectColorByUser);
                            return true;
                        }
                    })
                    // Ajout et stockage du produit
                    basket.push(produit);

                    basket = basket.sort((a,b) => {
                        a = a.id.toLowerCase();
                        b = b.id.toLowerCase();

                        if(a < b){
                            return -1
                        }

                        if(a > b){
                            return 1
                        }

                        if(a === b){
                            return 0
                        }
                    })
                    localStorage.setItem("basket", JSON.stringify(basket));
                }
                
                
            }
        })
    })
        
.catch(function(err){
    alert("Une erreure est survenue " + "\n" + err);
})
