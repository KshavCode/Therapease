from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fpdf import FPDF
from datetime import datetime
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)

app.mount("/reports", StaticFiles(directory=REPORT_DIR), name="reports")

class ReportRequest(BaseModel):
    patient_name: str
    patient_id: str
    exercise: str
    exercise_key: str
    reps: int
    sets: int | None = None
    duration: float
    avg_time: float
    form_score: float
    age: int | None = None
    medical_history: str | None = None
    goal: str | None = None

def make_pdf(req: ReportRequest) -> str:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Physiotherapy Exercise Session Report – TherapEase", ln=True)

    pdf.set_font("Arial", "", 12)
    pdf.ln(4)
    pdf.multi_cell(0, 8, f"Patient Name: {req.patient_name}")
    pdf.multi_cell(0, 8, f"Patient ID: {req.patient_id}")
    pdf.multi_cell(0, 8, f"Age: {req.age}")
    pdf.multi_cell(0, 8, f"Date: {datetime.now().strftime('%d %B %Y')}")

    pdf.ln(5)
    pdf.set_font("Arial", "B", 13)
    pdf.multi_cell(0, 8, "Session Summary")

    pdf.set_font("Arial", "", 12)
    pdf.multi_cell(0, 7, f"Exercise: {req.exercise}")
    pdf.multi_cell(0, 7, f"Reps: {req.reps}")
    pdf.multi_cell(0, 7, f"Duration: {req.duration:.1f} sec")
    pdf.multi_cell(0, 7, f"Average Speed: {req.avg_speed:.2f}")
    pdf.multi_cell(0, 7, f"Form Score: {req.form_score * 100:.1f} / 100")

    filename = f"{req.exercise_key}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    filepath = os.path.join(REPORT_DIR, filename)
    pdf.output(filepath)
    return filepath

from fastapi import Request

@app.post("/generate_report")
async def generate_report(request: Request):
    """
    Generate a PDF session report similar to the sample TherapEase report,
    with ASCII bar-style visualizations (no Unicode, safe for FPDF).
    """
    data = await request.json()
    print("Incoming report data:", data)

    # --------- Read fields safely from JSON ---------
    patient_name = data.get("patient_name", "Unknown Patient")
    patient_id = data.get("patient_id", "N/A")
    exercise = data.get("exercise", "Exercise")
    exercise_key = data.get("exercise_key", "squat")

    reps = int(data.get("reps", 0) or 0)
    sets = int(data.get("sets", 1) or 1)
    duration = float(data.get("duration", 0.0) or 0.0)
    avg_time = float(data.get("avg_time", 0.0) or 0.0)
    assigned_reps = int(data.get("assigned_reps", 0))

    form_score = float(data.get("form_score", 0.0) or 0.0)
    # If score is 0–1, convert to 0–100
    if form_score <= 1.0:
        form_score = form_score * 100.0

    # Optional extras (can be sent later from frontend if you want)
    medical_history = data.get(
        "medical_history",
        "History of hip replacement surgery. Currently undergoing physiotherapy "
        "for post-surgical strength, mobility, and functional recovery of the "
        "lower limb and hip region.",
    )
    primary_goal = data.get(
        "goal",
        "Improve hip and knee strength, balance, and range of motion after hip "
        "replacement surgery.",
    )

    date_str = datetime.now().strftime("%d %B %Y")

    # --------- Helper: ASCII bar visualization ---------
    def make_bar(value: float, target: float, length: int = 18) -> str:
        if target <= 0:
            ratio = 0.0
        else:
            ratio = max(0.0, min(1.0, value / target))
        filled = int(ratio * length)
        return "[" + "#" * filled + "-" * (length - filled) + "]"

    # Targets to mimic your sample visuals
    reps_target = max(reps, 10) if reps > 0 else 10    # baseline 10
    duration_target = 30.0                             # recommended 30 sec
    speed_target = 10.0                                # arbitrary max index
    form_target = 100.0                                # max score

    reps_bar = make_bar(reps, assigned_reps)
    dur_bar = make_bar(duration, duration_target)
    speed_bar = make_bar(avg_time, speed_target)
    form_bar = make_bar(form_score, form_target)

    # --------- Simple interpretations like sample ---------
    if reps < 5:
        reps_interp = "Low volume session"
    elif reps < 15:
        reps_interp = "Moderate volume session"
    else:
        reps_interp = "High volume session"

    if duration < 20:
        duration_interp = "Short session"
    elif duration < 60:
        duration_interp = "Typical session duration"
    else:
        duration_interp = "Extended session"

    if avg_time < 3:
        speed_interp = "Slow and controlled"
    elif avg_time < 7:
        speed_interp = "Moderate tempo"
    else:
        speed_interp = "Fast-paced reps"

    if form_score >= 85:
        form_interp = "Excellent technique"
    elif form_score >= 70:
        form_interp = "Good technique"
    else:
        form_interp = "Technique needs improvement"

    # --------- Build PDF (ASCII only) ---------
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)

    # ========== PAGE 1 ==========
    pdf.add_page()

    # Title (use '-' not en dash inside the string)
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 10, "Physiotherapy Exercise Session Report - TherapEase", ln=1, align="C")

    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Patient Details", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"Name: {patient_name}", ln=1)
    pdf.cell(0, 6, f"Patient ID: {patient_id}", ln=1)
    # Age is optional, not required; add later if you have it
    pdf.cell(0, 6, f"Date of Report: {date_str}", ln=1)

    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Medical History", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(0, 5, medical_history)

    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Current Prescription", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(0, 5, "Primary Goal:")
    pdf.multi_cell(0, 5, primary_goal)

    pdf.ln(2)
    pdf.multi_cell(0, 5, "Prescribed Exercises:")
    pdf.multi_cell(
        0,
        5,
        f"1. {exercise}\n"
        f"   a. Sets: {sets}\n"
        f"   b. Reps: target {reps} per session (or as prescribed)\n"
        f"   c. Frequency: As advised by the physiotherapist\n"
        f"   d. Notes: Maintain controlled motion and alignment throughout.",
    )

    # ========== PAGE 2 ==========
    pdf.add_page()

    # Session Summary table
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Session Summary", ln=1)

    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(60, 7, "Metric", border=1)
    pdf.cell(60, 7, "Result", border=1)
    pdf.cell(70, 7, "Interpretation", border=1, ln=1)

    pdf.set_font("Helvetica", "", 10)

    # Exercise row
    pdf.cell(60, 7, "Exercise", border=1)
    pdf.cell(60, 7, exercise, border=1)
    pdf.cell(70, 7, "Primary movement", border=1, ln=1)

    # Reps row
    pdf.cell(60, 7, "Repetitions", border=1)
    pdf.cell(60, 7, f"{reps} / {assigned_reps}", border=1)
    pdf.cell(70, 7, reps_interp, border=1, ln=1)

    # Duration row
    pdf.cell(60, 7, "Session Duration", border=1)
    pdf.cell(60, 7, f"{duration:.1f} sec", border=1)
    pdf.cell(70, 7, duration_interp, border=1, ln=1)

    # Speed row
    pdf.cell(60, 7, "Average Speed", border=1)
    pdf.cell(60, 7, f"{avg_time:.2f}", border=1)
    pdf.cell(70, 7, speed_interp, border=1, ln=1)

    # Form score row
    pdf.cell(60, 7, "Form Score", border=1)
    pdf.cell(60, 7, f"{form_score:.1f} / 100", border=1)
    pdf.cell(70, 7, form_interp, border=1, ln=1)

    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, f"Exercise Performance Overview ({exercise})", ln=1)

    pdf.set_font("Helvetica", "", 11)

    # Reps visualization
    pdf.cell(0, 6, f"Repetitions ({reps})", ln=1)
    pdf.set_font("Courier", "", 10)
    pdf.cell(0, 5, f"{reps_bar}  {reps} / {reps_target} reps", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"Session Duration ({duration:.1f} sec)", ln=1)
    pdf.set_font("Courier", "", 10)
    pdf.cell(0, 5, f"{dur_bar}  {duration:.1f} / {duration_target:.0f} sec", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"Average Speed ({avg_time:.2f})", ln=1)
    pdf.set_font("Courier", "", 10)
    pdf.cell(0, 5, f"{speed_bar}  speed index", ln=1)

    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"Form Score ({form_score:.1f} / 100)", ln=1)
    pdf.set_font("Courier", "", 10)
    pdf.cell(0, 5, f"{form_bar}  technique quality", ln=1)

    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Therapist Remarks", ln=1)

    pdf.set_font("Helvetica", "", 11)
    remarks = (
        "Patient tolerated the session well based on the metrics above. "
        "Encourage continued focus on controlled, pain-free movement and "
        "proper alignment. Adjust volume or intensity as needed based on "
        "ongoing recovery and physiotherapist guidance."
    )
    pdf.multi_cell(0, 5, remarks)

    # --------- Save PDF & return URL ---------
    filename = f"report_{patient_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    filepath = os.path.join(REPORT_DIR, filename)
    pdf.output(filepath)

    print("Saved report to:", filepath)
    return {"url": f"/reports/{filename}"}

@app.get("/reports/{filename}")
def get_report(filename: str):
    filepath = os.path.join("reports", filename)
    return FileResponse(filepath, media_type="application/pdf")
