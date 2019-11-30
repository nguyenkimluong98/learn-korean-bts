import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import styles from "./styles";

export default class ListWordView extends Component {
  constructor(props) {
    super(props);
  }

  _renderWordItem = (item, index) => {
    const check = this.props.idWordOpening == index;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.callBack("CHANGE_ID_CARD", index)}
      >
        <ImageBackground
          style={styles.cardWrapper}
          source={
            check
              ? require("../../assets/images/rec2.png")
              : require("../../assets/images/rec1.png")
          }
        >
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("CHANGE_ID_CARD", index)}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "F black"
                }}
              >
                {item[this.props.store.appLanguage]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.props.callBack("FAVORITE_PHRASE", index);
            }}
          >
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={
                  item.favorite == ""
                    ? require("../../assets/images/emty_star.png")
                    : require("../../assets/images/star.png")
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { idWordOpening, dataCategoryWord, category } = this.props;
    const isFavoriteCategory = category._id == 0;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.showInfo}
          source={
            isFavoriteCategory
              ? require("../../assets/images/rec4.png")
              : require("../../assets/images/rec3.png")
          }
        >
          <View
            style={[
              styles.headerWrapper,
              !isFavoriteCategory ? { justifyContent: "space-between" } : null
            ]}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.callBack("GO_BACK")}
            >
              <View style={styles.iconWrapper}>
                <Image
                  style={{ width: 20, height: (20 * 80) / 92 }}
                  source={require("../../assets/images/back.png")}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.textHeader}>
              {this.props.category[this.props.store.appLanguage]}
            </Text>
            {!isFavoriteCategory ? (
              <TouchableWithoutFeedback
                onPress={() => this.props.callBack("GO_TO_EXAM")}
              >
                <View style={styles.iconWrapper}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../../assets/images/ic_exam.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>

          <TouchableWithoutFeedback
            onPress={() =>
              this.props.callBack("PLAY_SOUND", dataCategoryWord[idWordOpening])
            }
          >
            <View style={styles.showWordWrapper}>
              <View style={styles.mainWordWrapper}>
                <View style={styles.mainWord}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "F black",
                      marginBottom: 10,
                      textAlign: "center"
                    }}
                  >
                    {dataCategoryWord.length > 0
                      ? dataCategoryWord[idWordOpening].korean
                      : ""}
                  </Text>
                  <Text
                    style={{
                      color: "orange",
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "F thin",
                      marginBottom: 10,
                      textAlign: "center"
                    }}
                  >
                    {dataCategoryWord.length > 0
                      ? dataCategoryWord[idWordOpening].pinyin
                      : ""}
                  </Text>
                </View>
                <View style={styles.option}>
                  <Image
                    source={require("../../assets/images/play.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
              </View>
              <View style={styles.deco} />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>

        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={dataCategoryWord}
            renderItem={({ item, index }) => this._renderWordItem(item, index)}
            keyExtractor={({ index }) => index + ""}
            showsVerticalScrollIndicator={false}
            extraData={this.props.reloadFavorite}
          />
        </View>
      </View>
    );
  }
}
