import React, { Component } from "react";
import MainView from "./MainView";
import { startActivityForResult, rateApp } from "../../utils";
import { inject, observer } from "mobx-react";
import { DrawerActions } from "react-navigation";
import { observable } from "mobx";
import categoryData from "../../assets/data/category";

@inject("store")
@observer
export default class MainScreen extends Component {
  @observable
  textSearch = "";

  constructor(props) {
    super(props);
    this.myCategory = categoryData;
  }

  componentDidMount() {
    if (!this.props.store.shownRate) {
      rateApp();
      this.props.store.shownRate = true;
    }
  }

  callBack = (key, data) => {
    switch (key) {
      case "CHANGE_TEXT":
        this.textSearch = data;
        if (this.textSearch != "") {
          this.myCategory = [];
          categoryData.map(e => {
            if (
              e[this.props.store.appLanguage]
                .toLowerCase()
                .indexOf(this.textSearch.toLowerCase().trim()) > -1
            ) {
              this.myCategory.push(e);
            }
          });
        } else {
          this.myCategory = categoryData;
        }

        break;
      case "GO_TO_LISTWORD_SCREEN":
        startActivityForResult(this.props.navigation, "ListWord", data);
        break;
      case "OPEN_MENU":
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <MainView
        {...this.props}
        myCategory={this.myCategory}
        callBack={this.callBack}
        textSearch={this.textSearch}
      />
    );
  }
}
