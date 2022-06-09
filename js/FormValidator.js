// Définit la validité d'un champ de formulaire en renvoyant true ou false.
export default class FormValidator{

    /**
    * Verification que l'input a un contenu et qu'il fait strictement plus de 3 caractères. Aussi, supprime les espaces en début et fin de saisie
    * @param {string} input l'input que l'on souhaite verifier
    * @param {number} nbCarac le nombre de caractères minimum que l'on souhaite faire saisir à l'utilisateur
    * @return Renvoit false si l'input n'a pas de contenu ou si il fait moins de 3 caractères et renvoit true si l'input fait plus que 3 caractères
    */
    isNumberLetterMini3 (input, nbCarac){
        if(input.value === undefined || input.value === ""){
            return false;
        }
        return input.value.trim().length > nbCarac;
    }

    /**
     * Vérification que l'input contient uniquement des lettres
     * @param {string} input l'input que l'on souhaite verifier 
     * @returns Renvoit true si l'utilisateur a saisi uniquement des lettres et false si il a saisi un nombre
     */
    isOnlyLetter(input){
        let onlyLetterRegex = new RegExp(/^[a-z A-Z]+$/);
        return onlyLetterRegex.test(input.value); //Retourne directement true ou false ce qui economise une condition. (Permet de faire une ecriture + simple.)
    }
    
    /**
     * Vérification que l'input contient uniquement des nombres
     * @param {string} input l'input que l'on souhaite verifier 
     * @returns Renvoit true si l'utilisateur a saisi uniquement des nombres et false si l'utilisateur a saisi un autre caractère.
     */
    isOnlyNumber(input){
        let onlyNumberRegex = new RegExp(/[0-9]+/);
        return onlyNumberRegex.test(input.value);
    }

    /**
     * Vérification que l'input contient uniquement des lettres en majuscule
     * @param {string} input l'input que l'on souhaite verifier 
     * @returns Renvoit true si l'utilisateur a saisi uniquement des lettres en majuscule et false si l'utilisateur a saisi un autre caractère
     */
    isOnlyUpperCase (input){
        let onlyUpperCaseRegex = new RegExp(/[A-Z]+/);
        return onlyUpperCaseRegex.test(input.value);
    }

    /**
     * Vérification que l'input contient la synthaxe d'un email
     * @param {string} input l'input que l'on souhaite verifier 
     * @returns Renvoit true si l'utilisateur a saisi un email conforme à notre norme et false si l'utilisateur n'a pas respecté la norme de saisie
     */
    isEmail (input){
        let emailRegex = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        return emailRegex.test(input.value);
    }
}