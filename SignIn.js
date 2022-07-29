class SignIn {
  email;
  password;
  form;
  root;
  main;
  url;
  constructor(url) {
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.form = document.getElementById("login");
    this.root = document.getElementById("root");
    this.main = document.getElementById("main");
    this.url = url;
    this.form.onsubmit = (e) => this.connexion(e);
  }

  async getUsers() {
    const reponse = await fetch(`${this.url}/users`);

    const datas = await reponse.json();

    return datas;
  }
  async connexion(e) {
    e.preventDefault();

    const credentials = {
      email: this.email.value,
      motDePasse: this.password.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
    const NOTIFICATION_TITLE = "Bienvenue";

    const reponse = await fetch(`${this.url}/login`, options);
    const datas = await reponse.json();
    console.log(datas);

    if (datas.token && datas.user) {
      localStorage.setItem("token", datas.token);
      localStorage.setItem("user", JSON.stringify(datas.user));
      new Notification(NOTIFICATION_TITLE, {
        body: [datas.user.prenom + " " + datas.user.nom],
      });
      window.location.href = "./index.html";
    }
  }
}
export default new SignIn("https://api-evenement-cda.herokuapp.com/api");
