import {all} from 'redux-saga/effects';
import {
    watchBackScreen,
    watchChangeScreen,
    watchResetScreen
} from "../navigation/redux/navigation_sagas";

import{
    watchLoading,
    watchUploadFile,
    watchLogin,
    watchTabBar,
    watchGetToken,
    watchSetting,
    watchGetCDN,

    watchAttachPropose,
    watchEditAttachPropose,

    watchListMenuHome,
    watchListMenuMSS,

    watchGetListCompany,
    watchGetBadge,
    watchUpdateBadge,
    watchAddDevice,
    watchRemoveDevice
} from "../redux/main/main_sagas";

import{
    watchListMenu,
    watchListNoty,
    watchUpdateStatusNoty,
    watchClearListMenu,
    watchGetVoucherNum,
    watchClearListNoty,
} from "../redux/home/home_sagas";

import {
    watchListInventory,
    watchListProject,
    watchListWareHouse,
    watchListExportWH,
    watchDetailExportWH,
    watchEditDetailExportWH,
    watchAddExportWH,
    watchEditExportWH,
    watchRemoveExportWH,
    watchGetDefaultExportWHr
} from "../redux/xuat_kho_vat_tu/xkvt_sagas";

import {
    watchListProposeType,
    watchListDeliveryVoucher,
    watchListEmployee,

    watchGetStatusName,
    watchDetailPropose,
    watchGetListPropose,
    watchAddVoucherPropose,
    watchEditVoucherPropose,
    watchDeleteVoucherPropose,
    watchGetListInventoryPropose,
    watchGetCbDefaultPropose,

} from "../redux/de_xuat_vat_tu/dxvt_sagas";

import {
    watchListReason,
    watchListStatus,
    watchGetListMDIVoucher,
    watchAddMDIVoucher,
    watchDetailMDIVoucher,
    watchEditMDIVoucher,
    watchDeleteMDIVoucher,
    watchGetCbDefaultMDIVoucher,
} from "../redux/tra_hang_ve_kho_tong/thvkt_sagas";

import {
    watchGetListWaitingWH,
    watchGetListConfirmWH,
    watchGetListAllWH,
    watchGetDetailConfirmWH,
    watchGetVoucherConfirm,
    watchAppVoucherConfirm,
    watchRmVoucherConfirm,
} from "../redux/xac_nhan_nhap_kho/xnnk_sagas";

import {
    watchGetListWaitingRT,
    watchGetListConfirmRT,
    watchGetListAllRT,
    watchGetDetailConfirmRT,
    watchGetVoucherConfirmRT,
    watchAppVoucherConfirmRT,
    watchRmVoucherConfirmRT,
} from "../redux/xac_nhan_yeu_cau_tra_hang/xnycth_sagas";

import {
    watchGetListProjects,
    watchGetListInventoryKKK,
    watchDetailInventoryKKK,
    watchCreateRequestInventory,
    watchDeleteInventoryKKK,
    watchDeleteRequestInventory,
    watchEditRequestInventory,
    watchAddInventoryKKK,
    watchGetInventory,
} from "../redux/kiem_ke_kho/kiemkekho_sagas";

import {
    watchGetListWaitingProposal,
    watchGetListConfirmProposal,
    watchGetListAllProposal,
    watchGetDetailConfirmProposal,
    watchRmVoucherProposal,
    watchGetVoucherInventoryProposal,
    watchAppVoucherProposal,
} from "../redux/xac_nhan_de_xuat_vat_tu/xndxvt_sagas";

import {
    watchGetListWaitingBorrow,
    watchGetListConfirmBorrow,
    watchGetListAllBorrow,
    watchGetDetailConfirmBorrow,
    watchRmVoucherBorrow,
    watchGetCaptionBorrow,
    watchGetNewIDConfirmBorrow,
    watchAppRVoucherBorrow,
} from "../redux/xac_nhan_cho_muon_tai_san/xncmts_sagas";

import {
    watchGetListBroken,
    watchGetDetailBroken,
    watchGetPhenomenaBroken,
    watchGetComboDefaultBroken,
    watchGetListChoosePhenomenaBroken,
    watchGetListInventoryBroken,
    watchAddVoucherBroken,
    watchDelVoucherBroken,
    watchEditVoucherBroken,
} from "../redux/phieu_bao_hong/baohong_sagas";

import {
    watchGetListWaitingReceived,
    watchGetListConfirmReceived,
    watchGetListAllReceived,
    watchGetDetailConfirmReceived,
    watchRmVoucherReceived,
    watchAppRVoucherReceived,
} from "../redux/xac_nhan_tai_san_da_nhan/xntsdn_sagas";

export default function* rootSaga() {
    yield all([
        watchChangeScreen(),
        watchResetScreen(),
        watchBackScreen(),

        watchLoading(),
        watchUploadFile(),
        watchLogin(),
        watchTabBar(),
        watchGetToken(),
        watchSetting(),
        watchGetCDN(),

        watchAttachPropose(),
        watchEditAttachPropose(),

        watchListMenuHome(),
        watchListMenuMSS(),

        watchGetListCompany(),
        watchGetBadge(),
        watchUpdateBadge(),
        watchAddDevice(),
        watchRemoveDevice(),

        //home
        watchListMenu(),
        watchListNoty(),
        watchUpdateStatusNoty(),
        watchClearListMenu(),
        watchGetVoucherNum(),
        watchClearListNoty(),

        watchListInventory(),
        watchListProject(),
        watchListWareHouse(),
        watchListExportWH(),
        watchDetailExportWH(),
        watchEditDetailExportWH(),
        watchAddExportWH(),
        watchEditExportWH(),
        watchRemoveExportWH(),
        watchGetDefaultExportWHr(),

        watchListProposeType(),
        watchListDeliveryVoucher(),
        watchListEmployee(),
        watchGetStatusName(),
        watchDetailPropose(),
        watchGetListPropose(),
        watchAddVoucherPropose(),
        watchEditVoucherPropose(),
        watchDeleteVoucherPropose(),
        watchGetListInventoryPropose(),
        watchGetCbDefaultPropose(),

        watchListReason(),
        watchListStatus(),
        watchGetListMDIVoucher(),
        watchAddMDIVoucher(),
        watchDetailMDIVoucher(),
        watchEditMDIVoucher(),
        watchDeleteMDIVoucher(),
        watchGetCbDefaultMDIVoucher(),

        watchGetListWaitingWH(),
        watchGetListConfirmWH(),
        watchGetListAllWH(),
        watchGetDetailConfirmWH(),
        watchGetVoucherConfirm(),
        watchAppVoucherConfirm(),
        watchRmVoucherConfirm(),

        watchGetListWaitingRT(),
        watchGetListConfirmRT(),
        watchGetListAllRT(),
        watchGetDetailConfirmRT(),
        watchGetVoucherConfirmRT(),
        watchAppVoucherConfirmRT(),
        watchRmVoucherConfirmRT(),

        watchGetListProjects(),
        watchGetListInventoryKKK(),
        watchDetailInventoryKKK(),
        watchCreateRequestInventory(),
        watchDeleteInventoryKKK(),
        watchDeleteRequestInventory(),
        watchEditRequestInventory(),
        watchAddInventoryKKK(),
        watchGetInventory(),

        watchGetListWaitingProposal(),
        watchGetListConfirmProposal(),
        watchGetListAllProposal(),
        watchGetDetailConfirmProposal(),
        watchRmVoucherProposal(),
        watchGetVoucherInventoryProposal(),
        watchAppVoucherProposal(),

        watchGetListWaitingBorrow(),
        watchGetListConfirmBorrow(),
        watchGetListAllBorrow(),
        watchGetDetailConfirmBorrow(),
        watchRmVoucherBorrow(),
        watchGetCaptionBorrow(),
        watchGetNewIDConfirmBorrow(),
        watchAppRVoucherBorrow(),

        watchGetListBroken(),
        watchGetDetailBroken(),
        watchGetPhenomenaBroken(),
        watchGetComboDefaultBroken(),
        watchGetListChoosePhenomenaBroken(),
        watchGetListInventoryBroken(),
        watchAddVoucherBroken(),
        watchDelVoucherBroken(),
        watchEditVoucherBroken(),

        watchGetListWaitingReceived(),
        watchGetListConfirmReceived(),
        watchGetListAllReceived(),
        watchGetDetailConfirmReceived(),
        watchRmVoucherReceived(),
        watchAppRVoucherReceived(),
    ])
}
