import { useMemo } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import theme from '@/src/theme';

const useStyles = () => {
  const { height, width } = useWindowDimensions();
  const vh = height / 100;
  const vw = width / 100;
  const vmin = Math.min(height, width) / 100;

  return useMemo(() => {
    const isLargeScreen = width >= 768;

    return StyleSheet.create({
      inputContainer: {
        marginBottom: vmin * 4.5,
      },
      errorText: {
        marginTop: vmin * 1.5,
        fontSize: 8 + vmin * 1.8,
      },
      scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: vw * (isLargeScreen ? 8 : 5),
        paddingVertical: vh * (isLargeScreen ? 4 : 3),
      },
      title: {
        fontSize: isLargeScreen
          ? theme.fontSizes.small + vmin * 4
          : theme.fontSizes.medium + vmin * 4,
        fontWeight: 'bold',
      },
      iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vmin * 3,
      },
      userIcon: {
        fontSize: 10 + vmin * 8,
        marginBottom: vmin * 2,
      },
      roomItemContainer: {
        width: vmin * (isLargeScreen ? 37 : 45),
        minHeight: vmin * 30,
        gap: vmin * 1.5,
        padding: vmin * 2.6,
        borderRadius: theme.borderRadius.medium,
        overflow: 'hidden',
        shadowRadius: vmin * 0.4,
        elevation: 3,
      },
      roomItemImage: {
        width: '100%',
        height: vmin * (isLargeScreen ? 15 : 20),
        borderRadius: theme.borderRadius.medium,
      },
      roomCode: {
        fontSize: 10 + vmin * 3,
        fontWeight: 'bold',
        fontFamily: 'Lato-Black',
      },
      roomLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vmin * 1.5,
      },
      roomLocationText: {
        fontSize: 5 + vmin * 2,
        marginLeft: vmin * 0.5,
      },
      roomStatusContainer: {
        flexDirection: 'row',
        gap: vmin * 1.2,
        alignItems: 'center',
      },
      roomStatusText: {
        fontSize: 6 + vmin * 2,
        fontWeight: '600',
      },
      roomListContainer: {
        padding: vmin * 2.5,
        alignItems: 'center',
      },
      roomLink: {
        marginVertical: vmin * 2,
      },
      columnWrapper: {
        gap: vmin * (isLargeScreen ? 3 : 2.5),
      },
      roomViewContainer: {
        flex: 1,
        borderTopLeftRadius: theme.borderRadius.large,
        borderTopRightRadius: theme.borderRadius.large,
        paddingHorizontal: vw * (isLargeScreen ? 10 : 5),
      },
      roomViewContentContainer: {
        paddingBottom: vmin * 3,
      },
      roomViewImage: {
        width: '100%',
        height: vmin * 50,
        borderRadius: theme.borderRadius.medium,
        marginBottom: vmin * 3.5,
      },
      roomViewHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      roomViewHeaderText: {
        fontSize: 12 + vmin * 3.5,
        fontWeight: 'bold',
      },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.borderRadius.medium,
        paddingVertical: isLargeScreen ? vh * 1.5 : vmin * 2.5,
        paddingHorizontal: isLargeScreen ? vw * 4 : vmin * 3.5,
        marginVertical: vmin * 3,
      },
      buttonText: {
        fontSize: isLargeScreen ? 13 + vmin * 1 : 8 + vmin * 2.5,
      },
      equipmentContainer: {
        marginVertical: vmin * 2.5,
      },
      equipmentListContent: {
        gap: vmin * 2,
      },
      equipmentItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: vmin * 1.8,
        paddingHorizontal: vmin * 3,
        borderRadius: theme.borderRadius.large,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: vmin * 0.5,
        elevation: 3,
      },
      equipmentItemText: {
        fontSize: isLargeScreen ? vmin * 2 : 4 + vmin * 2.5,
      },
      roomDescriptionContainer: {
        padding: vmin * 3,
        borderRadius: theme.borderRadius.medium,
        marginBottom: vmin * 2.8,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: vmin * 0.5,
        elevation: 3,
      },
      roomDescriptionText: {
        fontSize: isLargeScreen ? vmin * 2.1 : 5 + vmin * 2.3,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: isLargeScreen ? vw * 10 : vw * 5,
        paddingVertical: isLargeScreen ? vh * 5 : vh * 2,
      },
      bookingItemContainer: {
        padding: vmin * 4.5,
        borderRadius: theme.borderRadius.medium,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: vmin * 0.8,
        elevation: 3,
        margin: vmin * 4,
        marginHorizontal: isLargeScreen ? vmin * 10 : vmin * 4,
        gap: vmin * 2,
      },
      bookingItemCode: {
        fontSize: theme.fontSizes.small + vmin * 2,
        marginBottom: vmin * 1,
      },
      bookingItemDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: vmin * 2,
        marginBottom: vmin * 2,
        maxWidth: '90%',
      },
      bookingItemDate: {
        fontSize: theme.fontSizes.small + vmin * 0.5,
        fontWeight: '500',
      },
      bookingItemButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: vmin * 3,
      },
      bookingItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: vmin * 3,
        borderRadius: theme.borderRadius.medium,
        width: '40%',
      },
      bookingItemButtonText: {
        fontWeight: '600',
        fontSize: theme.fontSizes.button + vmin * 2,
        marginLeft: vmin * 1.2,
      },
      bookingItemTitle: {
        fontSize: theme.fontSizes.medium + vmin * 2,
        fontWeight: 'bold',
        marginBottom: vmin * 2,
      },
      bookingItemModalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: vw * (isLargeScreen ? 10 : 5),
        paddingVertical: vh * (isLargeScreen ? 5 : 2),
      },
      userMessage: {
        fontSize: theme.fontSizes.small + vmin * 2,
        textAlign: 'center',
        marginVertical: vmin * 3.5,
      },
      fab: {
        position: 'absolute',
        right: 0,
        bottom: vmin * 3.5,
        margin: vmin * 3.5,
      },
      container: {
        flex: 1,
        paddingHorizontal: isLargeScreen ? vw * 10 : vw * 2.5,
        paddingVertical: isLargeScreen ? vw * 1.5 : vw * 2.5,
      },
      loadingText: {
        fontSize: theme.fontSizes.small + vmin * 2,
      },
      loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      },
      bookingDetailsCard: {
        borderRadius: theme.borderRadius.medium,
        padding: isLargeScreen ? vmin * 4 : vmin * 3,
        width: '100%',
        elevation: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: vmin * 2,
      },
      icon: {
        marginRight: vmin * 2,
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: theme.fontSizes.medium + vmin * 1,
      },
      detailText: {
        fontSize: theme.fontSizes.small + vmin * 1,
        marginBottom: vmin * 2.5,
      },
      label: {
        fontWeight: '600',
      },
      input: {
        backgroundColor: 'transparent',
        paddingVertical: vmin * 0.5,
        marginBottom: vmin * 4.5,
      },
      bookingTitle: {
        fontSize: theme.fontSizes.small + vmin * 2,
        fontWeight: 'bold',
      },
      dateContainer: {
        marginBottom: vmin * 2,
      },
      dateLabel: {
        fontSize: isLargeScreen ? vmin * 2.5 : vmin * 4.5,
        fontWeight: 'bold',
        marginBottom: vmin * 1.5,
      },
      datePressable: {
        backgroundColor: '#f0f0f0',
        paddingVertical: vmin * 2,
        paddingHorizontal: vmin * 3,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },
      dateText: {
        fontSize: isLargeScreen ? vmin * 2.5 : vmin * 4.5,
      },
      flexButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vmin * 2.5,
        gap: vmin * 3,
      },
      bookingModificationFormContainer: {
        padding: isLargeScreen ? vmin * 5 : vmin * 2.5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      instructionText: {
        fontSize: isLargeScreen ? vmin * 2.5 : vmin * 4,
        marginBottom: vmin * 2.5,
        textAlign: 'center',
      },
      settingsLink: {
        borderBottomWidth: 1,
        paddingVertical: vmin * 2.5,
        width: '100%',
        marginBottom: vmin * 2,
        alignItems: 'center',
      },
      pickerContainer: {
        width: isLargeScreen ? '60%' : '100%',
        alignSelf: 'center',
        padding: vmin * 2,
        marginBottom: vmin * 3,
      },
      picker: {
        width: '100%',
        fontSize: isLargeScreen ? vmin * 2.5 : vmin * 2,
      },
    });
  }, [height, width]);
};

export default useStyles;
