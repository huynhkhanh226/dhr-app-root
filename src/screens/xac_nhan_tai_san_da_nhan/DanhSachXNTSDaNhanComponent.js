import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity, Image,
} from 'react-native';

import Config, {Scale} from '../../config';
import moment from 'moment';

class DanhSachXNTSDaNhanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isChecked: true,
        });
    }

    _goDetail = () => {
        if(this.props.goDetail) this.props.goDetail();
    };

    render() {
        let {value} = this.props;
        const isChecked = value && value.KindVoucherID && parseInt(value.KindVoucherID) === 3 ? 1 : 0;
        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: '#95989A',
            }}>
                <TouchableOpacity
                    style={styles.componentViewContainer}
                    onPress={this._goDetail}
                >
                    <View style={{height: '100%', width: !!isChecked ? '90%' : '100%'}}>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_So_phieu")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight}
                                  numberOfLines={1}>
                                {value.VoucherNo}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Nguoi_yeu_cau")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight}
                                  numberOfLines={1}>
                                {value.EmployeeName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Ngay_muon")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value && value.BorrowDate ? moment(value.BorrowDate).format('DD/MM/YYYY') : null}
                                {/*{value.BorrowDate}*/}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_CT_muon")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.BorrowProjectName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_CT_cho_muon")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.LendProjectName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Trang_thai")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.StatusName}
                            </Text>
                        </View>
                    </View>

                     <View style={styles.viewCheck}>
                         {!!isChecked && <Image style={styles.imageCheck}
                               source={require('../../assets/images/icon_check_box.png')}/>}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = {
    componentViewContainer: {
        flexDirection: 'row',
        paddingVertical: Scale(9),
        paddingHorizontal:Scale(15),
    },
    componentTextContainer: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
        paddingTop: Scale(12),
        paddingBottom: Scale(5)
    },
    componentViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    componentTextContent: {
        width: Scale(120),
        color: '#323232',
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(20)),
    },
    componentTextContentRight: {
        width: Scale(154),
        color: '#323232',
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(20)),
    },
    viewDashContent: {
        width: 1,
        height: Scale(8),
        backgroundColor: '#C1C1C1',
        marginRight: Scale(10),
    },
    componentFooter: {
        height: Scale(100),
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: Scale(10),
        justifyContent: 'flex-end',
    },
    componentTextFooter: {
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(12),
        color: '#F94F37',
        lineHeight: Math.floor(Scale(15)),
    },
    viewCheck: {
        width: '10%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCheck: {
        width: Scale(18),
        height: Scale(14)
    },
};

export default DanhSachXNTSDaNhanComponent;
