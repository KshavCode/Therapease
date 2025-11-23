import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorTheme, styles as globalStyles } from "../../constants/GlobalStyles.jsx";

function SettingsScreen({navigation}) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);

  return (
    <SafeAreaView style={[globalStyles.screen, localStyles.screen]}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={localStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Profile overview */}
        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Account Overview</Text>
          <Text style={localStyles.sectionSubtitle}>
            Manage your profile, security, and app preferences.
          </Text>

          <View style={localStyles.row}>
            <View>
              <Text style={localStyles.rowLabel}>Account Type</Text>
              <Text style={localStyles.rowValue}>Patient</Text>
            </View>
            <Ionicons
              name="person-circle-outline"
              size={26}
              color={ColorTheme.fourth}
            />
          </View>

          <View style={localStyles.row}>
            <View>
              <Text style={localStyles.rowLabel}>Email</Text>
              <Text style={localStyles.rowValue}>user@example.com</Text>
            </View>
            <Ionicons
              name="mail-outline"
              size={22}
              color={ColorTheme.fourth}
            />
          </View>
        </View>

        {/* Section: Toggles */}
        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Preferences</Text>
          <Text style={localStyles.sectionSubtitle}>
            Customize how the app behaves for you.
          </Text>

          {/* Notifications */}
          <View style={localStyles.toggleRow}>
            <View style={localStyles.toggleTextBlock}>
              <Text style={localStyles.toggleLabel}>Notifications</Text>
              <Text style={localStyles.toggleHint}>
                Get alerts about sessions, reminders, and updates.
              </Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} 
            thumbColor={ColorTheme.fourth}
            trackColor={ColorTheme.fifth}/>
          </View>

          {/* Dark Mode */}
          <View style={localStyles.toggleRow}>
            <View style={localStyles.toggleTextBlock}>
              <Text style={localStyles.toggleLabel}>Dark Mode</Text>
              <Text style={localStyles.toggleHint}>
                Use a darker theme to reduce eye strain.
              </Text>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} 
            thumbColor={ColorTheme.fourth}
            trackColor={ColorTheme.fifth}/>
          </View>

          {/* Location Services */}
          <View style={localStyles.toggleRow}>
            <View style={localStyles.toggleTextBlock}>
              <Text style={localStyles.toggleLabel}>Location Services</Text>
              <Text style={localStyles.toggleHint}>
                Allow location for better clinic suggestions.
              </Text>
            </View>
            <Switch value={location} onValueChange={setLocation} 
            thumbColor={ColorTheme.fourth}
            trackColor={ColorTheme.fifth}/>
          </View>

          {/* Auto-Updates */}
          <View style={localStyles.toggleRow}>
            <View style={localStyles.toggleTextBlock}>
              <Text style={localStyles.toggleLabel}>Auto-Updates</Text>
              <Text style={localStyles.toggleHint}>
                Keep the app up to date automatically.
              </Text>
            </View>
            <Switch value={autoUpdates} onValueChange={setAutoUpdates} 
            thumbColor={ColorTheme.fourth}
            trackColor={ColorTheme.fifth}/>
          </View>
        </View>

        {/* Section: Actions */}
        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Account Actions</Text>

          <TouchableOpacity style={localStyles.actionRow} activeOpacity={0.5}>
            <View style={localStyles.actionLeft}>
              <Ionicons
                name="pencil-outline"
                size={20}
                color={ColorTheme.fourth}
              />
              <Text style={localStyles.actionText}>Edit Profile</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={ColorTheme.fourth}
            />
          </TouchableOpacity>

          <TouchableOpacity style={localStyles.actionRow} activeOpacity={0.5}>
            <View style={localStyles.actionLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={ColorTheme.fourth}
              />
              <Text style={localStyles.actionText}>Privacy & Security</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={ColorTheme.fourth}
            />
          </TouchableOpacity>

          <TouchableOpacity style={localStyles.actionRow} activeOpacity={0.5}>
            <View style={localStyles.actionLeft}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={ColorTheme.fourth}
              />
              <Text style={localStyles.actionText}>Help & Support</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={ColorTheme.fourth}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[localStyles.actionRow, localStyles.logoutRow]}
            activeOpacity={0.8}
          >
            <View style={localStyles.actionLeft}>
              <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
              <Text style={[localStyles.actionText, { color: "#ff6b6b" }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const localStyles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  section: {
    width: "100%",
    backgroundColor: ColorTheme.second,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: ColorTheme.fourth,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: ColorTheme.fourth,
    opacity: 0.8,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: ColorTheme.fifth,
    marginTop: 4,
  },
  rowLabel: {
    fontSize: 13,
    color: ColorTheme.fourth,
    opacity: 0.9,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorTheme.fourth,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 4,
  },
  toggleTextBlock: {
    flex: 1,
    paddingRight: 10,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorTheme.fourth,
  },
  toggleHint: {
    fontSize: 11,
    color: ColorTheme.fourth,
    opacity: 0.75,
    marginTop: 2,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 4,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: ColorTheme.fourth,
  },
  logoutRow: {
    marginTop: 8,
  },
});
