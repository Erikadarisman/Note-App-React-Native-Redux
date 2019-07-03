import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import Note from "./Screen/Note";
import Home from "./Screen/Home";
import Edit from "./Screen/Edit";
import Drawer from "./Components/CustomDrawer";

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Note: Note,
    Edit: Edit
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const DrawerNotes = createDrawerNavigator(
  {
    Home: {
      screen: Home
    },
    Note: {
      screen: Note
    },
    Edit: {
      screen: Edit
    }
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: Drawer,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default createAppContainer(DrawerNotes, AppNavigator);
