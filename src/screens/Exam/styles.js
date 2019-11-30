import { StyleSheet } from "react-native";
import Constant from "../../constants/Constants";
import Color from "../../constants/Colors";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerWrapper: {
    width: "100%",
    height: "10%",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  imageHeader: {
    width: Constant.screen.width * 0.1,
    height: Constant.screen.width * 0.1
  },
  processBarWrapper: {
    height: 5,
    width: "60%",
    position: "relative",
    borderRadius: 2,
    backgroundColor: "lightgray"
  },
  processBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Color.colorPrimary,
    borderRadius: 2
  },
  content: {
    flex: 1,
    padding: "3.5%"
  },
  question: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  answer: {
    flex: 1
  },
  buttonCheck: {
    backgroundColor: Color.colorPrimary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    width: "100%",
    height: "15%"
  },
  modalBoxWrapper: {
    width: Constant.screen.width * 0.9,
    height: Constant.screen.height * 0.4,
    borderRadius: 10
  },
  modalBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
});
