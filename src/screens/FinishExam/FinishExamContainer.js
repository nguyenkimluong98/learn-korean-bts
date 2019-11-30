import React, { Component } from "react";
import FinishExamView from "./FinishExamView";
import { startActivity, getParamData } from "../../utils";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class FinishExamScreen extends Component {
  constructor(props) {
    super(props);
    this.data = getParamData(this.props.navigation);
  }

  _startActivity = () => {
    startActivity(this.props.navigation, "MenuDrawer");
  };

  render() {
    return (
      <FinishExamView
        data={this.data}
        startActivity={this._startActivity}
        {...this.props}
      />
    );
  }
}
