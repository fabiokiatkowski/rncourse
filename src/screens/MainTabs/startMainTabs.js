import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu': 'ios-menu', 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            id: 'drawer',
                            name: 'awesome-places.SideDrawerScreen',
                        },
                    },
                    center: {
                        bottomTabs: {
                            children: [
                                {
                                    stack: {
                                        children: [{
                                            component: {
                                                name: 'awesome-places.ShareScreen',
                                                passProps: {
                                                    text: 'Share Place'
                                                }
                                            }
                                        }],
                                        options: {
                                            bottomTab: {
                                                selectedIconColor: 'orange',
                                                text: 'Share Place',
                                                icon: sources[1],
                                                testID: 'FIRST_TAB_BAR_BUTTON'
                                            },
                                            topBar: {
                                                title: {
                                                    text: 'Share Place'
                                                },
                                                leftButtons: [
                                                    {
                                                        id: 'drawerButton',
                                                        icon: sources[2]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                },
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'awesome-places.FindScreen',
                                                    passProps: {
                                                        text: 'Find Place'
                                                    },
                                                    options: {
                                                        bottomTab: {
                                                            selectedIconColor: 'orange',
                                                            text: 'Find Place',
                                                            icon: sources[0],
                                                            testID: 'SECOND_TAB_BAR_BUTTON'
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Share Place'
                                                            },
                                                            leftButtons: [
                                                                {
                                                                    id: 'drawerButton',
                                                                    icon: sources[2]
                                                                }
                                                            ]
                                                        },
                                                    }
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        }
                    }
                },
            }
        })
        // Navigation.startTabBasedApp({
        //     tabs: [
        //         {
        //             screen: 'awesome-places.ShareScreen',
        //             label: 'Share Place',
        //             title: 'Share Place',
        //             icon: sources[1],
        //             navigatorButtons: {
        //                 leftButtons: [
        //                     {
        //                         icon: sources[2],
        //                         title: 'Menu',
        //                         id: 'sideDrawerToggle'
        //                     }
        //                 ]
        //             }
        //         },
        //         {
        //             screen: 'awesome-places.FindScreen',
        //             label: 'Find Place',
        //             title: 'Find Place',
        //             icon: sources[0],
        //             navigatorButtons: {
        //                 leftButtons: [
        //                     {
        //                         icon: sources[2],
        //                         title: 'Menu',
        //                         id: 'sideDrawerToggle'
        //                     }
        //                 ]
        //             }
        //         },
        //     ],
        //     tabsStyle: {
        //         tabBarSelectedButtonColor: 'orange'
        //     },
        //     drawer: {
        //         left: {
        //             screen: 'awesome-places.SideDrawerScreen'
        //         }
        //     },
        //     appStyle: {
        //         tabBarSelectedButtonColor: 'orange'
        //     }
        // });
    })
};

export default startTabs;
