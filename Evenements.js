export default class Evenement {
  root;
  main;
  api;
  imageApi;
  defaultImg;
  idParticipant;
  token;

  constructor() {
    this.root = document.getElementById("root");
    this.main = document.getElementById("main");
    this.api = window.electronApi.apiUrl;
    this.imageApi = window.electronApi.image;
    this.defaultImg = window.electronApi.default;
    this.deconnexion();
    this.token = localStorage.getItem('token');
  }

  /**Récupération de tous les événements */
  async getEvenements() {
    const reponse = await fetch(`${this.api}/evenements/${this.idParticipant}`);
    const datas = await reponse.json();
    console.log(datas);
    return datas;
  }

   /**S'inscrire  à un événement */
   async subscribeEvenement(idEvent) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token
      }
    }
    const reponse = await fetch(`${this.api}/evenement/participant/${idEvent}/${this.idParticipant}`, options);
    const datas = await reponse.json();
    if (reponse.status === 200) {
      window.location.reload()
    }
  }


  /**Se désinscrire  à un événement */
  async unsubscribeEvenement(idEvent) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token
      }
    }
    const reponse = await fetch(`${this.api}/evenement/participant/${idEvent}/${this.idParticipant}`, options);
    const datas = await reponse.json();
    if (reponse.status === 200) {
      window.location.reload()
    }
  }

  /**Mettre l'image  */
  setImageEv(url) {
    const image = document.createElement("img");
    const urlImg = this.imageApi + url;
    image.src = urlImg;
    image.onerror = () => {
      image.src = this.defaultImg;
    };
    return image;
  }

  /** Construit et affiche un événement dans le DOM  */
  setDOMEvenement(evenement) {
    const imgDiv = document.createElement("div");
    const divInfos = document.createElement("div");

    divInfos.setAttribute("id", "divInfos");
    imgDiv.setAttribute("id", "imagesEvent");
    const article = document.createElement("article");
    article.setAttribute("id", "evenement");
    const titre = document.createElement("h3");
    titre.textContent = evenement.titre;
    const imgEv = this.setImageEv(evenement.image);
    const lieu = this.setParagraph(evenement.nomLieu);
    const organisateur = this.setParagraph(evenement.nomOrganisateur);

    const placesRestantes = this.setParagraph(evenement.placesRestantes);

    let button;
    if (evenement.inscription === "non-inscrit") {
      button = this.inscription("S'inscrire", evenement.idEvenement);
    } else {
      button = this.desinscription('Se désinscrire', evenement.idEvenement)
    }

    this.root.append(this.main);
    this.main.append(article);
    article.append(titre, imgDiv, divInfos, button);
    imgDiv.append(imgEv);
    divInfos.append(lieu, organisateur, placesRestantes);
  }

  /**Créee un paragraphe dans le DOM */
  setParagraph(para) {
    const p = document.createElement("p");
    p.textContent = para;
    return p;
  }

  /**Crée un bouton déconnexion */
  deconnexion() {
    const logout = document.getElementById("logout");
    const getToken = localStorage.getItem("token");
    const getUser = localStorage.getItem("user");
    const user = JSON.parse(getUser);
    this.idParticipant = user?.idParticipant;
    if (getToken && getUser) {
      logout.addEventListener("click", async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "./login.html";
      });
    }
  }

  /**Crée un bouton inscription */
  inscription(label, idEvent) {
    const btnInscription = document.createElement("button");
    btnInscription.onclick = ()=>{
      this.subscribeEvenement(idEvent);
    }
    btnInscription.textContent = label;
    return btnInscription;
  }

  /**Crée un bouton désinscription */
  desinscription(label, idEvent) {
    const btnInscription = document.createElement("button");
    btnInscription.onclick = ()=>{
      this.unsubscribeEvenement(idEvent);
    }
    btnInscription.textContent = label;
    return btnInscription;
  }
}
