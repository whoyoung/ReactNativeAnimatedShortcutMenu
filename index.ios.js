/**
 * whoyoung
 * https://github.com/whoyoung/ReactNativeAnimatedShortcutMenu.git
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import ShortcutMenu from './shortcutMenu';
export default class ReactNativeAnimatedShortcutMenu extends Component {
    
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>shortcutMenu</Text>
                <ShortcutMenu />
            </View>
     );
    }

}


AppRegistry.registerComponent('ReactNativeAnimatedShortcutMenu', () => ReactNativeAnimatedShortcutMenu);
