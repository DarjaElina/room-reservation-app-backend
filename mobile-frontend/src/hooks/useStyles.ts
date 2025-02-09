import { useMemo } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import theme from '@/src/theme';



const useStyles = () => {
  const { height, width } = useWindowDimensions();
  const vh = height / 100;
  const vw = width / 100;
  const vmin = Math.min(height, width) / 100;

  const shadows = {
    light: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: vmin * 0.5,
      elevation: 3,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: vmin * 0.8,
      elevation: 5,
    },
  };

  return useMemo(() => {
    const isLargeScreen = width >= 768;

    return StyleSheet.create({
      // inputs, checkboxes & searchbars
      inputContainer: {
        marginBottom: vmin * 4.5,
      },
      input: {
        backgroundColor: 'transparent',
        paddingVertical: vmin * 0.5,
        marginBottom: vmin * 4.5,
        fontFamily: 'Lato-Regular'
      },
      checkbox: {
        height: vmin * 12,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vmin * 2.5,
        paddingHorizontal: vmin * 3,
        borderRadius: theme.borderRadius.medium,
        borderWidth: 1,
        fontFamily: 'Lato-Regular'
      },
      searchbar: {
        height: vmin * 12,
        borderRadius: theme.borderRadius.large,
        justifyContent: 'center',
        borderWidth: 2,
        ...shadows.light,
        overflow: 'hidden',
        fontFamily: 'Lato-Regular'
      },
      datePressable: {
        backgroundColor: '#f0f0f0',
        paddingVertical: vmin * 2,
        paddingHorizontal: vmin * 3,
        borderRadius: 8,
        shadowColor: '#000',
        ...shadows.light,
        fontFamily: 'Lato-Regular'
      },

      // buttons
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
        fontFamily: 'Lato-Bold'
      },
      flexButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vmin * 2.5,
        gap: vmin * 3,
      },
      fab: {
        position: 'absolute',
        right: 0,
        bottom: vmin * 3.5,
        margin: vmin * 3.5,
      },

      // text
      boldText: {
        fontWeight: 'bold',
        fontFamily: 'Lato-Bold',
      },
      bigText: {
        fontSize: 10 + vmin * 3,
        fontFamily: 'Lato-Regular'
      },
      smallText: {
        fontSize: 5 + vmin * 2,
        fontFamily: 'Lato-Light'
      },
      mediumText: {
        fontSize: 7 + vmin * 2,
        fontFamily: 'Lato-Thin'
      },
      errorText: {
        marginTop: vmin * 1.5,
        fontSize: 8 + vmin * 1.8,
        fontFamily: 'Lato-Regular'
      },
      userMessage: {
        fontSize: theme.fontSizes.small + vmin * 2,
        textAlign: 'center',
        marginVertical: vmin * 3.5,
        fontFamily: 'Lato-Regular'
      },

      // containers
      scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: vw * (isLargeScreen ? 8 : 5),
        paddingVertical: vh * (isLargeScreen ? 4 : 3),
      },
      itemContainer: {
        width: vmin * (isLargeScreen ? 37 : 45),
        minHeight: vmin * 30,
        gap: vmin * 1.5,
        padding: vmin * 2.6,
        borderRadius: theme.borderRadius.medium,
        overflow: 'hidden',
        ...shadows.light
      },
      iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vmin * 1.5,
        gap: vmin * 1.5
      },
      listContainer: {
        padding: vmin * 2.5,
        alignItems: 'center',
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: vmin * 1.5
      },
      equipmentItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: vmin * 1.8,
        paddingHorizontal: vmin * 3,
        borderRadius: theme.borderRadius.large,
        ...shadows.light,
        margin: vmin * 2
      },
      roomDescriptionContainer: {
        padding: vmin * 3,
        borderRadius: theme.borderRadius.medium,
        margin: vmin * 2.8,
        ...shadows.light
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
        ...shadows.light,
        margin: vmin * 4,
        marginHorizontal: isLargeScreen ? vmin * 10 : vmin * 4,
        gap: vmin * 2,
      },
      bookingItemDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: vmin * 2,
        marginBottom: vmin * 2,
        maxWidth: '90%',
      },
      container: {
        flex: 1,
        paddingHorizontal: isLargeScreen ? vw * 10 : vw * 2.5,
        paddingVertical: isLargeScreen ? vw * 1.5 : vw * 2.5,
      },
      pickerContainer: {
        width: isLargeScreen ? '60%' : '100%',
        alignSelf: 'center',
        padding: vmin * 2,
        marginBottom: vmin * 3,
      },
      textContainer: {
        marginBottom: vmin * 2,
      },
      userMessageContainer: {
        borderWidth: 1,
        borderRadius: theme.borderRadius.medium,
        padding: vmin * 2,
        marginVertical: vmin * 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.light
      },
      roomLinkContainer: {
        margin: vmin * 2,
      },

      // headings
      heading: {
        fontSize: isLargeScreen
          ? theme.fontSizes.small + vmin * 4
          : theme.fontSizes.medium + vmin * 4,
        fontFamily: 'Lato-Black',
      },
      subheading: {
        fontSize: isLargeScreen
          ? theme.fontSizes.small + vmin * 2
          : theme.fontSizes.medium + vmin * 2,
          fontFamily: 'Lato-Bold',
      },

      // images & icons
      userIcon: {
        margin: 'auto',
        marginBottom: vmin * 3,
      },
      roomItemImage: {
        height: vmin * (isLargeScreen ? 15 : 20),
        borderRadius: theme.borderRadius.medium,
      },
      roomViewImage: {
        width: '100%',
        height: vmin * 50,
        borderRadius: theme.borderRadius.medium,
        marginBottom: vmin * 3.5,
      },

      // overlays
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
      
      // cards, blocks, separators
      bookingDetailsCard: {
        borderRadius: theme.borderRadius.medium,
        padding: isLargeScreen ? vmin * 4 : vmin * 3,
        width: '100%',
        ...shadows.medium,
        fontFamily: 'Lato-Regular',
      },
      timeSlot: {
        height: isLargeScreen ? vmin * 4 : vmin * 7,
        fontSize: 10,
        borderTopWidth: 1,
        borderColor: 'lightgrey',
        position: 'relative',
        backgroundColor: '#F6F5F5',
      },
      selectedTimeSlot: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        width: '80%',
        padding: vmin * 0.7,
        fontFamily: 'Lato-Regular',
      },
      separator: {
        width: 1,
        position: 'absolute',
        backgroundColor: 'grey',
        left: '20%',
        height: '100%',
      },

      // text links
      settingsLink: {
        borderBottomWidth: 1,
        paddingVertical: vmin * 2.5,
        width: '100%',
        marginBottom: vmin * 2,
        alignItems: 'center',
        fontFamily: 'Lato-Regular',
      },

      // pickers
      picker: {
        width: '100%',
        fontSize: isLargeScreen ? vmin * 2.5 : vmin * 2,
        fontFamily: 'Lato-Regular',
      },
    });
  }, [height, width]);
};

export default useStyles;
