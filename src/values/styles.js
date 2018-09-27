import { default as Colors, default as colors } from "./colors";
import { default as dimens, width } from "./dimens";

export const tvDefault = {
  color: Colors.textPrimary,
  fontSize: dimens.tvNormalDefault
};

export const tvDefaultBold = {
  ...tvDefault,
};

const viewParentBase = {
  flex: 1,
  backgroundColor: colors.background,
  flexDirection: "column"
};
const viewBase = { backgroundColor: Colors.linesPrimary };

export default {
  tvVerySmall: {
    ...tvDefault,
    fontSize: dimens.tvVerySmall
  },
  tvVerySmallBold: {
    ...tvDefaultBold,
    fontSize: dimens.tvVerySmall
  },
  tvSmall: {
    ...tvDefault,
    fontSize: dimens.tvSmall
  },
  tvSmallBold: {
    ...tvDefaultBold,
    fontSize: dimens.tvSmall
  },
  tvNormal: {
    ...tvDefault,
    fontSize: dimens.tvNormal
  },
  tvNormalBold: {
    ...tvDefaultBold,
    fontSize: dimens.tvNormal
  },
  tvLarge: {
    ...tvDefault,
    fontSize: dimens.tvLarge
  },
    tvLargeBold: {
    ...tvDefaultBold,
    fontSize: dimens.tvLarge
  },
  tvVeryLarge: {
    ...tvDefault,
    fontSize: dimens.tvVeryLarge
  },
  tvVeryLargeBold: {
    ...tvDefaultBold,
    fontSize: dimens.tvVeryLarge
  },
  viewHorizontal: {
    ...viewBase,
    width: "100%",
    height: dimens.lineThickness
  },
  viewVertical: {
    ...viewBase,
    height: "100%",
    width: dimens.lineThickness
  },
  viewParent: {
    ...viewParentBase,
    backgroundColor: Colors.background
  },
  viewParentPadding: {
    ...viewParentBase,
    padding: dimens.space_small
  },
  buttonDefault: {
    padding: 35,
    backgroundColor: Colors.primary
  },
  buttonDefaultSmall: {
    padding: 35,
    backgroundColor: Colors.primary
  },
  toolbar: {
    backgroundColor: Colors.primary
  },
  etLight: {
    ...tvDefault,
    padding: dimens.space_small
  },
  etDark: {
    ...tvDefault,
    width:"100%",
    textAlign:'center',
    padding: dimens.space_small
  },
  etDarkNew: {
    ...tvDefault,
    width:"70%",
    textAlign:'center',
    padding: dimens.space_small
  },
  ivBig: {
    width: dimens.ivBig,
    height: dimens.ivBig
  },
  ivMedium: {
    width: dimens.ivMedium,
    height: dimens.ivMedium
  },

  // custom---------------------------------------------------------------------------------------------------------

  vegIcon: {
    width: 10,
    height: 10
  },

  modalBottomCart: {
    justifyContent: "center",
    alignItems: "center",
    height: 400
  },

  modalPayment: {
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    height: 220
  },

  modalAppDialog: {
    backgroundColor: "transparent",
    alignItems: "center",
    padding: width(5),
    height: "100%",
    justifyContent: "center"
  },

  modelMenuList: {
    backgroundColor: "transparent",
    alignItems: "center",
    padding: width(5),
    height: '100%',
    justifyContent: "flex-end"
  },

  listTitle: {
    ...this.tvLargeDefault,
    color: colors.red
  },

  buttonMenuView: {
    position: "absolute",
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.red,
    bottom: 10,
    right: 10
  },

  buttonMenuIcon: {
    width: 13,
    height: 13,
    marginRight: 5
  },

  borderBlack: {
    margin: dimens.space_large,
    borderRadius: 1,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.black
  }
};
