import React, { Component } from "react";
import { Text, View, Image, TouchableNativeFeedback } from "react-native";
import styles from "./styles";
import { AIBToolbar } from "../../components";
import language from "../../assets/data/language";
import { observer } from "mobx-react";

@observer
export default class FinishExamView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AIBToolbar title={language[this.props.store.appLanguage]["result"]} />
        <Image
          source={require("../../assets/images/img_head_upgrade.png")}
          style={{ width: "100%", height: "30%" }}
        />
        <View style={[styles.lineInfo, { marginTop: 10 }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/ic_presentation_pause.png")}
              style={styles.icon}
            />
            <Text style={styles.font}>
              {language[this.props.store.appLanguage]["total"]}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>
            {this.props.data.total}
          </Text>
        </View>

        <View style={styles.lineInfo}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/ic_presentation_pause.png")}
              style={styles.icon}
            />
            <Text style={styles.font}>
              {language[this.props.store.appLanguage]["correct"]}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "green" }}>
            {this.props.data.correct}
          </Text>
        </View>

        <View style={styles.lineInfo}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/ic_presentation_pause.png")}
              style={styles.icon}
            />
            <Text style={styles.font}>
              {language[this.props.store.appLanguage]["incorrect"]}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "red" }}>
            {this.props.data.total - this.props.data.correct}
          </Text>
        </View>
        <TouchableNativeFeedback
          onPress={() => this.props.startActivity()}
          background={TouchableNativeFeedback.Ripple("lightblue", true)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={styles.buttonCheck}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              {language[this.props.store.appLanguage]["finish"]}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
