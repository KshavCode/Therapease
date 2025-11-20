import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorTheme } from "../../constants/GlobalStyles";

const ExerciseScreen = ({ name, reps, sets, doctor, endDate, notes }) => {
  const [image, setImage] = React.useState(null);

  const spawnToast = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      ToastAndroid.show(
        "Permission to access the media library is required.",
        ToastAndroid.SHORT
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      ToastAndroid.show("Video selected successfully.", ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerBadge}>
            <Ionicons
              name="fitness-outline"
              size={18}
              color={ColorTheme.first}
            />
            <Text style={styles.headerBadgeText}>Exercise Session</Text>
          </View>
          <Text style={styles.headerTitle}>All the best!</Text>
          <Text style={styles.headerSubtitle}>
            Complete your exercise and upload a short video for your doctor.
          </Text>
        </View>

        {/* Upload section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Exercise Video</Text>
          <Text style={styles.sectionSubtitle}>
            Upload a video of you performing this exercise so your doctor can
            review your form.
          </Text>

          {!image && (
            <TouchableOpacity style={styles.uploadButton} onPress={spawnToast}>
              <View style={styles.uploadIconWrapper}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color={ColorTheme.fourth}
                />
              </View>
              <View>
                <Text style={styles.uploadText}>Upload Video</Text>
                <Text style={styles.uploadHint}>MP4 / MOV · Short clips</Text>
              </View>
            </TouchableOpacity>
          )}

          {image && (
            <View style={styles.uploadStatusRow}>
              <View style={styles.uploadStatusPill}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={ColorTheme.first}
                />
                <Text style={styles.uploadStatusText}>Video uploaded</Text>
              </View>

              <TouchableOpacity
                onPress={() => setImage(null)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-sharp" size={20} color={ColorTheme.error} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Details card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Exercise Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reps</Text>
            <Text style={styles.detailValue}>{reps}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sets</Text>
            <Text style={styles.detailValue}>{sets}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Prescribed by</Text>
            <Text style={styles.detailValue}>{doctor}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>End Date</Text>
            <Text style={styles.detailValue}>{endDate}</Text>
          </View>

          <View style={[styles.detailRow, { alignItems: "flex-start" }]}>
            <Text style={styles.detailLabel}>Notes</Text>
            <Text style={[styles.detailValue, styles.detailNotes]}>{notes}</Text>
          </View>
        </View>

        {/* Help section */}
        <View style={styles.helpWrapper}>
          <Ionicons
            name="help-circle-outline"
            size={26}
            color={ColorTheme.fourth}
          />
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpSubtitle}>Watch and learn!</Text>

          <TouchableOpacity style={styles.helpButton}>
            <Ionicons
              name="play-circle-outline"
              size={20}
              color={ColorTheme.first}
            />
            <Text style={styles.helpButtonText}>Watch Exercise Tutorial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.first,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
  },

  // Header
  headerWrapper: {
    width: "100%",
    marginBottom: 16,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: ColorTheme.second,
    marginBottom: 8,
  },
  headerBadgeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
    color: ColorTheme.fourth,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorTheme.fourth,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: ColorTheme.fourth,
    opacity: 0.8,
  },

  // Cards
  card: {
    width: "100%",
    backgroundColor: ColorTheme.second,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: ColorTheme.second,
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
    marginBottom: 12,
  },

  // Upload
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorTheme.fourth,
    borderStyle: "dashed",
    marginTop: 4,
  },
  uploadIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorTheme.fourth,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorTheme.fourth,
  },
  uploadHint: {
    fontSize: 11,
    color: ColorTheme.fourth,
    opacity: 0.8,
  },
  uploadStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  uploadStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorTheme.fourth,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  uploadStatusText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: ColorTheme.first,
  },
  deleteButton: {
    padding: 4,
  },

  // Details
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailLabel: {
    fontWeight: "600",
    color: ColorTheme.fourth,
    fontSize: 13,
  },
  detailValue: {
    color: ColorTheme.fourth,
    fontSize: 13,
    maxWidth: "60%",
    textAlign: "right",
  },
  detailNotes: {
    lineHeight: 18,
  },

  // Help section
  helpWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  helpTitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: ColorTheme.fourth,
  },
  helpSubtitle: {
    fontSize: 13,
    color: ColorTheme.fourth,
    opacity: 0.85,
    marginTop: 2,
    marginBottom: 10,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: ColorTheme.fourth,
    marginTop: 4,
  },
  helpButtonText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: ColorTheme.first,
  },
});
