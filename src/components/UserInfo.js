export default class UserInfo {
  constructor( profileInfoSelectors ){
      this._name = document.querySelector(profileInfoSelectors.name);
      this._occupation = document.querySelector(profileInfoSelectors.occupation);
  }

  getUserInfo() {
      return {
          name: this._name.textContent, 
          occupation: this._occupation.textContent
      }
  }

  setUserInfo(name, occupation) {
      this._name.textContent = name;
      this._occupation.textContent = occupation;
  }
}