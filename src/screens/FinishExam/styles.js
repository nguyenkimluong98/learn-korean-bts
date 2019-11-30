import { StyleSheet } from "react-native";
import Color from "../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonCheck: {
    backgroundColor: Color.colorPrimary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    width: "100%",
    height: "10%",
    position: "absolute",
    bottom: 0
  },
  lineInfo: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between"
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  font: {
    fontSize: 16,
    fontWeight: "300",
    color: "gray"
  }
});
