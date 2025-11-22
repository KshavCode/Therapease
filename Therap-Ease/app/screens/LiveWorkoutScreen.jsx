import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ColorTheme } from "../../constants/GlobalStyles";

const API_BASE = "http://192.168.1.9:8000"; // <-- your FastAPI IP/port

export default function LiveWorkoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const exerciseKey = params.exerciseKey || "squat";
  const name = params.name || "Squats";
  const repsTarget = Number(params.reps || 10);

  const setsParam = params.sets || "3";
  const totalSets = Number(setsParam || 1);

  const doctor = params.doctor || "Dr. Sharma";

  const patientName = params.patientName || "";
  const patientId = params.patientId || "";

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  const [angle, setAngle] = useState(0);
  const [stage, setStage] = useState("-");
  const [count, setCount] = useState(0); // reps in current set
  const [formLabel, setFormLabel] = useState("Good");
  const [elapsed, setElapsed] = useState(0); // total session time
  const [running, setRunning] = useState(true);
  const [sessionEnded, setSessionEnded] = useState(false); // all sets done OR user ended
  const [setCompleted, setSetCompleted] = useState(false); // current set done, waiting next
  const [currentSet, setCurrentSet] = useState(1); // 1..totalSets
  const [pdfUrl, setPdfUrl] = useState(null);

  // ask camera permission
  useEffect(() => {
    if (Platform.OS === "web") {
      // skip permission on web (we show placeholder)
      setHasPermission(true);
      return;
    }
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // dummy tracking to simulate reps; replace later with TFJS/Mediapipe
  useEffect(() => {
    if (!running || sessionEnded || setCompleted) return;

    const id = setInterval(() => {
      setAngle((prev) => {
        const next = prev > 160 ? 40 : prev + 25;
        let newStage = stage;
        let newCount = count;

        if (exerciseKey === "bicep_curl" || exerciseKey === "shoulder_abduction") {
          if (next > 150) newStage = "down";
          if (next < 50 && stage === "down") {
            newStage = "up";
            newCount = count + 1;
          }
        } else {
          if (next > 160) newStage = "up";
          if (next < 90 && stage === "up") {
            newStage = "down";
            newCount = count + 1;
          }
        }

        if (newCount !== count) {
          setCount(newCount);

          if (newCount >= repsTarget) {
            // current set completed
            setSetCompleted(true);
            setRunning(false);

            if (currentSet >= totalSets) {
              // all sets completed
              setSessionEnded(true);
            }
          }
        }

        setStage(newStage);
        setFormLabel(next > 170 || next < 30 ? "Check Form" : "Good");
        return next;
      });
    }, 700);

    return () => clearInterval(id);
  }, [running, sessionEnded, setCompleted, stage, count, exerciseKey, repsTarget, currentSet, totalSets]);

  const handleEndSession = () => {
    setRunning(false);
    setSessionEnded(true);
  };

  const handleStartNextSet = () => {
    if (currentSet >= totalSets) return;
    setCount(0);
    setAngle(0);
    setStage("-");
    setFormLabel("Good");
    setSetCompleted(false);
    setRunning(true);
    setPdfUrl(null);
    setCurrentSet((prev) => Math.min(prev + 1, totalSets));
  };

  const handleRedo = () => {
    setAngle(0);
    setStage("-");
    setCount(0);
    setFormLabel("Good");
    setElapsed(0);
    setSessionEnded(false);
    setSetCompleted(false);
    setCurrentSet(1);
    setRunning(true);
    setPdfUrl(null);
  };

  const handleBack = () => {
    router.back();
  };

  // total reps across all sets
  const completedSetsBeforeCurrent = sessionEnded ? totalSets : currentSet - 1;
  const totalReps = completedSetsBeforeCurrent * repsTarget + count;

  const handleGeneratePdf = async () => {
    try {
        const duration = elapsed;
        const avgSpeed = duration > 0 ? totalReps / duration : 0;
        const formScore = formLabel === "Good" ? 0.9 : 0.7; // temporary score
        const exerciseName = name || exerciseKey;

        const payload = {
        patient_name: patientName || "Somay Singh",
        patient_id: patientId || "P-2025-001",
        exercise: exerciseName,
        exercise_key: exerciseKey,
        reps: totalReps,
        sets: totalSets,
        duration,
        avg_speed: avgSpeed,
        form_score: formScore,
        };

        console.log("📤 Sending report payload:", payload);

        const res = await fetch(`${API_BASE}/generate_report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        console.log("📥 Report response status:", res.status);

        if (!res.ok) {
        const errText = await res.text();
        console.log("❌ Report error body:", errText);
        Alert.alert(
            "Error",
            `Failed to generate PDF report (status ${res.status}). Check backend logs.`
        );
        return;
        }

        const data = await res.json(); // { url: "/reports/xyz.pdf" }
        console.log("✅ Report response JSON:", data);

        const fullUrl = `${API_BASE}${data.url}`;
        setPdfUrl(fullUrl);

        Alert.alert("Report Ready", "Tap 'Open PDF' to view or download.");
    } catch (e) {
        console.log("💥 PDF generation error:", e);
        Alert.alert("Error", "Something went wrong while generating the report.");
    }
  };

  const handleOpenPdf = () => {
    if (pdfUrl) {
      Linking.openURL(pdfUrl);
    } else {
      Alert.alert("No PDF", "Generate the PDF first.");
    }
  };

  if (Platform.OS !== "web" && hasPermission === null) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Requesting camera permission…</Text>
      </SafeAreaView>
    );
  }

  if (Platform.OS !== "web" && hasPermission === false) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ textAlign: "center", paddingHorizontal: 16 }}>
          Camera access is required for live tracking. Please enable it in
          settings.
        </Text>
      </SafeAreaView>
    );
  }

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const progress = Math.min(1, count / (repsTarget || 1));
  const progressPercent = Math.round(progress * 100);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={22} color={ColorTheme.fourth} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerSub}>Live posture tracking</Text>
          {patientName ? (
            <Text style={styles.headerPatient}>
              Patient: {patientName}
              {patientId ? ` • ID: ${patientId}` : ""}
            </Text>
          ) : null}
        </View>
        <View style={styles.chip}>
          <Ionicons
            name="person-outline"
            size={14}
            color={ColorTheme.first}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.chipText}>{doctor}</Text>
        </View>
      </View>

      {/* Camera + overlay */}
      <View style={styles.cameraWrapper}>
        {Platform.OS === "web" ? (
          <View
            style={[
              styles.camera,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text style={{ color: "#fff", padding: 12, textAlign: "center" }}>
              Camera preview is not available on web.{"\n"}
              Please run this screen in Expo Go on a physical device.
            </Text>
          </View>
        ) : (
          <Camera
            style={styles.camera}
            type={Camera.Constants?.Type?.front}
            ref={cameraRef}
            ratio="16:9"
          />
        )}

        <View style={styles.cameraOverlay}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Angle</Text>
              <Text style={styles.badgeValue}>{Math.round(angle)}°</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Stage</Text>
              <Text style={styles.badgeValue}>{stage}</Text>
            </View>
            <View
              style={[
                styles.formBadge,
                formLabel === "Good" ? styles.formGood : styles.formCheck,
              ]}
            >
              <Ionicons
                name={formLabel === "Good" ? "checkmark-circle" : "warning"}
                size={14}
                color={ColorTheme.first}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.formText}>{formLabel}</Text>
            </View>
          </View>

          <View style={styles.counterBox}>
            <Text style={styles.counterLabel}>
              Reps (Set {currentSet}/{totalSets})
            </Text>
            <Text style={styles.counterMain}>
              {count} / {repsTarget}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { flex: progress || 0.02 }]} />
              <View
                style={[
                  styles.progressEmpty,
                  { flex: 1 - (progress || 0.02) },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progressPercent}% of this set</Text>
          </View>
        </View>
      </View>

      {/* Bottom panel: summary + sets + PDF after completion */}
      <View style={styles.bottomPanel}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValue}>
              {mins.toString().padStart(2, "0")}:
              {secs.toString().padStart(2, "0")}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Sets</Text>
            <Text style={styles.statValue}>
              {currentSet} / {totalSets}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Exercise</Text>
            <Text style={styles.statValue}>{exerciseKey}</Text>
          </View>
        </View>

        {/* States:
            - running & not setCompleted & not sessionEnded  -> End Session
            - setCompleted & !sessionEnded                   -> Start Next Set
            - sessionEnded                                   -> Session completed + PDF
        */}
        {!sessionEnded && !setCompleted && (
          <TouchableOpacity
            style={[styles.mainBtn, styles.stopBtn]}
            onPress={handleEndSession}
          >
            <Ionicons
              name="stop-circle"
              size={18}
              color={ColorTheme.first}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.mainBtnText}>End Session</Text>
          </TouchableOpacity>
        )}

        {setCompleted && !sessionEnded && (
          <View style={styles.endActions}>
            <Text style={styles.endTitle}>
              Set {currentSet} completed
            </Text>
            <Text style={styles.endSub}>
              Reps this set: {count} • Total reps: {totalReps}
            </Text>

            <View style={styles.endButtonsRow}>
              <TouchableOpacity
                style={[styles.mainBtn, styles.secondaryBtn]}
                onPress={handleEndSession}
              >
                <Text
                  style={[styles.mainBtnText, { color: ColorTheme.fourth }]}
                >
                  End Workout
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mainBtn, styles.primaryBtn]}
                onPress={handleStartNextSet}
              >
                <Text
                  style={[styles.mainBtnText, { color: ColorTheme.first }]}
                >
                  Start Next Set
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {sessionEnded && (
          <View style={styles.endActions}>
            <Text style={styles.endTitle}>Session completed</Text>
            <Text style={styles.endSub}>
              Total reps: {totalReps} • Duration: {elapsed.toFixed(1)} sec
            </Text>

            <View style={styles.endButtonsRow}>
              <TouchableOpacity
                style={[styles.mainBtn, styles.secondaryBtn]}
                onPress={handleRedo}
              >
                <Text
                  style={[styles.mainBtnText, { color: ColorTheme.fourth }]}
                >
                  Repeat Workout
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mainBtn, styles.primaryBtn]}
                onPress={handleGeneratePdf}
              >
                <Text
                  style={[styles.mainBtnText, { color: ColorTheme.first }]}
                >
                  Generate PDF
                </Text>
              </TouchableOpacity>
            </View>

            {pdfUrl && (
              <TouchableOpacity
                style={[styles.mainBtn, styles.openBtn]}
                onPress={handleOpenPdf}
              >
                <Ionicons
                  name="document-text-outline"
                  size={18}
                  color={ColorTheme.first}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[styles.mainBtnText, { color: ColorTheme.first }]}
                >
                  Open PDF
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ColorTheme.first },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  iconBtn: { padding: 6, marginRight: 6 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: ColorTheme.fourth },
  headerSub: { fontSize: 12, color: ColorTheme.fourth, opacity: 0.7 },
  headerPatient: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: ColorTheme.fourth,
  },
  chipText: { fontSize: 11, fontWeight: "600", color: ColorTheme.first },

  cameraWrapper: {
    flex: 1.2,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  camera: { flex: 1 },
  cameraOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "rgba(15,23,42,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeLabel: { fontSize: 10, color: "#cbd5f5" },
  badgeValue: { fontSize: 14, fontWeight: "700", color: "#e5e7ff" },

  formBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  formGood: { backgroundColor: "rgba(34,197,94,0.9)" },
  formCheck: { backgroundColor: "rgba(239,68,68,0.9)" },
  formText: { fontSize: 11, fontWeight: "600", color: ColorTheme.first },

  counterBox: {
    marginTop: 4,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(15,23,42,0.88)",
  },
  counterLabel: { fontSize: 10, color: "#cbd5f5" },
  counterMain: { fontSize: 24, fontWeight: "800", color: "#f9fafb" },
  progressBar: {
    flexDirection: "row",
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 4,
    backgroundColor: "rgba(148,163,184,0.5)",
  },
  progressFill: { backgroundColor: "#22c55e" },
  progressEmpty: { backgroundColor: "transparent" },
  progressText: { marginTop: 2, fontSize: 10, color: "#e5e7eb" },

  bottomPanel: {
    flex: 0.9,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: ColorTheme.second,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  stat: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(15,23,42,0.04)",
    minWidth: "30%",
  },
  statLabel: { fontSize: 11, color: "#6b7280" },
  statValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: ColorTheme.fourth,
  },

  mainBtn: {
    height: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  mainBtnText: { fontSize: 14, fontWeight: "700" },
  stopBtn: { marginTop: 6, backgroundColor: "#fecaca" },

  endActions: { marginTop: 4 },
  endTitle: { fontSize: 16, fontWeight: "700", color: ColorTheme.fourth },
  endSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },

  endButtonsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  primaryBtn: { flex: 0.5, backgroundColor: ColorTheme.fourth },
  secondaryBtn: { flex: 0.48, backgroundColor: "#e5e7eb" },
  openBtn: {
    marginTop: 8,
    backgroundColor: "#dbeafe",
  },
});
