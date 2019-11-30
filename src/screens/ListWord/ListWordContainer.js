import React, { Component } from "react";
import { View } from "react-native";
import ListWordView from "./ListWordView";
import { getParamData, goBack, startActivityForResult } from "../../utils";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { NativeModules } from "react-native";
const Sound = NativeModules.RNSound;
import phraseData from "../../assets/data/phrase";
import categoryData from "../../assets/data/category";
import { AIBBanner } from "../../libs/AIBAds";

const voiceType = "_f";

@inject("store")
@observer
export default class ListWordScreen extends Component {
  @observable
  dataCategoryWord = [];

  @observable
  idWordOpening = 0;

  @observable
  reloadFavorite = 0;

  constructor(props) {
    super(props);
    this.categoryID = getParamData(this.props.navigation);
  }

  componentWillMount() {
    if (this.categoryID == 0) {
      this.props.store.favoriteIdArray.map(e => {
        this.dataCategoryWord.push(phraseData[e - 1]);
      });
    } else {
      this.dataCategoryWord = phraseData.filter(
        e => e.category_id == this.categoryID
      );
    }

    if (this.dataCategoryWord.length > 0) {
      this.dataCategoryWord.map(e => {
        if (this.props.store.favoriteIdArray.indexOf(e._id) > -1) {
          e.favorite = 1;
        }
      });
    }
  }

  _playSound = data => {
    if (data != null) {
      const songName = data.voice + voiceType;
      Sound.play(songName);
    }
  };

  callBack = (key, data = null) => {
    switch (key) {
      case "GO_BACK":
        goBack(this.props.navigation);
        break;

      case "CHANGE_ID_CARD":
        this.reloadFavorite++;
        if (this.idWordOpening != data) {
          this.idWordOpening = data;
        }

        break;

      case "GO_TO_EXAM":
        startActivityForResult(
          this.props.navigation,
          "Exam",
          this.dataCategoryWord
        );
        break;

      case "PLAY_SOUND":
        this._playSound(data);
        break;

      case "FAVORITE_PHRASE":
        // nhan index tu view truyen sang
        this.reloadFavorite++;
        let item = this.dataCategoryWord[data];
        if (item.favorite == "") {
          this.props.store._handleFavoriteId(item._id, "add");
          this.dataCategoryWord[data].favorite = 1;
        } else {
          this.props.store._handleFavoriteId(item._id, "remove");
          this.dataCategoryWord[data].favorite = "";
        }
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListWordView
          {...this.props}
          callBack={this.callBack}
          dataCategoryWord={this.dataCategoryWord}
          category={categoryData.filter(e => e._id == this.categoryID)[0]}
          idWordOpening={this.idWordOpening}
          reloadFavorite={this.reloadFavorite}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AIBBanner />
        </View>
      </View>
    );
  }
}
