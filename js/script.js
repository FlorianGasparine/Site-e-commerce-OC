fetch ("http://localhost:3000/api/products")

    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })

    .then (function (value) {
        
        // Recuperation de tous les produits pour les inserer dans la page
        for(let requete of value){ 

            // Container (liens vers le produit)
            let newLink = document.createElement('a');
            let positionLink = document.querySelector('.items');
            document.texteContent = requete._id;
            newLink.setAttribute("href",`./product.html?id=${requete._id}`);
            positionLink.append(newLink);

            // Parent des balises images,nom,description
            let newArticle = document.createElement('article');
            newLink.append(newArticle);

            // Image
            let couchImage = requete.imageUrl;
            let newImage = document.createElement("img");
            newImage.setAttribute('src',couchImage);
            newImage.setAttribute('alt',requete.altTxt);
            newArticle.appendChild(newImage);

            // Nom
            let couchName = requete.name;
            let newH3 = document.createElement("h3");
            let newContentH3 = document.textContent = couchName;
            newH3.append(newContentH3);
            newH3.className = "productName";
            newArticle.appendChild(newH3);
            
            // Description
            let couchDescription = requete.description;
            let newP = document.createElement("p");
            let newContentP = document.texteContent = couchDescription;
            newP.append(newContentP);
            newP.className = "productDescription";
            newArticle.appendChild(newP);
        }
    })
    .catch (function(err) {
        alert("Une erreure est survenue " + "\n" + err);
    });
