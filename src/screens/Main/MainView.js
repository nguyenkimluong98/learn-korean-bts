import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableNativeFeedback,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { observer } from "mobx-react";
import language from "../../assets/data/language";

@observer
export default class MainView extends Component {
  constructor(props) {
    super(props);
  }

  _renderCategoryWord = (item, index) => {
    // if (index == 0 && this.props.textSearch == "") return null;
    if (item._id == 0) return null;

    return (
      <TouchableNativeFeedback
        // gui sang 1 categoryID
        onPress={() => this.props.callBack("GO_TO_LISTWORD_SCREEN", item._id)}
        background={TouchableNativeFeedback.Ripple(Colors.colorPrimary, true)}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View>
          <ImageBackground
            source={item.img}
            style={[styles.categoryWrapper, { marginTop: index == 1 ? 10 : 0 }]}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "300",
                color: "black",
                fontFamily: "F black",
                marginLeft: 30
              }}
            >
              {item[this.props.store.appLanguage]}
            </Text>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/bg2.png")}
        style={styles.container}
      >
        <View style={styles.searchBarWrapper}>
          <TouchableWithoutFeedback
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => this.props.callBack("OPEN_MENU")}
          >
            <Image
              style={{ width: 30, height: (30 * 108) / 124 }}
              source={require("../../assets/images/menu.png")}
            />
          </TouchableWithoutFeedback>
          <ImageBackground
            style={styles.searchBar}
            source={require("../../assets/images/search.png")}
          >
            <TextInput
              underlineColorAndroid={"transparent"}
              autoCorrect={false}
              placeholder={language[this.props.store.appLanguage]["search"]}
              onChangeText={text => this.props.callBack("CHANGE_TEXT", text)}
              placeholderTextColor={"black"}
              style={{ flex: 1, paddingLeft: 15 }}
            />
          </ImageBackground>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.myCategory}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            this._renderCategoryWord(item, index)
          }
          extraData={this.props.textSearch}
          keyExtractor={({ index }) => index + ""}
        />
      </ImageBackground>
    );
  }
}
