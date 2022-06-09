import MessageError from "./MessageError.js";
import FormValidator from "./FormValidator.js";

/**
* Classe qui selon la saisie utilisateur va appeler une méthode qui renvoit soit true (formulaire contact conforme) soit un message d'erreur
* Constructeur : les données prénom,nom,adresse,ville et email d'un formulaire
*/
export default class Contact{
    constructor(firstName,lastName,address,city,email){
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.city = city
        this.email = email
    }

    /**
     * Determine la validité d'un formulaire
     * @returns Renvoit false si il y a une erreure de capté par la classe FormValidator dans la saisie de l'utilisateur et renvoit true 
     *          si toutes les saisies de l'utilisateurs sont conformes aux normes
     */
    isValid(){

        new MessageError().clean();
        if(new FormValidator().isOnlyLetter(this.firstName) === false){
            new MessageError("firstNameErrorMsg").content("Merci de ne saisir que des lettres");
            return false;
        }


        if((new FormValidator().isOnlyLetter(this.lastName)) === false){
            new MessageError("lastNameErrorMsg").content("Merci de ne saisir que des lettres");
            return false;
        }


        if((new FormValidator().isOnlyLetter(this.city)) === false){
            new MessageError("cityErrorMsg").content("Merci de ne saisir que des lettres");
            return false;
        }


        if((new FormValidator().isNumberLetterMini3(this.address,3)) === false){
            new MessageError("addressErrorMsg").content("Merci saisir plus de 3 caractères");
            return false;
        }


        if((new FormValidator().isEmail(this.email)) === false){
            new MessageError("emailErrorMsg").content("Merci saisir une adresse email correcte");
            return false;
        }

        return true;
    }
}