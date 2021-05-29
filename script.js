const ts = 1
const apiKey = 'fd5d686fe3eff1ca35d2a27680c2734b'
const hash = '2afa3bf340a1bce4abf2f287dce8e9c3'
const baseUrl = 'https://gateway.marvel.com'
const cards = document.querySelector('.cards-container')
const heroButton = document.querySelector('.hero-btn')




function getChars(){
    fetch(`${baseUrl}/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
    .then(response => {
        if(!response.ok){
            return response.json
            .catch(()=>{
                console.error(response.status)
            })
        }
        return response.json()
    }).then(response =>{
        let card = document.createElement('div')
        let heroIdAtt = document.createAttribute('id')
        let heroImage = document.createElement('img')
        let heroImageAtt = document.createAttribute('src')
        let heroName = document.createElement('h2')
        //let heroDescription = document.createElement('p')
        let btn = document.createElement('button')
        btn.classList.add('btn')
        btn.classList.add('hero-btn')
        btn.setAttributeNode(heroIdAtt)



            response.data.results.map(element => {
            heroId.innerText = element.id
            heroImageAtt.value = `${element.thumbnail.path}.${element.thumbnail.extension}`
            heroImage.setAttributeNode(heroImageAtt)
            heroName.innerText = element.name
            //heroDescription.innerText = element.description != '' ? element.description : "Hero don't have a description" 
            btn.innerText = `View More about ${element.name}`
            card.appendChild(heroId)
            card.appendChild(heroImage)
            card.appendChild(heroName)
            //card.appendChild(heroDescription)
            card.appendChild(btn)
            card.classList.add('card')
            cards.innerHTML += card.outerHTML
        }).then(
            
        )
    })

}
getChars()


