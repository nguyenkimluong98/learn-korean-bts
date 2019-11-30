import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import asynStorage from "../config/asynStorage";

const typeCategory = ["english", "chinese", "vietnamese"];
class AppStore {
  @observable
  appLanguage = "english";

  @observable
  favoriteIdArray = [];

  @observable
  shownRate = false;

  @action
  _handleFavoriteId = (id, key = "add") => {
    if (key == "add") {
      this.favoriteIdArray.push(id);
    } else {
      let index = this.favoriteIdArray.indexOf(id);
      if (index > -1) {
        this.favoriteIdArray.splice(index, 1);
      }
    }

    this.setData(
      asynStorage.FAVORITE_PHRASE,
      JSON.stringify(this.favoriteIdArray)
    );
  };

  @action
  setData(key, data) {
    AsyncStorage.setItem(key, data).then();
  }
  @action
  getData(key, callBack) {
    AsyncStorage.getItem(key).then(res => {
      callBack(res);
    });
  }

  @action
  _changeAppLanguage = index => (this.appLanguage = typeCategory[index]);
}
export default new AppStore();
