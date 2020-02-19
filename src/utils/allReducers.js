import {combineReducers} from 'redux';
import Navigation from '../navigation/redux/navigation_reducers';
import Main from '../redux/main/main_reducers';
import home from "../redux/home/home_reducers";
import xuat_kho_vat_tu from '../redux/xuat_kho_vat_tu/xkvt_reducers';
import de_xuat_vat_tu from '../redux/de_xuat_vat_tu/dxvt_reducers';
import tra_hang_ve_kho_tong from '../redux/tra_hang_ve_kho_tong/thvkt_reducers';
import xac_nhan_nhap_kho from '../redux/xac_nhan_nhap_kho/xnnk_reducers';
import xac_nhan_yeu_cau_tra_hang from '../redux/xac_nhan_yeu_cau_tra_hang/xnycth_reducers';
import kiem_ke_kho from '../redux/kiem_ke_kho/kiemkekho_reducers';
import xac_nhan_de_xuat from '../redux/xac_nhan_de_xuat_vat_tu/xndxvt_reducers';
import xac_nhan_cho_muon_tai_san from '../redux/xac_nhan_cho_muon_tai_san/xncmts_reducers';
import phieu_bao_hong from '../redux/phieu_bao_hong/baohong_reducers';
import xac_nhan_tai_san_da_nhan from '../redux/xac_nhan_tai_san_da_nhan/xntsdn_reducers';

export default combineReducers({
    nav: Navigation,
    main: Main,
    home: home,
    xkvt: xuat_kho_vat_tu,
    dxkvt: de_xuat_vat_tu,
    thvkt: tra_hang_ve_kho_tong,
    xnnk: xac_nhan_nhap_kho,
    xnycth: xac_nhan_yeu_cau_tra_hang,
    kiemkekho: kiem_ke_kho,
    xndxvt: xac_nhan_de_xuat,
    xncmts: xac_nhan_cho_muon_tai_san,
    baohong: phieu_bao_hong,
    xntsdn: xac_nhan_tai_san_da_nhan,
});
