// Personnalisation/suppression des messages d'erreurs.
export default class MessageError {
    constructor(idMessageDOMError){
        this.idMessageDOMError = idMessageDOMError;
    }
    
    /**
    * Crée un message d'erreur personnalisé et l'integre dans un id.
    * @param {string} messageError le message d'erreur que l'on souhaite voir apparaitre
    * @return Un message d'erreur qui s'intègre dans le DOM et que l'utilisateur peut donc voir.
    */
    content (messageError){
        return document.querySelector(`#${this.idMessageDOMError}`).textContent = `${messageError}`;
    }

    /**
    * Supprime tous les messages d'erreurs (contenu dans la balise p)
    * @return Vide le contenu de tous les messages d'erreurs
    */
    clean () {
        return document
            .querySelectorAll(".cart__order__form p")   // QuerySelectorAll recupere les elements sous la forme d'un tableau sinon variable intermediaire
            .forEach(element => {
                element.textContent = "";
            });
    }
}