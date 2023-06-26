import Home from "../Screens/Home";
import MyPlants from "../Screens/MyPlants";

export const NAVIGATION_MENU = [
    {
        name: 'plant',
        iconPath: require('../assets/icons/plant.png'),
        screen: <MyPlants />
    },
    {
        name: 'messages',
        iconPath: require('../assets/icons/forum.png'),
        screen: ''
    },
    {
        name: 'home',
        iconPath: require('../assets/icons/home.png'),
        screen: <Home />
    },
    {
        name: 'report',
        iconPath: require('../assets/icons/article.png'),
        screen: ''
    },
    {
        name: 'settings',
        iconPath: require('../assets/icons/settings.png'),
        screen: ''
    }
]