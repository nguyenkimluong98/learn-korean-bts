import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import { MyMenuDrawer } from "../components/index";
import SplashScreen from "../screens/Splash/SplashContainer";
import MainScreen from "../screens/Main/MainContainer";
import MoreAppsScreen from "../screens/MoreApps/MoreApps";
import ListWordScreen from "../screens/ListWord/ListWordContainer";
import ExamScreen from "../screens/Exam/ExamContainer";
import FinishExamScreen from "../screens/FinishExam/FinishExamContainer";

const MenuDrawer = createDrawerNavigator(
  {
    MainScreen: {
      screen: MainScreen
    },
    ListWord: {
      screen: ListWordScreen
    }
  },
  {
    initialRouteName: "MainScreen",
    contentComponent: MyMenuDrawer
  }
);

const RootNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
    },
    MenuDrawer: {
      screen: MenuDrawer
    },
    Exam: {
      screen: ExamScreen
    },
    MoreAppsScreen: {
      screen: MoreAppsScreen
    },
    FinishExam: {
      screen: FinishExamScreen
    }
  },
  {
    headerMode: "none",
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        color: "white"
      },
      headerStyle: {
        backgroundColor: Colors.colorPrimary
      }
    })
  }
);

export default RootNavigator;
