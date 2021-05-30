const ts = 1;
const apiKey = "fd5d686fe3eff1ca35d2a27680c2734b";
const hash = "2afa3bf340a1bce4abf2f287dce8e9c3";
const baseUrl = "https://gateway.marvel.com";
const cards = document.querySelector(".cards-container");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const modalContent = document.querySelector(".modal-content");

function getChars() {
  fetch(
    `${baseUrl}/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json.catch(() => {
          console.error(response.status);
        });
      }
      return response.json();
    })
    .then((response) => {
      let card = document.createElement("div");
      let heroIdAtt = document.createAttribute("id");

      let heroImage = document.createElement("img");
      let heroImageAtt = document.createAttribute("src");
      let heroName = document.createElement("h2");
      //let heroDescription = document.createElement('p')
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.classList.add("hero-btn");
      response.data.results.map((element) => {
        heroIdAtt.value = element.id;
        btn.setAttributeNode(heroIdAtt);
        heroImageAtt.value = `${element.thumbnail.path}.${element.thumbnail.extension}`;
        heroImage.setAttributeNode(heroImageAtt);
        heroName.innerText = element.name;
        //heroDescription.innerText = element.description != '' ? element.description : "Hero don't have a description"
        btn.innerText = `View More about ${element.name}`;
        card.appendChild(heroImage);
        card.appendChild(heroName);
        //card.appendChild(heroDescription)
        card.appendChild(btn);
        card.classList.add("card");
        cards.innerHTML += card.outerHTML;
      });
    })
    .then((r) => {
      let buttons = document.querySelectorAll(".hero-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          console.log(btn.id);
          showInfo(btn.id);
          modal.classList.remove("hidden");
        });
        function showInfo(id) {
          fetch(
            `${baseUrl}/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`
          )
            .then((response) => {
              if (!response.ok) {
                return response.json.catch(() => {
                  console.error(response.status);
                });
              }
              return response.json();
            })
            .then((response) => {
              let card = document.createElement("div");
              let heroImage = document.createElement("img");
              let heroImageAtt = document.createAttribute("src");
              let heroName = document.createElement("h2");
              let heroDescription = document.createElement("p");

              let character = response.data.results.reduce(
                (element) => element
              );
              heroImageAtt.value = `${character.thumbnail.path}.${character.thumbnail.extension}`;
              heroImage.setAttributeNode(heroImageAtt);
              heroName.innerText = character.name;
              heroDescription.innerText =
                character.description != ""
                  ? character.description
                  : "Hero don't have a description";

              card.appendChild(heroImage);
              card.appendChild(heroName);
              card.appendChild(heroDescription);
              card.classList.add("card");
              console.log(card);

              modalContent.innerHTML += card.outerHTML;

              let comicCard = document.createElement("div");
              comicCard.classList.add("comic");
              let title = document.createElement("h3");
              title.innerText = `Available comics: ${character.comics.available}`;
              comicCard.appendChild(title);

              character.comics.items.forEach((comic) => {
                let comicLink = document.createElement("a");
                let comicLinkAtt = document.createAttribute("href");

                comicLinkAtt.value = comic.resourceURI;
                comicLink.innerText = comic.name;
                comicLink.setAttributeNode(comicLinkAtt);
                comicCard.appendChild(comicLink);
              });
              modalContent.innerHTML += comicCard.outerHTML;
            });
        }
      });
    });
}

getChars();

closeButton.addEventListener("click", () => {
  console.log("clicou");
  modal.classList.add("hidden");
});
