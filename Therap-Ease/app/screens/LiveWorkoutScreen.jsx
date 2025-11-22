import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ColorTheme } from "../../constants/GlobalStyles";

const API_BASE = "http://192.168.0.100:8000"; // <-- change to your FastAPI IP/port

export default function LiveWorkoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const exerciseKey = params.exerciseKey || "squat";
  const name = params.name || "Squats";
  const repsTarget = Number(params.reps || 10);
  const sets = params.sets || "3";
  const doctor = params.doctor || "Dr. Sharma";

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  const [angle, setAngle] = useState(0);
  const [stage, setStage] = useState("-");
  const [count, setCount] = useState(0);
  const [formLabel, setFormLabel] = useState("Good");
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  // ask camera permission
  useEffect(() => {
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

  // ⚠ dummy tracking to simulate reps; replace later with TFJS/Mediapipe
  useEffect(() => {
    if (!running || sessionEnded) return;

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
            setSessionEnded(true);
            setRunning(false);
          }
        }

        setStage(newStage);
        setFormLabel(next > 170 || next < 30 ? "Check Form" : "Good");
        return next;
      });
    }, 700);

    return () => clearInterval(id);
  }, [running, sessionEnded, stage, count, exerciseKey, repsTarget]);

  const handleEndSession = () => {
    setRunning(false);
    setSessionEnded(true);
  };

  const handleRedo = () => {
    setAngle(0);
    setStage("-");
    setCount(0);
    setFormLabel("Good");
    setElapsed(0);
    setSessionEnded(false);
    setRunning(true);
    setPdfUrl(null);
  };

  const handleBack = () => {
    router.back();
  };

  const handleGeneratePdf = async () => {
    try {
      const duration = elapsed;
      const avgSpeed = duration > 0 ? count / duration : 0;
      const formScore = formLabel === "Good" ? 0.9 : 0.7; // fake score for now

      const res = await fetch(`${API_BASE}/generate_report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: "Somay Singh", // later pass real patient
          patient_id: "P-2025-001",
          age: 47,
          exercise: name,
          exercise_key: exerciseKey,
          reps: count,
          duration,
          avg_speed: avgSpeed,
          form_score: formScore,
        }),
      });

      if (!res.ok) {
        throw new Error("Report generation failed");
      }
      const data = await res.json(); // { url: "http://.../reports/xyz.pdf" }
      setPdfUrl(data.url);
      Alert.alert("Report ready", "Tap 'Open PDF' to view or download.");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not generate report.");
    }
  };

  const handleOpenPdf = () => {
    if (pdfUrl) {
      Linking.openURL(pdfUrl);
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Requesting camera permission…</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
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

      {/* Camera */}
      <View style={styles.cameraWrapper}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          ratio="16:9"
        />
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
            <Text style={styles.counterLabel}>Reps</Text>
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
            <Text style={styles.progressText}>{progressPercent}% complete</Text>
          </View>
        </View>
      </View>

      {/* Bottom panel: summary + PDF after completion */}
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
            <Text style={styles.statValue}>{sets}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Exercise</Text>
            <Text style={styles.statValue}>{exerciseKey}</Text>
          </View>
        </View>

        {!sessionEnded ? (
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
        ) : (
          <View style={styles.endActions}>
            <Text style={styles.endTitle}>Session completed</Text>
            <Text style={styles.endSub}>
              Reps: {count} • Duration: {elapsed.toFixed(1)} sec
            </Text>

            <View style={styles.endButtonsRow}>
              <TouchableOpacity
                style={[styles.mainBtn, styles.secondaryBtn]}
                onPress={handleRedo}
              >
                <Text style={[styles.mainBtnText, { color: ColorTheme.fourth }]}>
                  Repeat Set
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mainBtn, styles.primaryBtn]}
                onPress={handleGeneratePdf}
              >
                <Text style={[styles.mainBtnText, { color: ColorTheme.first }]}>
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
                <Text style={[styles.mainBtnText, { color: ColorTheme.first }]}>
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
