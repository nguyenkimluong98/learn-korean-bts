import React, { Component } from "react";
import ExamView from "./ExamView";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import { getParamData, goBack, startActivityForResult } from "../../utils";
import { NativeModules } from "react-native";
const Sound = NativeModules.RNSound;
import { showInter } from "../../utils/showIntern";

const voiceType = "_f";

@inject("store")
@observer
export default class ExamScreen extends Component {
  @observable
  answerID = -1;

  @observable
  currentAnsId = 0;

  @observable
  isOpenModalBox = false;

  @observable
  isPlaying = false;

  constructor(props) {
    super(props);
    this.dataPhraseExam = getParamData(this.props.navigation);
  }

  // tao mot mang random cac index
  componentWillMount() {
    // initialize
    this.keyRandomArray = [];
    this.answerArray = [];
    this.question = null;
    this.numCorrectAns = 0;
    this.typeQuestion = 1;

    for (let i = 0; i < this.dataPhraseExam.length; i++) {
      this.keyRandomArray.push(i);
    }

    let lengthTemp = this.dataPhraseExam.length;
    for (let i = this.dataPhraseExam.length - 1; i >= 0; i--) {
      // random tu 0 -> length
      let randomIndex = Math.floor(Math.random() * lengthTemp);

      // doi cho 2 phan tu
      this.keyRandomArray[i] = [
        this.keyRandomArray[randomIndex],
        (this.keyRandomArray[randomIndex] = this.keyRandomArray[i])
      ][0];

      lengthTemp--;
    }

    // khoi tao bo cau hoi dau tien
    this._createAnswer();
  }

  _createAnswer = () => {
    // lay id cau hoi hien tai theo mang random
    this.answerArray = [];
    this.question = this.dataPhraseExam[this.keyRandomArray[this.currentAnsId]];

    // random type question: chi co 3 loai
    this.typeQuestion = Math.floor(Math.random() * 3 + 1);

    // tao them 3 cau tra loi
    this.answerArray.push(this.question);
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * this.dataPhraseExam.length);

      // validate chi so vua random khong duoc trung va khac cau hoi
      // false = khong thoa man
      let validate = false;
      while (!validate) {
        // gia su thoa man
        validate = true;
        this.answerArray.map(e => {
          if (e._id == this.dataPhraseExam[random]._id) {
            validate = false;
          }
        });

        if (!validate) {
          random = Math.floor(Math.random() * this.dataPhraseExam.length);
        }
      }
      this.answerArray.push(this.dataPhraseExam[random]);
    }

    // random lai vi tri cua mang
    // trong answer array chi co dung 4 phan tu
    let lengthTemp = 4;
    for (let i = 3; i >= 0; i--) {
      let random = Math.floor(Math.random() * lengthTemp);
      this.answerArray[i] = [
        this.answerArray[random],
        (this.answerArray[random] = this.answerArray[i])
      ][0];
      lengthTemp--;
    }

    this._playSound(this.question);
  };

  _checkAnswer = data => {
    // kiem tra neu nguoi dung chon dap an thi moi thuc hien
    if (this.answerID == -1) return;
    showInter(10, () => {
      this.isOpenModalBox = true;
      if (data) {
        Sound.play("correct_f");
      }
    });
  };

  _playSound = data => {
    this.isPlaying = true;
    const songName = data.voice + voiceType;
    Sound.play(songName);
    this.isPlaying = false;
  };

  _handleAnswer = check => {
    this.isOpenModalBox = false;
    this.answerID = -1;
    this.currentAnsId++;
    if (this.currentAnsId == this.keyRandomArray.length) {
      startActivityForResult(this.props.navigation, "FinishExam", {
        total: this.dataPhraseExam.length,
        correct: this.numCorrectAns
      });
      this.numCorrectAns = 0;
      this.currentAnsId = 0;
      return;
    }
    this._createAnswer();
    if (check) {
      this.numCorrectAns++;
    }
  };

  render() {
    return (
      <ExamView
        {...this.props}
        question={this.question}
        answerArray={this.answerArray}
        answerID={this.answerID}
        callBack={this.callBack}
        isOpenModalBox={this.isOpenModalBox}
        isPlaying={this.isPlaying}
        currentAnsId={this.currentAnsId}
        dataPhraseExam={this.dataPhraseExam}
        typeQuestion={this.typeQuestion}
      />
    );
  }

  callBack = (key, data) => {
    switch (key) {
      case "CHOOSE_ANSWER":
        this.answerID = data;
        break;
      case "CHECK_ANSWER":
        this._checkAnswer(data);
        break;
      case "CLOSE_MODALBOX":
        this._handleAnswer(data);
        break;
      case "GO_BACK":
        goBack(this.props.navigation);
        break;
      case "PLAY_SOUND":
        this._playSound(this.question);
        break;
      case "RESET_EXAM":
        this.currentAnsId = 0;
        this._createAnswer();
        break;
      default:
        break;
    }
  };
}
