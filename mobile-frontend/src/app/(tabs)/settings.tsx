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
import useStyles from '@/src/hooks/useStyles';
import { Locales } from '@/src/i18n/i18n-types';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { signOut } = useSignOut();
  const { LL, locale, setLocale } = useI18nContext();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();

  const onLocaleSelected = useCallback((locale: Locales) => {
    setUserLocale(locale)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLocale);
  }, []);

  return (
    <View
      style={[
        styles.flexContainer,
        styles.scrollContainer,
        { backgroundColor: colors.background, justifyContent: 'center' },
      ]}
    >
      <Pressable style={[styles.settingsLink, { borderColor: colors.border }]}>
        <Text style={[styles.mediumText, { color: colors.text }]}>
          Privacy Policy
        </Text>
      </Pressable>
      <Pressable style={[styles.settingsLink, { borderColor: colors.border }]}>
        <Text style={[styles.mediumText, { color: colors.text }]}>
          Terms of Service
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.mediumText, { color: colors.buttonText }]}>
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
              styles.button,
              { backgroundColor: colors.buttonBackground },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              {LL.CLOSE()}
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: colors.primary, flexDirection: 'row' },
        ]}
        onPress={() => signOut()}
      >
        <Ionicons name="log-out-outline" size={24} color={colors.background} />
        <Text
          style={[
            styles.mediumText,
            { color: colors.buttonText, marginLeft: 8 },
          ]}
        >
          {LL.LOGOUT()}
        </Text>
      </Pressable>
    </View>
  );
}
