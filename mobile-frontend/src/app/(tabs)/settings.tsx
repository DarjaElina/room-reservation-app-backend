import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useSignOut from '@/src/hooks/useSignOut';
import { useI18nContext } from '@/src/i18n/i18n-react';
import { locales } from '@/src/i18n/i18n-util';
import { setUserLocale } from '@/src/utils/localeStorage';
import { loadLocaleAsync } from '@/src/i18n/i18n-util.async';
import LanguagePicker from '@/src/components/LanguagePicker';
import theme from '@/src/theme';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { signOut } = useSignOut();
  const { LL, locale, setLocale } = useI18nContext();
  const [modalVisible, setModalVisible] = useState(false);

  const onLocaleSelected = useCallback((locale) => {
    setUserLocale(locale)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLocale);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerText, { color: colors.text }]}>Settings</Text>

      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => signOut()}
      >
        <Ionicons name="log-out-outline" size={24} color={colors.background} />
        <Text style={[styles.text, { color: colors.buttonText, marginLeft: 8 }]}>
          {LL.LOGOUT()}
        </Text>
      </Pressable>

      <Pressable style={[styles.settingsLink, { borderColor: colors.border }]}>
        <Text style={[styles.text, { color: colors.text }]}>Privacy Policy</Text>
      </Pressable>
      <Pressable style={[styles.settingsLink, { borderColor: colors.border }]}>
        <Text style={[styles.text, { color: colors.text }]}>Terms of Service</Text>
      </Pressable>

      <Pressable
            style={[
              styles.button,
              { backgroundColor: colors.buttonBackground },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[styles.text, { color: colors.buttonText}]}
            >
              {LL.SELECT_LANGUAGE()}
            </Text>
          </Pressable>
      
      <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: colors.backgroundPrimary },
              ]}
            >
              <LanguagePicker
                locale={locale}
                onLocaleSelected={onLocaleSelected}
                locales={locales}
              />

              <Pressable
                onPress={() => setModalVisible(false)}
                style={[
                  styles.closeButton,
                  { backgroundColor: colors.buttonBackground },
                ]}
              >
                <Text
                  style={[styles.closeButtonText, { color: colors.buttonText }]}
                >
                  {LL.CLOSE()}
                </Text>
              </Pressable>
            </View>
          </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  settingsLink: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: theme.fontSizes.button,
  },
});

