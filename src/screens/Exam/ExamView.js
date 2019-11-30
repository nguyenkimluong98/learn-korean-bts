import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { Card, CardItem, Left } from "native-base";
import styles from "./styles";
import { observer } from "mobx-react";
import ModalBox from "react-native-modalbox";
import Colors from "../../constants/Colors";
import { AIBBanner } from "../../libs/AIBAds";
import language from "../../assets/data/language";

@observer
export default class ExamView extends Component {
  constructor(props) {
    super(props);
    this.checkAns = false;
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.question !== prevProps.question) {

  //   }
  // }

  _renderAnswerItem = (item, index) => {
    const check = this.props.answerID == index;
    const { typeQuestion } = this.props;
    const { appLanguage } = this.props.store;
    let answerStr = "";
    switch (typeQuestion) {
      // type 1: cho cau KO, tim nghia dung
      case 1:
        answerStr = item[appLanguage];
        break;

      // type 2: cho nghia, tim cau KO
      // type 3: khong cho gi, tim cau KO
      case 2:
        answerStr = item.korean;
        break;
      case 3:
        answerStr = item.korean;
        break;
      default:
        break;
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.callBack("CHOOSE_ANSWER", index)}
      >
        <Card>
          <CardItem
            style={{
              height: 50,
              backgroundColor: check ? Colors.colorPrimary : null
            }}
          >
            <Left>
              <Image
                style={[styles.imageHeader, { marginRight: 10 }]}
                source={
                  check
                    ? require("../../assets/images/ic_check_green.png")
                    : require("../../assets/images/ic_check_gray.png")
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: check ? "600" : "300",
                  color: check ? "white" : "gray"
                }}
              >
                {answerStr}
              </Text>
            </Left>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  _renderModalBox = () => {
    if (this.props.answerID == -1) return null;
    const { typeQuestion } = this.props;
    const { appLanguage } = this.props.store;
    let correctStr, fistAnswerStr, secondAnswerStr;
    const checkAnswer =
      this.props.question._id ==
      this.props.answerArray[this.props.answerID]._id;
    this.checkAns = checkAnswer;
    correctStr = checkAnswer
      ? `${language[this.props.store.appLanguage]["correct"]}`
      : `${language[this.props.store.appLanguage]["incorrect"]}`;
    switch (typeQuestion) {
      // type 1: cho cau KO, tim nghia dung
      case 1:
        fistAnswerStr = checkAnswer
          ? this.props.question.korean
          : `${language[this.props.store.appLanguage]["correctAns"]} ${
              this.props.question[appLanguage]
            }`;
        secondAnswerStr = checkAnswer
          ? this.props.answerArray[this.props.answerID][appLanguage]
          : `${language[this.props.store.appLanguage]["not"]} ${
              this.props.answerArray[this.props.answerID][appLanguage]
            }`;
        break;

      // type 2: cho nghia, tim cau KO
      case 2:
        fistAnswerStr = checkAnswer
          ? this.props.question.korean
          : `${language[this.props.store.appLanguage]["correctAns"]} ${
              this.props.question.korean
            }`;
        secondAnswerStr = checkAnswer
          ? this.props.answerArray[this.props.answerID][appLanguage]
          : `${language[this.props.store.appLanguage]["not"]} ${
              this.props.answerArray[this.props.answerID].korean
            }`;
        break;

      // chi cho nghe, tim cau KO
      case 3:
        fistAnswerStr = checkAnswer
          ? this.props.question.korean
          : `${language[this.props.store.appLanguage]["correctAns"]} ${
              this.props.question.korean
            }`;
        secondAnswerStr = checkAnswer
          ? `${language[this.props.store.appLanguage]["excellent"]}`
          : `${language[this.props.store.appLanguage]["goodluck"]}`;
        break;
      default:
        break;
    }

    return (
      <ModalBox
        isOpen={this.props.isOpenModalBox}
        swipeToClose={false}
        backdropPressToClose={false}
        style={styles.modalBoxWrapper}
      >
        <TouchableNativeFeedback
          onPress={() => this.props.callBack("CLOSE_MODALBOX", checkAnswer)}
          background={TouchableNativeFeedback.Ripple("lightblue", true)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={styles.modalBox}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: checkAnswer ? "yellowgreen" : "orange",
                marginBottom: 15
              }}
            >
              {correctStr}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  color: "gray",
                  marginBottom: 10
                }}
              >
                {fistAnswerStr}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  color: checkAnswer ? "yellowgreen" : "orange"
                }}
              >
                {secondAnswerStr}
              </Text>
            </View>
            <View style={[styles.buttonCheck, { width: "90%", height: "20%" }]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                {language[this.props.store.appLanguage]["next"]}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ModalBox>
    );
  };

  _createQuestion = () => {
    const { typeQuestion, question } = this.props;
    const { appLanguage } = this.props.store;
    let questionStr = "";
    switch (typeQuestion) {
      // type 1: cho cau KO, tim nghia dung
      case 1:
        questionStr = question.korean;
        break;

      // type 2: cho nghia, tim cau KO
      // type 3: khong cho gi, tim cau KO
      case 2:
        questionStr = question[appLanguage];
        break;
      default:
        break;
    }

    return questionStr;
  };

  render() {
    // alert(JSON.stringify(this.props.answerArray));
    return (
      <View style={styles.container}>
        {this._renderModalBox()}
        <View style={styles.headerWrapper}>
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("GO_BACK")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                style={styles.imageHeader}
                source={require("../../assets/images/ic_back.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.processBarWrapper}>
            <View
              style={[
                styles.processBar,
                {
                  width: `${(this.props.currentAnsId * 100) /
                    this.props.dataPhraseExam.length}%`
                }
              ]}
            />
          </View>

          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("RESET_EXAM")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                style={[styles.imageHeader, { tintColor: "lightgray" }]}
                source={require("../../assets/images/ic_reset.png")}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "black",
              fontStyle: "italic"
            }}
          >
            {language[this.props.store.appLanguage]["chooseCA"]}
          </Text>
          <View style={{ flex: 1, padding: "2%" }}>
            <View style={styles.question}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (this.props.isPlaying) return;
                  this.props.callBack("PLAY_SOUND");
                }}
              >
                <Image
                  style={[styles.imageHeader, { marginRight: 15 }]}
                  source={
                    this.props.isPlaying
                      ? require("../../assets/images/listen_focus.png")
                      : require("../../assets/images/listen.png")
                  }
                />
              </TouchableWithoutFeedback>
              <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>
                {this._createQuestion()}
              </Text>
            </View>
            <View>
              <FlatList
                data={this.props.answerArray}
                keyExtractor={({ index }) => index + ""}
                renderItem={({ item, index }) =>
                  this._renderAnswerItem(item, index)
                }
                extraData={this.props.answerID}
              />
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.callBack("CHECK_ANSWER", this.checkAns)
                }
                background={TouchableNativeFeedback.Ripple("lightblue", true)}
                useForeground={TouchableNativeFeedback.canUseNativeForeground()}
              >
                <View style={styles.buttonCheck}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {language[this.props.store.appLanguage]["check"]}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <AIBBanner />
        </View>
      </View>
    );
  }
}
