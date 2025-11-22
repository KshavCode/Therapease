from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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

class ReportRequest(BaseModel):
    patient_name: str
    patient_id: str
    age: int
    exercise: str
    exercise_key: str
    reps: int
    duration: float
    avg_speed: float
    form_score: float  # 0–1 scale

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

@app.post("/generate_report")
def generate_report(req: ReportRequest):
    filepath = make_pdf(req)
    return {"url": f"/reports/{os.path.basename(filepath)}"}

@app.get("/reports/{filename}")
def get_report(filename: str):
    filepath = os.path.join("reports", filename)
    return FileResponse(filepath, media_type="application/pdf")
