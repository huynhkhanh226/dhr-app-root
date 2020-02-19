import React from 'react';
import {
    Easing,
    Animated,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-drawer';

import MainScreen from '../screens/main_screen/MainScreen.js';
import LoginScreen from '../screens/login_screen/LoginScreen.js';
import XuatKhoVatTuTabScreen from "../screens/xuatkho-vattu/XuatKhoVatTuTabScreen";
import XuatKhoVatTuScreen from "../screens/xuatkho-vattu/XuatKhoVatTuScreen";
import DanhSachXuatKhoScreen from "../screens/xuatkho-vattu/DanhSachXuatKhoScreen";
import ChiTietXuatKhoScreen from "../screens/chi_tiet_xuat_kho/ChiTietXuatKho";
import HomeScreen from "../screens/home_screen/HomeScreen";
import DuAnScreen from "../screens/du_an_screen/DuAnScreen";
import KhoScreen from "../screens/kho_screen/KhoScreen";
import VatTuScreen from "../screens/vat_tu_screen/VatTuScreen";

import DeXuatVatTuTabScreen from "../screens/de_xuat_vat_tu/DeXuatVatTuTabScreen";
import DeXuatVatTuScreen from "../screens/de_xuat_vat_tu/DeXuatVatTuScreen";
import DanhSachDeXuatScreen from "../screens/de_xuat_vat_tu/DanhSachDeXuatScreen";
import ChiTietDeXuatVatTuTabScreen from "../screens/de_xuat_vat_tu/ChiTietDeXuatVatTuTabScreen";
import ChiTietDeXuatScreen from "../screens/de_xuat_vat_tu/ChiTietDeXuatScreen";
import DanhSachDinhKemDXVTScreen from "../screens/de_xuat_vat_tu/DanhSachDinhKemDXVTScreen";
import DanhSachDeXuatVatTuScreen from "../screens/de_xuat_vat_tu/DanhSachDeXuatVatTuScreen";
import LoaiDeXuatScreen from "../screens/de_xuat_vat_tu/LoaiDeXuatScreen";
import DuAnDeXuatScreen from "../screens/de_xuat_vat_tu/DuAnDeXuatScreen";
import BanGiaoDeXuatScreen from "../screens/de_xuat_vat_tu/BanGiaoDeXuatScreen";
import NhanVienDeXuatScreen from "../screens/de_xuat_vat_tu/NhanVienDeXuatScreen";
import ChonVatTuDeXuatScreen from "../screens/de_xuat_vat_tu/ChonVatTuDeXuatScreen";
import DinhKemScreen from "../screens/de_xuat_vat_tu/DinhKemScreen";

import GopYVoiNhaPhatTrienScreen from "../screens/tro_giup/GopYVoiNhaPhatTrienScreen";
import ThongTinTaiKhoanScreen from "../screens/tro_giup/ThongTinTaiKhoanScreen";
import SettingScreen from "../screens/setting_screen/SettingScreen";

//Màn hình trả hàng về kho tổng
import TraHangVeKhoTongTabScreen from "../screens/tra_hang_ve_kho_tong/TraHangVeKhoTongTabScreen";
import TraHangVeKhoScreen from "../screens/tra_hang_ve_kho_tong/TraHangVeKhoScreen";
import DanhSachTraHangScreen from "../screens/tra_hang_ve_kho_tong/DanhSachTraHangScreen";
import ChonNguyenNhanScreen from "../screens/tra_hang_ve_kho_tong/ChonNguyenNhanScreen";
import ChiTietTraHangVeKhoTabScreen from "../screens/tra_hang_ve_kho_tong/ChiTietTraHangVeKhoTabScreen";
import ChiTietTraHangScreen from "../screens/tra_hang_ve_kho_tong/ChiTietTraHangScreen";
import DanhSachDinhKemTHVKScreen from "../screens/tra_hang_ve_kho_tong/DanhSachDinhKemTHVKScreen";
import DanhSachVatTuTHVKTScreen from "../screens/tra_hang_ve_kho_tong/DanhSachVatTuTHVKTScreen";
import ChonVatTuTHVKTScreen from "../screens/tra_hang_ve_kho_tong/ChonVatTuTHVKTScreen";


//Màn hình xác nhận nhập kho
import XacNhanNhapKhoTabScreen from "../screens/xac_nhan_nhap_kho/XacNhanNhapKhoTabScreen";
import ChoXacNhanScreen from "../screens/xac_nhan_nhap_kho/ChoXacNhanScreen";
import DaXacNhanScreen from "../screens/xac_nhan_nhap_kho/DaXacNhanScreen";
import TatCaScreen from "../screens/xac_nhan_nhap_kho/TatCaScreen";
import ChiTietNhapKhoTabScreen from "../screens/xac_nhan_nhap_kho/ChiTietNhapKhoTabScreen";
import ChiTietVatTuNhapKhoScreen from "../screens/xac_nhan_nhap_kho/ChiTietVatTuNhapKhoScreen";
import ChiTietPhieuNhapKhoScreen from "../screens/xac_nhan_nhap_kho/ChiTietPhieuNhapKhoScreen";
import DanhSachDinhKemNKScreen from "../screens/xac_nhan_nhap_kho/DanhSachDinhKemNKScreen";
import DuyetXacNhanNhapKhoScreen from "../screens/xac_nhan_nhap_kho/DuyetXacNhanNhapKhoScreen";

//Màn hình kiểm kê kho
import KiemKeKhoTabScreen from "../screens/kiem_ke_kho/KiemKeKhoTabScreen";
import KiemKeKhoScreen from "../screens/kiem_ke_kho/KiemKeKhoScreen";
import DanhSachKiemKeKhoScreen from "../screens/kiem_ke_kho/DanhSachKiemKeKhoScreen";
import ChiTietPhieuKiemKeTabScreen from "../screens/kiem_ke_kho/ChiTietPhieuKiemKeTabScreen";
import ChiTietPhieuKiemKeScreen from "../screens/kiem_ke_kho/ChiTietPhieuKiemKeScreen";
import DanhSachDinhKemKKKScreen from "../screens/kiem_ke_kho/DanhSachDinhKemKKKScreen";
import ChonDuAnKiemKeScreen from "../screens/kiem_ke_kho/ChonDuAnKiemKeScreen";
import ChonVatTuKKKScreen from "../screens/kiem_ke_kho/ChonVatTuKKKScreen";
import DanhSachVatTuKKKScreen from "../screens/kiem_ke_kho/DanhSachVatTuKKKScreen";

//Màn hình xác nhận yêu cầu trả hàng
import XacNhanTraHangKhoTabScreen from "../screens/xac_nhan_yeu_cau_tra_hang/XacNhanTraHangKhoTabScreen";
import ChoXacNhanTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/ChoXacNhanTraHangScreen";
import DaXacNhanTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/DaXacNhanTraHangScreen";
import TatCaTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/TatCaTraHangScreen";
import ChiTietXacNhanTraHangTabScreen from "../screens/xac_nhan_yeu_cau_tra_hang/ChiTietXacNhanTraHangTabScreen";
import ChiTietPhieuTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/ChiTietPhieuTraHangScreen";
import ChiTietVatTuTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/ChiTietVatTuTraHangScreen";
import DanhSachDinhKemTHScreen from "../screens/xac_nhan_yeu_cau_tra_hang/DanhSachDinhKemTHScreen";
import DuyetXacNhanTraHangScreen from "../screens/xac_nhan_yeu_cau_tra_hang/DuyetXacNhanTraHangScreen";


//Màn hình xác nhận đề xuất vật tư
import XacNhanDeXuatVatTuTabScreen from "../screens/xac_nhan_de_xuat_vat_tu/XacNhanDeXuatVatTuTabScreen";
import ChoXacNhanDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/ChoXacNhanDeXuatScreen";
import DaXacNhanDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/DaXacNhanDeXuatScreen";
import TatCaDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/TatCaDeXuatScreen";
import ChiTietDeXuatTabScreen from "../screens/xac_nhan_de_xuat_vat_tu/ChiTietDeXuatTabScreen";
import ChiTietVatTuDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/ChiTietVatTuDeXuatScreen";
import ChiTietPhieuDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/ChiTietPhieuDeXuatScreen";
import DanhSachDinhKemDXScreen from "../screens/xac_nhan_de_xuat_vat_tu/DanhSachDinhKemDXScreen";
import DuyetXacNhanDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/DuyetXacNhanDeXuatScreen";
import ChonVatTuXacNhanDeXuatScreen from "../screens/xac_nhan_de_xuat_vat_tu/ChonVatTuXacNhanDeXuatScreen";

//Màn hình xác nhận cho mượn tài sản
import XacNhanChoMuonTaiSanTabScreen from "../screens/xac_nhan_cho_muon_tai_san/XacNhanChoMuonTaiSanTabScreen";
import ChoXacNhanChoMuonTaiSanScreen from "../screens/xac_nhan_cho_muon_tai_san/ChoXacNhanChoMuonTaiSanScreen";
import DaXacNhanChoMuonTaiSanScreen from "../screens/xac_nhan_cho_muon_tai_san/DaXacNhanChoMuonTaiSanScreen";
import TatCaXNChoMuonTaiSanScreen from "../screens/xac_nhan_cho_muon_tai_san/TatCaXNChoMuonTaiSanScreen";
import ChiTietXNChoMuonTSTabScreen from "../screens/xac_nhan_cho_muon_tai_san/ChiTietXNChoMuonTSTabScreen";
import ChiTietPhieuChoMuonTSScreen from "../screens/xac_nhan_cho_muon_tai_san/ChiTietPhieuChoMuonTSScreen";
import ChiTietVatTuChoMuonTSScreen from "../screens/xac_nhan_cho_muon_tai_san/ChiTietVatTuChoMuonTSScreen";
import DanhSachDinhKemChoMuonTSScreen from "../screens/xac_nhan_cho_muon_tai_san/DanhSachDinhKemChoMuonTSScreen";
import DuyetXacNhanChoMuonTSScreen from "../screens/xac_nhan_cho_muon_tai_san/DuyetXacNhanChoMuonTSScreen";

//Màn hình Phiếu báo hỏng
import PhieuBaoHongTabScreen from "../screens/phieu_bao_hong/PhieuBaoHongTabScreen";
import PhieuBaoHongScreen from "../screens/phieu_bao_hong/PhieuBaoHongScreen";
import DanhSachPhieuBaoHongScreen from "../screens/phieu_bao_hong/DanhSachPhieuBaoHongScreen";
import ChiTietPhieuBaoHongTabScreen from "../screens/phieu_bao_hong/ChiTietPhieuBaoHongTabScreen";
import ChiTietPhieuBaoHongScreen from "../screens/phieu_bao_hong/ChiTietPhieuBaoHongScreen";
import ChiTietVatTuBaoHongScreen from "../screens/phieu_bao_hong/ChiTietVatTuBaoHongScreen";
import DanhSachDinhKemPBHScreen from "../screens/phieu_bao_hong/DanhSachDinhKemPBHScreen";
import ChonHienTuongScreen from "../screens/phieu_bao_hong/ChonHienTuongScreen";
import ChonVatTuPhieuBaoHongScreen from "../screens/phieu_bao_hong/ChonVatTuPhieuBaoHongScreen";
import DanhSachVatTuPhieuBaoHongScreen from "../screens/phieu_bao_hong/DanhSachVatTuPhieuBaoHongScreen";

//Màn hình Xác nhận tài sản đã nhận
import XacNhanTaiSanDaNhanTabScreen from "../screens/xac_nhan_tai_san_da_nhan/XacNhanTaiSanDaNhanTabScreen";
import ChoXacNhanTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/ChoXacNhanTaiSanDaNhanScreen";
import DaXacNhanTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/DaXacNhanTaiSanDaNhanScreen";
import TatCaXacNhanTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/TatCaXacNhanTaiSanDaNhanScreen";
import ChiTietXNTaiSanDaNhanTabScreen from "../screens/xac_nhan_tai_san_da_nhan/ChiTietXNTaiSanDaNhanTabScreen";
import ChiTietPhieuTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/ChiTietPhieuTaiSanDaNhanScreen";
import ChiTietVatTuTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/ChiTietVatTuTaiSanDaNhanScreen";
import DanhSachDinhKemTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/DanhSachDinhKemTaiSanDaNhanScreen";
import DuyetXacNhanTaiSanDaNhanScreen from "../screens/xac_nhan_tai_san_da_nhan/DuyetXacNhanTaiSanDaNhanScreen";

import HomeScreen2 from '../screens/home_screen/HomeScreen2';

const transitionConfig = {
    transitionSpec: {
        duration: 750,
        easing: Easing.step0,
        timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] }
    },
};

const HomeStack = createStackNavigator(
    {
        HomeScreen2: HomeScreen2,
        HomeScreen: HomeScreen,
        XuatKhoVatTuTabScreen: XuatKhoVatTuTabScreen,
        XuatKhoVatTuScreen: XuatKhoVatTuScreen,
        DanhSachXuatKhoScreen: DanhSachXuatKhoScreen,
        ChiTietXuatKhoScreen: ChiTietXuatKhoScreen,
        DuAnScreen: DuAnScreen,
        KhoScreen: KhoScreen,
        VatTuScreen: VatTuScreen,

        DeXuatVatTuTabScreen: DeXuatVatTuTabScreen,
        DeXuatVatTuScreen: DeXuatVatTuScreen,
        DanhSachDeXuatScreen: DanhSachDeXuatScreen,
        ChiTietDeXuatVatTuTabScreen: ChiTietDeXuatVatTuTabScreen,
        ChiTietDeXuatScreen: ChiTietDeXuatScreen,
        DanhSachDinhKemDXVTScreen: DanhSachDinhKemDXVTScreen,
        DanhSachDeXuatVatTuScreen: DanhSachDeXuatVatTuScreen,
        LoaiDeXuatScreen: LoaiDeXuatScreen,
        DuAnDeXuatScreen: DuAnDeXuatScreen,
        BanGiaoDeXuatScreen: BanGiaoDeXuatScreen,
        NhanVienDeXuatScreen: NhanVienDeXuatScreen,
        ChonVatTuDeXuatScreen: ChonVatTuDeXuatScreen,
        DinhKemScreen: DinhKemScreen,

        TraHangVeKhoTongTabScreen: TraHangVeKhoTongTabScreen,
        TraHangVeKhoScreen: TraHangVeKhoScreen,
        DanhSachTraHangScreen: DanhSachTraHangScreen,
        ChonNguyenNhanScreen: ChonNguyenNhanScreen,
        ChiTietTraHangVeKhoTabScreen: ChiTietTraHangVeKhoTabScreen,
        ChiTietTraHangScreen: ChiTietTraHangScreen,
        DanhSachDinhKemTHVKScreen: DanhSachDinhKemTHVKScreen,
        DanhSachVatTuTHVKTScreen: DanhSachVatTuTHVKTScreen,
        ChonVatTuTHVKTScreen: ChonVatTuTHVKTScreen,

        XacNhanNhapKhoTabScreen: XacNhanNhapKhoTabScreen,
        ChoXacNhanScreen: ChoXacNhanScreen,
        DaXacNhanScreen: DaXacNhanScreen,
        TatCaScreen: TatCaScreen,
        ChiTietNhapKhoTabScreen: ChiTietNhapKhoTabScreen,
        ChiTietVatTuNhapKhoScreen: ChiTietVatTuNhapKhoScreen,
        ChiTietPhieuNhapKhoScreen: ChiTietPhieuNhapKhoScreen,
        DanhSachDinhKemNKScreen: DanhSachDinhKemNKScreen,
        DuyetXacNhanNhapKhoScreen: DuyetXacNhanNhapKhoScreen,

        KiemKeKhoTabScreen: KiemKeKhoTabScreen,
        KiemKeKhoScreen: KiemKeKhoScreen,
        DanhSachKiemKeKhoScreen: DanhSachKiemKeKhoScreen,
        ChiTietPhieuKiemKeTabScreen: ChiTietPhieuKiemKeTabScreen,
        ChiTietPhieuKiemKeScreen: ChiTietPhieuKiemKeScreen,
        DanhSachDinhKemKKKScreen: DanhSachDinhKemKKKScreen,
        ChonDuAnKiemKeScreen: ChonDuAnKiemKeScreen,
        ChonVatTuKKKScreen: ChonVatTuKKKScreen,
        DanhSachVatTuKKKScreen: DanhSachVatTuKKKScreen,


        XacNhanTraHangKhoTabScreen: XacNhanTraHangKhoTabScreen,
        ChoXacNhanTraHangScreen: ChoXacNhanTraHangScreen,
        DaXacNhanTraHangScreen: DaXacNhanTraHangScreen,
        TatCaTraHangScreen: TatCaTraHangScreen,
        ChiTietXacNhanTraHangTabScreen: ChiTietXacNhanTraHangTabScreen,
        ChiTietPhieuTraHangScreen: ChiTietPhieuTraHangScreen,
        ChiTietVatTuTraHangScreen: ChiTietVatTuTraHangScreen,
        DanhSachDinhKemTHScreen: DanhSachDinhKemTHScreen,
        DuyetXacNhanTraHangScreen: DuyetXacNhanTraHangScreen,


        XacNhanDeXuatVatTuTabScreen: XacNhanDeXuatVatTuTabScreen,
        ChoXacNhanDeXuatScreen: ChoXacNhanDeXuatScreen,
        DaXacNhanDeXuatScreen: DaXacNhanDeXuatScreen,
        TatCaDeXuatScreen: TatCaDeXuatScreen,
        ChiTietDeXuatTabScreen: ChiTietDeXuatTabScreen,
        ChiTietVatTuDeXuatScreen: ChiTietVatTuDeXuatScreen,
        ChiTietPhieuDeXuatScreen: ChiTietPhieuDeXuatScreen,
        DanhSachDinhKemDXScreen: DanhSachDinhKemDXScreen,
        DuyetXacNhanDeXuatScreen: DuyetXacNhanDeXuatScreen,
        ChonVatTuXacNhanDeXuatScreen: ChonVatTuXacNhanDeXuatScreen,

        XacNhanChoMuonTaiSanTabScreen: XacNhanChoMuonTaiSanTabScreen,
        ChoXacNhanChoMuonTaiSanScreen: ChoXacNhanChoMuonTaiSanScreen,
        DaXacNhanChoMuonTaiSanScreen: DaXacNhanChoMuonTaiSanScreen,
        TatCaXNChoMuonTaiSanScreen: TatCaXNChoMuonTaiSanScreen,
        ChiTietXNChoMuonTSTabScreen: ChiTietXNChoMuonTSTabScreen,
        ChiTietPhieuChoMuonTSScreen: ChiTietPhieuChoMuonTSScreen,
        ChiTietVatTuChoMuonTSScreen: ChiTietVatTuChoMuonTSScreen,
        DanhSachDinhKemChoMuonTSScreen: DanhSachDinhKemChoMuonTSScreen,
        DuyetXacNhanChoMuonTSScreen: DuyetXacNhanChoMuonTSScreen,

        PhieuBaoHongTabScreen: PhieuBaoHongTabScreen,
        PhieuBaoHongScreen: PhieuBaoHongScreen,
        DanhSachPhieuBaoHongScreen: DanhSachPhieuBaoHongScreen,
        ChiTietPhieuBaoHongTabScreen: ChiTietPhieuBaoHongTabScreen,
        ChiTietPhieuBaoHongScreen: ChiTietPhieuBaoHongScreen,
        ChiTietVatTuBaoHongScreen: ChiTietVatTuBaoHongScreen,
        DanhSachDinhKemPBHScreen: DanhSachDinhKemPBHScreen,
        ChonHienTuongScreen: ChonHienTuongScreen,
        ChonVatTuPhieuBaoHongScreen: ChonVatTuPhieuBaoHongScreen,
        DanhSachVatTuPhieuBaoHongScreen: DanhSachVatTuPhieuBaoHongScreen,

        GopYVoiNhaPhatTrienScreen: GopYVoiNhaPhatTrienScreen,
        ThongTinTaiKhoanScreen: ThongTinTaiKhoanScreen,
        SettingScreen: SettingScreen,

        XacNhanTaiSanDaNhanTabScreen: XacNhanTaiSanDaNhanTabScreen,
        ChoXacNhanTaiSanDaNhanScreen: ChoXacNhanTaiSanDaNhanScreen,
        DaXacNhanTaiSanDaNhanScreen: DaXacNhanTaiSanDaNhanScreen,
        TatCaXacNhanTaiSanDaNhanScreen: TatCaXacNhanTaiSanDaNhanScreen,
        ChiTietXNTaiSanDaNhanTabScreen: ChiTietXNTaiSanDaNhanTabScreen,
        ChiTietPhieuTaiSanDaNhanScreen: ChiTietPhieuTaiSanDaNhanScreen,
        ChiTietVatTuTaiSanDaNhanScreen: ChiTietVatTuTaiSanDaNhanScreen,
        DanhSachDinhKemTaiSanDaNhanScreen: DanhSachDinhKemTaiSanDaNhanScreen,
        DuyetXacNhanTaiSanDaNhanScreen: DuyetXacNhanTaiSanDaNhanScreen,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null
        }
    }
);


// const MainItem = createBottomTabNavigator(
//     {
//         HomeStack: HomeStack,
//         // PostStack: PostStack,
//     },
//     {
//         tabBarComponent: (props)=> <View/>,
//         navigationOptions: () => ({
//             header: (props)=> <View/>
//         }),
//     }
// );

const Main = createStackNavigator({
    MainScreen: MainScreen,
    // SimpleTabs: SimpleTabs,
    HomeStack: HomeStack
}, {
    headerMode: 'none',
    drawerWidth: 0,
    drawerPosition: 'left',
    contentComponent: (props) => <View {...props} />
});

const Root = createStackNavigator({
    Main: Main,
    LoginScreen: LoginScreen,
}, {
    headerMode: 'none',
    initialRouteName: 'Main',
    navigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => (transitionConfig),
    cardStyle: {
        opacity: 1,
        shadowColor: 'transparent',
        backgroundColor: 'transparent'
    }
});

export default Root;
