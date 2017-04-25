import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Image,
    PanResponder,
    AppRegistry
} from 'react-native';
let screenH = Dimensions.get('window').height;
let screenW = Dimensions.get('window').width;
const homeButtonImage2x = require('./images/quick_add@2x.png');
const homeButtonImage3x = require('./images/quick_add@3x.png');
let scale = screenW / 375;
let plusButtonW = 44;
let quickImage;
    if (parseFloat(scale) > parseFloat(1.0)) {
      quickImage = homeButtonImage3x;
       plusButtonW = 66;
    } else {
      quickImage = homeButtonImage2x;
    }
let moreHeight = plusButtonW*2+25;
let plusButtonRight = 14;
let plusButtonBottom = 64;

export default class ReactNativeAnimatedShortcutMenu extends Component {
    constructor(props) {
        super(props);
            this.state = {
                        fadeAnim: new Animated.Value(0), 
                        isUnfolded:false,
                    };
            this.changeValue = this.changeValue.bind(this);
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderStart: (evt, gestureState) => {
                this.changeValue();
            },
        });
    }

    changeValue(){
        if(!this.state.isUnfolded){
            this.setState({
                isUnfolded:!this.state.isUnfolded
                 })
            Animated.spring(       
                this.state.fadeAnim,  
                    {
                        toValue: moreHeight, 
                        friction:5,
                    } 
                ).start();
        } else {
            Animated.timing(        
                this.state.fadeAnim,  
                    {
                        toValue: 0, 
                        duration:200,
                    } 
                ).start((finish)=>{
                        this.setState({
                            fadeAnim: new Animated.Value(0),
                            isUnfolded:!this.state.isUnfolded
                    }) });
        }
    }
    clickMoreBtn(index){
        if(!this.state.isUnfolded){
            Animated.spring(       
                this.state.fadeAnim,  
                    {
                        toValue: moreHeight, 
                        friction:10,
                    } 
                ).start((finish)=>{
                     this.setState({
                        fadeAnim: new Animated.Value(0),
                        isUnfolded:!this.state.isUnfolded
                 }) 
                    
            });
        } else {
            Animated.timing(        
                this.state.fadeAnim,  
                    {
                        toValue: 0, 
                        duration:200,
                    } 
                ).start((finish)=>{
                    alert(index);
                     this.setState({
                        fadeAnim: new Animated.Value(0),
                        isUnfolded:!this.state.isUnfolded
                 }) 
                });
        }
    }

    moreBtnView(plusBottom,plusRight){
        return this.state.isUnfolded ?
                <Animated.View style={{position:'absolute',bottom:plusBottom+plusButtonW+15,right:plusRight,height:this.state.fadeAnim,overflow: 'hidden'}}>
                    <View style={{borderRadius:plusButtonW/2.0,overflow:'hidden',top:0,right:0, width: plusButtonW,height: plusButtonW, backgroundColor :'#58AEEC',justifyContent :'center',alignItems :'center', }}>
                        <Text onPress={()=>{this.clickMoreBtn('Menu 1')}} numberOfLines={2}
                            style={{width: 44, textAlign:'center',fontSize:15,color :'white',}}>
                            Menu 1</Text>
                    </View>
                    <View style={{borderRadius:plusButtonW/2.0,overflow:'hidden',top:20,right:0, width: plusButtonW,height: plusButtonW, backgroundColor :'#58AEEC',justifyContent :'center',alignItems :'center', }}>
                        <Text onPress={()=>{this.clickMoreBtn('Menu 2')}} numberOfLines={2}
                            style={{width: 44, textAlign:'center',fontSize:15,color :'white',}}>
                            Menu 2</Text>
                    </View>
                </Animated.View> : null;
    } 
    render() {
        let bgRight = plusButtonRight,bgBottom=plusButtonBottom,bgHeight=plusButtonW,bgWidth=plusButtonW,plusBottom=0,plusRight=0;
        if(this.state.isUnfolded) {
            bgRight = 0,bgBottom=0,bgHeight=screenH,bgWidth=screenW,plusBottom=plusButtonBottom,plusRight=plusButtonRight;
        }
        return (
            <View {...this._panResponder.panHandlers}
            style={{position:'absolute',bottom:bgBottom, flexDirection:'column',right:bgRight,height:bgHeight,width:bgWidth,}}>
                    {this.moreBtnView.bind(this)(plusBottom,plusRight)}
                    <TouchableWithoutFeedback onPress={this.changeValue} >
                        <Animated.Image style={{position:'absolute',bottom:plusBottom,right:plusRight, width: plusButtonW, 
                                        height: plusButtonW, alignSelf: 'center', transform:[{rotate: this.state.fadeAnim.interpolate({
                                            inputRange:[0,moreHeight],
                                            outputRange:['0deg','90deg']
                                        })}]}}
                            source={quickImage}/>
                    </TouchableWithoutFeedback>
                
            </View>
     );
    }

}


AppRegistry.registerComponent('ReactNativeAnimatedShortcutMenu', () => ReactNativeAnimatedShortcutMenu);
