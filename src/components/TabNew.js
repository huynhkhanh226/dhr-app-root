import {
    StyleSheet,
    View,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import Config, {Scale} from '../config';

import Svg,{
    Circle,
    Path
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

class TabBarItem extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let child = this.props.children;

        if (child.length && child.length > 0) {
            throw new Error("onlyChild must be passed a children with exactly one child.");
        }

        return (
            <View style={{flex: 1}}>
                {/*{child}*/}
            </View>
        );
    }
}

export default class TabBar extends Component{
    constructor(props) {
        super(props);

        if (this.props.children.length !== 3) {
            throw new Error("Three tab should be work.");
        }

        const defaultPage = (props.selectedIndex || props.selectedIndex === 0) ? props.selectedIndex : 1;

        this.state = {
            selectedIndex: defaultPage,
            defaultPage: defaultPage,
            navFontSize: 12,
            navTextColor: "rgb(148, 148, 148)",
            navTextColorSelected: 'rgb(51, 163, 244)',
            circleRadius: new Animated.Value(211+335*defaultPage),
            pathD: new Animated.Value(22+335*defaultPage),
            pathX: 22+335*defaultPage, //22 //357 //691 //1009
            pathY: 340+335*defaultPage, //340 //675 //1009
            pathA: 335+357*defaultPage, //352 //687 //1021
            pathB: 372+335*defaultPage, //372 //707 //1041
            circleX: 211+335*defaultPage, //211 //546 // 880
            showIcon: true
        };

        this.state.circleRadius.addListener( (circleRadius) => {
            this.setState({
                circleX: circleRadius.value.toString(),
            })
        });


        this.state.pathD.addListener( a => {
            this.setState({
                pathX: a.value.toString(),
                pathY: (318 + parseInt(a.value)).toString(),
                pathA: (330 + parseInt(a.value)).toString(),
                pathB: (350 + parseInt(a.value)).toString()
            })
        })
    }

    render() {
        const {
            children,
            backgroundTabView,
        } = this.props;
        const {
            selectedIndex,
            showIcon
        } = this.state;

        return(
            <View style={[styles.container,this.props.style, children[this.state.selectedIndex].props.screenBackgroundColor ?  children[this.state.selectedIndex].props.screenBackgroundColor : '#008080']}>
                {/*{children[selectedIndex]}*/}
                <View style={[styles.content]}>
                    <View style={styles.subContent}>
                        {
                            React.Children.map(children,  (child,i) => {
                                const imgSrc = selectedIndex ===i
                                    ?
                                    <View style={styles.circle}>
                                        <Image
                                            style={styles.navImage}
                                            resizeMode="contain"
                                            source={child.props.selectedIcon}
                                        />
                                    </View>
                                    :
                                    <Image
                                        style={styles.navImage}
                                        resizeMode="contain"
                                        source={child.props.icon}
                                    />;
                                return (

                                    <TouchableOpacity
                                        key={i}
                                        underlayColor={"transparent"}
                                        style={styles.navItem}
                                        onPress={() => this.update(i)}
                                    >

                                        {imgSrc}
                                    </TouchableOpacity>
                                );

                            })
                        }
                    </View>
                    <Svg version="1.1" id="bottom-bar" x="0px" y="0px" width='100%' height="100" viewBox="0 0 1092 260" space="preserve">
                        <AnimatedPath fill={backgroundTabView ? backgroundTabView : '#f0f0f0'} d={ `M30,60h${this.state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${this.state.pathY}.7,74.5,${this.state.pathA}.5,60,${this.state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z` }/>
                        <AnimatedCircle fill={backgroundTabView ? backgroundTabView : '#f0f0f0'} cx={this.state.circleX} cy="100" r="100"  />
                    </Svg>
                </View>
            </View>
        );
    }
    update = (index, flag) => {
        if(index === this.state.selectedIndex) return;
        let that = this;
        that.setState({
            selectedIndex: index,
            showIcon: false
        });
        let params = {toValue: 22,duration: 10, friction: 10};
        if(index === 0){
            Animated.spring( that.state.pathD, params).start();
            setTimeout(() => {
                that.setState({
                    showIcon: true
                })
            }, 10);
            Animated.spring( that.state.circleRadius, { toValue: 211, friction: 10 } ).start();
        } else if(index === 2){
            params = { toValue: 691,duration: 10, friction: 10 };
            Animated.spring( that.state.pathD, params).start();

            setTimeout(() => {
                that.setState({
                    showIcon: true
                })
            }, 10);
            Animated.spring( that.state.circleRadius, { toValue: 880, friction: 10 } ).start()
        } else{
            params = { toValue: 357,duration: 10, friction: 10 };
            Animated.spring( that.state.pathD, params).start();

            setTimeout(() => {
                that.setState({
                    showIcon: true
                })
            }, 10);
            Animated.spring( that.state.circleRadius, { toValue: 546, friction: 10 } ).start();
        }
        if(that.props.children[index].props.changeScreen && !flag) that.props.children[index].props.changeScreen();
    }
}
TabBar.Item = TabBarItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center'
    },
    content: {
        flexDirection:"column",
        zIndex: 0,
        width: Scale(Config.w  - 30),
        backgroundColor:'white',
        // left: '4%',
        // right: '4%',
    },
    subContent: {
        flexDirection: 'row',
        marginLeft: Scale(15),
        marginRight: Scale(15),
        marginBottom: Scale(10),
        zIndex: 1,
        // backgroundColor:'red',
        position: 'absolute',
        bottom: Scale(10),
    },
    navItem: {
        flex: 1,
        paddingTop: Scale(6),
        paddingBottom: Scale(6),
        alignItems: 'center',
        justifyContent:'center',
        // backgroundColor:'green',
        zIndex: 1,
    },
    navImage: {
        width: Scale(30),
        height: Scale(30),
        // backgroundColor:'red'
    },
    circle: {
        bottom: Scale(18),
        flexDirection:'row'
    }
});
