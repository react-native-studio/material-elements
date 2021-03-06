/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet,Dimensions } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

import Color from 'color';
import merge from 'lodash/merge';

import { fontWeight } from './typography';
import {
    black, grey100, grey500, white, transparent, snackbarColor,toastColor,
} from './colors';

import lightTheme from './themes/light';
/* eslint-disable import/no-unresolved, import/extensions */
import getPlatformElevation from './getPlatformElevation';
/* eslint-enable import/no-unresolved, import/extensions */
import Metrics from './Metrics'
import {material,systemWeights} from 'react-native-typography'
function darkenOrLighten(color, ratio = 0.15) {
    const c = Color(color);
    return c.luminosity() > 0.5 ? c.darken(ratio) : c.lighten(ratio);
}

const {width,height}=Dimensions.get('window');
export default function getTheme(theme, ...more) {
    theme = merge(lightTheme, theme, ...more);

    const { spacing, typography, palette } = theme;
    const baseTheme = { spacing, typography, palette };

    theme = merge({
        actionButton: StyleSheet.create(merge({
            positionContainer: {
                position: 'absolute',
                bottom: 20,
                right: 20,
            },
            container: {
                height: spacing.actionButtonSize,
                width: spacing.actionButtonSize,
                borderRadius: spacing.actionButtonSize / 2,
                backgroundColor: palette.accentColor,
            },
            overlayContainer: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: Color('#000').alpha(0.2).toString(),
                // we need overlay to be above the toolbar - so maybe we could use some variable
                // to get elevation for toolbar and this overlay
                ...getPlatformElevation(4),
            },
            toolbarPositionContainer: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
            },
            toolbarContainer: {
                flex: 1,
                height: spacing.actionButtonSize,
                backgroundColor: palette.accentColor,
                flexDirection: 'row',
            },
            toolbarActionContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            speedDialContainer: {
                alignItems: 'flex-end',
            },
            speedDialActionContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 8,
            },
            speedDialActionIconContainer: {
                width: spacing.actionButtonSize,
                height: spacing.actionButtonSize,
                alignItems: 'center',
                justifyContent: 'center',
            },
            speedDialActionIcon: {
                ...getPlatformElevation(2),
                height: spacing.actionButtonSize - 16,
                width: spacing.actionButtonSize - 16,
                borderRadius: (spacing.actionButtonSize - 16) / 2,
                backgroundColor: grey500,
            },
            speedDialActionLabel: {
                color: palette.secondaryTextColor,
            },
            speedDialActionLabelContainer: {
                ...getPlatformElevation(2),
                borderRadius: 2,
                marginRight: 24,
                paddingVertical: 2,
                paddingHorizontal: 8,
                backgroundColor: grey100,
            },
            icon: {
                color: white,
            },
        }, theme.actionButton)),
        // https://material.google.com/layout/metrics-keylines.html#metrics-keylines-touch-target-size
        avatar: StyleSheet.create(merge({
            container: {
                width: spacing.avatarSize,
                height: spacing.avatarSize,
                borderRadius: spacing.avatarSize / 2,
                backgroundColor: darkenOrLighten(palette.canvasColor, 0.26).toString(),
                alignItems: 'center',
                justifyContent: 'center',
            },
            content: {
                color: palette.canvasColor,
            },
            image:{
              width: spacing.avatarSize,
              height: spacing.avatarSize,
              borderRadius: spacing.avatarSize / 2,
              //backgroundColor: darkenOrLighten(palette.canvasColor, 0.26).toString(),
              alignItems: 'center',
              justifyContent: 'center',
            },
        }, theme.avatar)),
        badge: StyleSheet.create(merge({
            outerContainer:{
              flexDirection: 'row',
            },
            container: {
                position: 'absolute',
                width: spacing.badgeSize,
                height: spacing.badgeSize,
                borderRadius: spacing.badgeSize/2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: palette.primaryColor,
                top:-8,
                right:-8,
            },
            content: {
                color: palette.canvasColor,
                fontWeight: fontWeight.medium,
                fontSize: 12,
            },
        }, theme.badge)),
        button: StyleSheet.create(merge({
            container: {
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
                borderRadius: 2,
                flexDirection: 'row',
            },
            text: {
                color: black,
                ...typography.buttons,
                textAlign:'center'
            },
            icon: {
                marginRight: 8,
                marginLeft:8
            },
        }, theme.button)),
        buttonFlat: StyleSheet.create(merge({}, theme.buttonFlat)),
        buttonDisabled: StyleSheet.create(merge({
            text: {
                color: palette.disabledTextColor,
            },
        }, theme.buttonDisabled)),
        buttonRaised: StyleSheet.create(merge({
            container: {
                backgroundColor: '#fff',
                borderColor: 'rgba(0,0,0,.12)',
            },
        }, theme.buttonRaised)),
        buttonRaisedDisabled: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.borderColor,
            },
            text: {
                color: palette.disabledTextColor,
            },
        }, theme.buttonRaisedDisabled)),
        card: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                marginVertical: 4,
                marginHorizontal: 8,
                ...getPlatformElevation(2),
            },
        }, theme.card)),
        dialog: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                ...getPlatformElevation(24),
                width: 280,
                paddingTop: 24,
            },
            titleContainer: {
                paddingBottom: 20,
                paddingHorizontal: 24,
            },
            titleText: {
                fontSize: 20,
                fontWeight: 'bold',
                ...material.titleObject,
                color: 'black',
            },
            contentContainer: {
                paddingBottom: 24,
                paddingHorizontal: 24,
            },
            actionsContainer: {
            },
            defaultActionsContainer: {
                marginHorizontal: 8,
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
            stackedActionsContainer: {
                marginBottom: 8,
            },
        }, theme.dialog)),
        checkbox: StyleSheet.create(merge({
            checkedIcon:{
              color:palette.primaryColor,
            },
            uncheckedIcon:{
              color:palette.black
            },
        }, theme.checkbox)),
        divider: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.borderColor,
                height: StyleSheet.hairlineWidth,
            },
        }, theme.divider)),
        iconToggle: StyleSheet.create(merge({
            container: {
                width: spacing.iconSize * 2,
                height: spacing.iconSize * 2,
                alignItems: 'center',
                justifyContent: 'center',
            },
            icon: {
                color: palette.secondaryTextColor,
            },
        }, theme.iconToggle)),
        listItem: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                height: 56,
            },
            contentViewContainer: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            leftElementContainer: {
                width: 40,
                marginLeft: 16,
            },
            centerElementContainer: {
                paddingLeft: 16,
                flex: 1,
            },
            textViewContainer: { },
            primaryText: {
                lineHeight: 24,
                color: palette.primaryTextColor,
                ...typography.subheading,
            },
            firstLine: {
                flexDirection: 'row',
            },
            primaryTextContainer: {
                flex: 1,
            },
            secondaryText: {
                lineHeight: 22,
                color: palette.secondaryTextColor,
                ...typography.body1,
            },
            tertiaryText: {
                lineHeight: 22,
                color: palette.secondaryTextColor,
                ...typography.body1,
            },
            rightElementContainer: {
                paddingRight: 4,
                flexDirection: 'row',
                backgroundColor: 'transparent',
            },
            leftElement: {
                margin: 16,
                color: palette.secondaryTextColor,
            },
            rightElement: {
                color: palette.secondaryTextColor,
            },
        }, theme.listItem)),
        // https://material.io/guidelines/components/snackbars-toasts.html
        snackbar: StyleSheet.create(merge({
            container: {
                flexDirection: 'row',
                height: spacing.snackbarHeight,
                alignItems: 'center',
                backgroundColor: snackbarColor,
                paddingHorizontal: 24,
                ...getPlatformElevation(6),
                zIndex: 4,
                justifyContent:'space-between',
                position:'absolute',
                left:0,right:0,bottom:0
            },
            message: {
                //height:spacing.snackbarHeight-28,
                marginVertical: 14,
                color: white,
                ...systemWeights.regular,
                textAlign:'center',
                fontSize:14
            },
            actionContainer: {
                height: 14,
                paddingHorizontal: 0,
            },
            actionText: {
                color: palette.primaryColor,
                fontFamily:'Roboto-Medium',
                fontSize:14,
            },
        }, theme.snackbar)),
        toast:StyleSheet.create(merge({
          container:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:63
          },
          textContainer:{
            flexDirection: 'row',
            height: spacing.toastHeight,
            alignItems: 'center',
            backgroundColor: toastColor,
            paddingHorizontal: 24,
            //...getPlatformElevation(6),
            zIndex: 6,
            justifyContent:'center',
            borderRadius:22,
          },
          text:{
            color: 'white',
            ...systemWeights.regular,
            textAlign:'center',
            fontSize:14
          }
        }, theme.toast)),
        // https://material.google.com/components/subheaders.html#
        subheader: StyleSheet.create(merge({
            container: {
                height: 48,
                justifyContent: 'center',
            },
            text: {
                color: palette.secondaryTextColor,
                // https://material.google.com/components/subheaders.html#subheaders-grid-subheaders
                ...typography.body2,
            },
        }, theme.subheader)),
        toolbar: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.primaryColor,
                height: Metrics.statusBarHeight+Metrics.appBarHeight,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 4,
                overflow: 'hidden',
                ...getPlatformElevation(4),
                paddingTop:Metrics.statusBarHeight
            },
            leftElementContainer: {
                backgroundColor: 'transparent',
            },
            leftElement: {
                color: palette.alternateTextColor,
            },
            centerElementContainer: {
                flex: 1,
                marginLeft: 20,
            },
            titleText: {
                ...typography.appBar,
                ...material.titleObject,
                color: palette.alternateTextColor,
            },
            rightElementContainer: {
                flexDirection: 'row',
                backgroundColor: 'transparent',
            },
            rightElement: {
                color: palette.alternateTextColor,
            },
        }, theme.toolbar)),
        bottomSheet:StyleSheet.create(merge({
          container:{
            //...getPlatformElevation(16),
            backgroundColor:'transparent',//,Color('#000').alpha(0.2),
            marginHorizontal:0,
            marginVertical:0,
          },
          listContent:{
            position:'absolute',
            left:0,
            right:0,
            bottom:0,
            paddingVertical:8,
            backgroundColor:'#fff',
            maxHeight:height*16/25,

          },
          gridContent:{
            backgroundColor:'#fff',
            paddingVertical:24,
            paddingHorizontal:24,
            position:'absolute',
            left:0,
            right:0,
            bottom:0,
            flexDirection:'row',
            flexWrap:'wrap',
            maxHeight:height*16/25,
          },
          listTitleContainer:{
            paddingHorizontal:16,
            height:56,
            justifyContent:'flex-start',
            alignItems:'center',
            flexDirection:'row',
            backgroundColor:'#fff'
          },
          gridTitleContainer:{
            width:width-48,
            height:56,
            justifyContent:'flex-start',
            alignItems:'center',
            flexDirection:'row',
            backgroundColor:'#fff',
          },
          title:{
            ...systemWeights.regular,
            fontSize:18,
            color:Color('#000').alpha(0.54),
            //Roboto Regular 16sp，＃000 54％
          }
        },theme.bottomSheet)),
        bottomSheetListItem:StyleSheet.create(merge({
          container:{
            paddingHorizontal:16,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            backgroundColor:'#fff',
            height:48,
          },
          text:{
            marginLeft:16,//Roboto-Regular 16sp，＃000 87％
            ...systemWeights.regular,
            fontSize:16,
            color:Color('#000').alpha(0.87),
          },
          icon:{
            marginRight:16,
          }
        },theme.bottomSheetListItem)),
        bottomSheetGridItem:StyleSheet.create(merge({
          container:{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#fff',
            flexDirection:'column',
            width:56,
            marginTop:24,
          },
          text:{
            marginTop:8,//Roboto-Regular 16sp，＃000 87％
            ...systemWeights.regular,
            fontSize:12,
            color:Color('#000').alpha(0.87),
            height:16,
          }

        },theme.bottomSheetGridItem)),
        toolbarSearchActive: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
            },
            leftElement: {
                color: palette.secondaryTextColor,
            },
            centerElementContainer: { },
            titleText: {
                flex: 1,
                marginLeft: 16,
                fontWeight: fontWeight.normal,
                ...material.titleObject,
                color: palette.primaryTextColor,
            },
            rightElement: {
                color: palette.secondaryTextColor,
            },
        }, theme.toolbarSearchActive)),
        menu:StyleSheet.create(merge({
          container:{
            position: 'absolute',
            backgroundColor: '#fff',
            paddingVertical: 8,
            ...getPlatformElevation(8),
          }
        },theme.menu)),
        menuItem:StyleSheet.create(merge({
          container:{
            height: 48,
            justifyContent: 'flex-start',
            maxWidth: 248,
            minWidth: 124,
            flexDirection:'row',
            alignItems:'center'
          },
          text:{
              fontSize: 16,
              //fontWeight: '400',
              paddingHorizontal: 16,

              ...systemWeights.regular
          },
          icon:{
            marginLeft:16
          }
        },theme.menuItem)),
        textField:StyleSheet.create({
          icon:{
            marginBottom:16,
            marginHorizontal:16,
          },
          errorMessage:{
            color:'red',
            fontSize:12,
          }
        },theme.textField),
        textFieldBase:StyleSheet.create(merge({
          container:{
            height: 72,
            paddingTop: 30,
            paddingBottom: 7,
            position: 'relative',
          },
          textInput:{
            fontSize: 16,
            height: 34,
            lineHeight: 34
          }
        },theme.textFieldBase)),
        textFieldLabel:StyleSheet.create(merge({
          container:{
            position: 'absolute',
            left: 0,
            fontSize:16,
            ...systemWeights.regular,
            top:34
          },
          focusText:{
            color:palette.primaryColor
          }
        },theme.textFieldLabel)),
        textFieldUnderline:StyleSheet.create(merge({
          container:{
            height: 1,
            alignItems: 'center',
          },
          underline:{
            height:2,
            backgroundColor:palette.primaryColor,
          }
        },theme.textFieldUnderline)),
        simpleToolbar: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.primaryColor,
                height: Metrics.appBarHeight+Metrics.statusBarHeight,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                paddingHorizontal: 4,
                overflow: 'hidden',
                ...getPlatformElevation(4),
                paddingTop:Metrics.statusBarHeight
            },
            leftElement: {
                color: palette.alternateTextColor,
            },
            centerElementContainer: {
                flex: 1,
                position:'absolute',
                top:Metrics.statusBarHeight,
                left:0,
                right:0,
                bottom:0,
                justifyContent:'center',
                alignItems:'center',
            },
            titleText: {
                ...typography.appBar,
                ...material.titleObject,
                color: palette.alternateTextColor,
            },
            rightElement: {
                color: palette.alternateTextColor,
            },
        }, theme.simpleToolbar)),
    }, baseTheme);

    return theme;
}
