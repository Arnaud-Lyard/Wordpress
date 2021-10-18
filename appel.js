/*Gestion du Logo + blog articles*/

var xhr = new XMLHttpRequest();
// On récupère les articles et les images au format JSON
xhr.open('GET', 'http://exemple.com/wp-json/wp/v2/posts?_embed', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'json';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {

            var myData = xhr.response;
            console.log(myData);
            //On boucle pour récupérer les résultats au format JSON
            for (var i = 0; i < myData.length; i++) {
                //Traitement sur les données récupérées
                let content = myData[i].excerpt.rendered.replace(/(<([^>]+)>)/ig, "");
                let full = myData[i].content.rendered.replace(/(<([^>]+)>)/ig, "");
                let idBtn = myData[i].id;

                // On stocke dans une variable le titre, l'image mise en avant, l'extrait et l'identifiant de l'article
                let x = "<div class='col12 col-md-6 col-lg-4'><div class='post'><div class='title'>" + myData[i].title.rendered + "</div>"
                + "<img class='img-post' src=" + myData[i]._embedded["wp:featuredmedia"][0].source_url + ">"
                + "<div class='preview'>" + myData[i].excerpt.rendered + "</div>"
                + "<a id='btn_" + idBtn + "'class='btn btn-dark btn-sm button'"
                + "data-id = '" + idBtn + "' >LIRE LA SUITE</a ></div></div>"

                    //On envoie les informations dans notre page HTML
                    document.getElementById("content").innerHTML += x;
                    document.addEventListener('click', function (e) {
                    if (e.target && e.target.id == 'btn_' + idBtn) {

                        // Get the modal
                        var modal = document.getElementById("myModal");

                        var mcontent = document.getElementById("m_content");
                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];



                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function () {
                            modal.style.display = "none";
                        }

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                        mcontent.innerHTML = full;
                        modal.style.display = "block";

                    }
                });




            }

            document.getElementById("logo").src = logo;
                //On envoie le contenu dans notre page HTML
                document.getElementById("content").innerHTML += x;
        }
    }
};

xhr.send(null);