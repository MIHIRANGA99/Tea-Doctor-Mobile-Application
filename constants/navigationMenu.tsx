import Home from "../Screens/Home";
import Index from "../Screens/MyPlants/Index";

export const NAVIGATION_MENU = [
    {
        name: 'plant',
        iconPath: require('../assets/icons/plant.png'),
        screen: <Index />
    },
    {
        name: 'messages',
        iconPath: require('../assets/icons/forum.png'),
        screen: ''
    },
    {
        name: 'home',
        iconPath: require('../assets/icons/home.png'),
        screen: <Home changeTab={() => null} />
    },
    {
        name: 'weather',
        iconPath: require('../assets/icons/weather.png'),
        screen: ''
    },
    {
        name: 'settings',
        iconPath: require('../assets/icons/settings.png'),
        screen: ''
    }
]