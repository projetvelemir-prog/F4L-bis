import { useState } from "react";

const scenarios = [
  {
    id: 1,
    label: "Scenario 1",
    answers: { q1: "yes", q2: "yes", q3: "yes", q4: "yes", q5: "no", q6: "no" },
    diagnosis: "FIT FOR LABOUR",
    diagnosisDetail: null,
    context: null,
    management: ["FIT FOR LABOUR"],
    color: "#22c55e",
    icon: "✓",
  },
  {
    id: 2,
    label: "Scenario 2",
    answers: { q1: "yes", q2: "yes", q3: "yes", q4: "spurious", q5: "yes", q6: "atypical" },
    diagnosis: "RUPI",
    diagnosisDetail: null,
    context: "Reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#ef4444",
    icon: "⚠",
  },
  {
    id: 3,
    label: "Scenario 3",
    answers: { q1: "higher", q2: "reduced", q3: "yes", q4: "yes", q5: "yes", q6: "typical" },
    diagnosis: "CHRONIC ANEMIA",
    diagnosisDetail: "(Early stage)",
    context: "Reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#f97316",
    icon: "⚠",
  },
  {
    id: 4,
    label: "Scenario 4",
    answers: { q1: "lower", q2: "reduced", q3: "yes", q4: "yes", q5: "yes", q6: "typical" },
    diagnosis: "CHRONIC ANEMIA",
    diagnosisDetail: "(Late stage)",
    context: "Reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#f97316",
    icon: "⚠",
  },
  {
    id: 5,
    label: "Scenario 5",
    answers: { q1: "yes", q2: "yes", q3: "yes", q4: "yes", q5: "yes", q6: "atypical" },
    diagnosis: "FETO MATERNAL HEMORRHAGE",
    diagnosisDetail: null,
    context: "Vaginal bleeding, reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#dc2626",
    icon: "⚠",
  },
  {
    id: 6,
    label: "Scenario 6",
    answers: { q1: "yes", q2: "reduced", q3: "yes", q4: "yes", q5: "yes", q6: "typical" },
    diagnosis: "FIT FOR LABOUR",
    diagnosisDetail: null,
    context: "Glottic movements at the ultrasound",
    management: ["FIT FOR LABOUR"],
    color: "#22c55e",
    icon: "✓",
  },
  {
    id: 7,
    label: "Scenario 7",
    answers: { q1: "higher", q2: "reduced", q3: "yes", q4: "yes", q5: "no", q6: "no" },
    diagnosis: "CHRONIC HYPOXIA",
    diagnosisDetail: "(or ANTENATAL STROKE)",
    context: "Reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#ef4444",
    icon: "⚠",
  },
  {
    id: 8,
    label: "Scenario 8",
    answers: { q1: "lower", q2: "reduced", q3: "yes", q4: "yes", q5: "yes", q6: "no" },
    diagnosis: "CHRONIC HYPOXIA",
    diagnosisDetail: "(Pre terminal)",
    context: "Reduced fetal movements",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#dc2626",
    icon: "⚠",
  },
  {
    id: 9,
    label: "Scenario 9",
    answers: { q1: "higher", q2: "yes", q3: "yes", q4: "yes", q5: "no", q6: "no" },
    diagnosis: "CHORIOAMNIONITIS",
    diagnosisDetail: null,
    context: "Maternal pyrexia, meconium, PROM, cervical sweep",
    management: ["No further stress", "Immediate C section", "Notify pediatricians"],
    color: "#a855f7",
    icon: "⚠",
  },
  {
    id: 10,
    label: "Scenario 10",
    answers: { q1: "higher", q2: "reduced", q3: "yes", q4: "yes", q5: "yes", q6: "no" },
    diagnosis: "SUPRA VENTRICULAR TACHYCARDIA",
    diagnosisDetail: null,
    context: "Reduced fetal movements",
    management: ["No further stress", "Notify fetal medicine unit center", "Notify pediatricians"],
    color: "#8b5cf6",
    icon: "⚠",
  },
];

const questions = [
  {
    id: "q1",
    num: 1,
    text: "Baseline FHR APPROPRIATE for gestational age?",
    options: [
      { value: "yes", label: "YES" },
      { value: "lower", label: "NO — LOWER" },
      { value: "higher", label: "NO — HIGHER" },
    ],
  },
  {
    id: "q2",
    num: 2,
    text: "NORMAL variability?",
    options: [
      { value: "yes", label: "YES" },
      { value: "reduced", label: "NO — REDUCED" },
      { value: "zigzag", label: "NO — ZIGZAG" },
    ],
  },
  {
    id: "q3",
    num: 3,
    text: "CYCLING?",
    options: [
      { value: "yes", label: "YES" },
      { value: "no", label: "NO" },
    ],
  },
  {
    id: "q4",
    num: 4,
    text: "TRUE accelerations?",
    options: [
      { value: "yes", label: "YES" },
      { value: "spurious", label: "SPURIOUS" },
      { value: "none", label: "NONE" },
    ],
  },
  {
    id: "q5",
    num: 5,
    text: "Repetitive shallow or late decelerations?",
    options: [
      { value: "no", label: "NO" },
      { value: "yes", label: "YES" },
    ],
  },
  {
    id: "q6",
    num: 6,
    text: "Sinusoidal pattern?",
    options: [
      { value: "no", label: "NO" },
      { value: "typical", label: "YES — TYPICAL" },
      { value: "atypical", label: "YES — ATYPICAL" },
    ],
  },
];

function matchScenario(answers) {
  // For each scenario, check how many questions match
  let bestMatch = null;
  let bestScore = -1;

  for (const scenario of scenarios) {
    let score = 0;
    let total = 0;
    for (const [q, val] of Object.entries(scenario.answers)) {
      if (answers[q] !== undefined) {
        total++;
        if (answers[q] === val) score++;
      }
    }
    if (total === 6 && score > bestScore) {
      bestScore = score;
      bestMatch = { scenario, score, total };
    }
  }
  return bestMatch;
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0); // 0 = intro, 1..6 = questions, 7 = result

  const currentQ = questions[step - 1];

  function handleAnswer(val) {
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Compute result
      const match = matchScenario(newAnswers);
      setResult(match);
      setStep(7);
    }
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setStep(0);
  }

  const isFit = result?.scenario?.diagnosis === "FIT FOR LABOUR";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
        }
        .btn-option {
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.18);
          color: #e8e0ff;
          padding: 14px 28px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 15px;
          font-family: 'Georgia', serif;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }
        .btn-option:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.4);
          transform: translateX(6px);
        }
        .card {
          animation: fadeSlideIn 0.5s ease forwards;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "rgba(180,160,255,0.7)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>Fetal CTG Assessment Tool</div>
        <h1 style={{
          fontSize: 26,
          color: "#fff",
          fontWeight: "normal",
          margin: 0,
          letterSpacing: "0.02em",
        }}>Is This Fetus Fit for Labour?</h1>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #a78bfa, transparent)", margin: "12px auto 0" }} />
      </div>

      {/* Progress bar (only during questions) */}
      {step >= 1 && step <= 6 && (
        <div style={{ width: "100%", maxWidth: 560, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            {questions.map((q, i) => (
              <div key={q.id} style={{
                width: 36, height: 6, borderRadius: 3,
                background: i < step ? "#a78bfa" : "rgba(255,255,255,0.12)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
          <div style={{ fontSize: 12, color: "rgba(180,160,255,0.6)", textAlign: "right" }}>
            Question {step} / 6
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="card" key={step} style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.12)",
        padding: "40px 36px",
        maxWidth: 560,
        width: "100%",
      }}>

        {/* INTRO */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🫀</div>
            <p style={{ color: "#c4b5fd", lineHeight: 1.7, marginBottom: 8 }}>
              Observe <strong style={{ color: "#fff" }}>60 minutes of CTG</strong> at admission, then answer the following 6 questions.
            </p>
            <p style={{ color: "rgba(180,160,255,0.6)", fontSize: 13, marginBottom: 32 }}>
              The tool will identify the most probable diagnosis and recommend a management plan.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                border: "none",
                color: "#fff",
                padding: "14px 40px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.05em",
                transition: "opacity 0.2s",
              }}
              onMouseOver={e => e.target.style.opacity = "0.85"}
              onMouseOut={e => e.target.style.opacity = "1"}
            >
              Begin Assessment →
            </button>
          </div>
        )}

        {/* QUESTION */}
        {step >= 1 && step <= 6 && currentQ && (
          <div>
            <div style={{
              display: "inline-block",
              background: "rgba(167,139,250,0.15)",
              color: "#a78bfa",
              borderRadius: 8,
              padding: "4px 12px",
              fontSize: 12,
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}>
              QUESTION {currentQ.num}
            </div>
            <h2 style={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: 20,
              lineHeight: 1.5,
              marginBottom: 28,
              margin: "0 0 28px",
            }}>
              {currentQ.text}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  className="btn-option"
                  onClick={() => handleAnswer(opt.value)}
                >
                  <span style={{ color: "#a78bfa", marginRight: 10 }}>→</span>
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 1 && (
              <button
                onClick={() => { setStep(step - 1); setAnswers(prev => { const n = {...prev}; delete n[currentQ.id]; return n; }); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(180,160,255,0.5)",
                  cursor: "pointer",
                  marginTop: 20,
                  fontSize: 13,
                  fontFamily: "'Georgia', serif",
                }}
              >
                ← Previous question
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {step === 7 && result && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 52,
              marginBottom: 16,
              filter: `drop-shadow(0 0 20px ${result.scenario.color})`,
            }}>
              {isFit ? "✅" : "🚨"}
            </div>

            <div style={{
              display: "inline-block",
              background: `${result.scenario.color}22`,
              border: `1.5px solid ${result.scenario.color}66`,
              borderRadius: 12,
              padding: "6px 18px",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: result.scenario.color,
              marginBottom: 16,
              textTransform: "uppercase",
            }}>
              Very Probable Diagnosis
            </div>

            <h2 style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              margin: "0 0 4px",
              letterSpacing: "0.04em",
            }}>
              {result.scenario.diagnosis}
            </h2>

            {result.scenario.diagnosisDetail && (
              <div style={{ color: "#a78bfa", fontSize: 14, marginBottom: 16 }}>
                {result.scenario.diagnosisDetail}
              </div>
            )}

            {result.scenario.context && (
              <div style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                padding: "10px 16px",
                marginBottom: 20,
                fontSize: 13,
                color: "rgba(200,190,255,0.7)",
              }}>
                <span style={{ color: "rgba(180,160,255,0.5)", marginRight: 6 }}>Possible clinical context:</span>
                {result.scenario.context}
              </div>
            )}

            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 14,
              padding: "20px",
              marginBottom: 24,
              textAlign: "left",
            }}>
              <div style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(180,160,255,0.5)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>Management Plan</div>
              {result.scenario.management.map((m, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: i < result.scenario.management.length - 1 ? 10 : 0,
                }}>
                  <span style={{ color: result.scenario.color, marginTop: 2 }}>◆</span>
                  <span style={{ color: "#e8e0ff", fontSize: 15 }}>{m}</span>
                </div>
              ))}
            </div>

            {/* Answers summary */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 14,
              padding: "20px",
              marginBottom: 24,
              textAlign: "left",
            }}>
              <div style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(180,160,255,0.5)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>Your Answers</div>
              {questions.map((q) => {
                const answerValue = answers[q.id];
                const optionLabel = q.options.find(o => o.value === answerValue)?.label || answerValue;
                const matched = result.scenario.answers[q.id] === answerValue;
                return (
                  <div key={q.id} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 10,
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: "rgba(180,160,255,0.45)", marginBottom: 2 }}>Q{q.num}</div>
                      <div style={{ fontSize: 13, color: "rgba(220,210,255,0.75)", lineHeight: 1.4 }}>{q.text}</div>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                    }}>
                      <span style={{
                        background: matched ? "rgba(34,197,94,0.15)" : "rgba(167,139,250,0.15)",
                        border: `1px solid ${matched ? "rgba(34,197,94,0.4)" : "rgba(167,139,250,0.3)"}`,
                        color: matched ? "#86efac" : "#c4b5fd",
                        borderRadius: 8,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: "bold",
                        letterSpacing: "0.04em",
                      }}>
                        {optionLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confidence */}
            <div style={{
              fontSize: 12,
              color: "rgba(180,160,255,0.4)",
              marginBottom: 24,
            }}>
              {result.score}/{result.total} criteria matched — {result.scenario.label}
            </div>

            <button
              onClick={restart}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                border: "none",
                color: "#fff",
                padding: "12px 32px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 15,
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.05em",
              }}
            >
              ↺ New Assessment
            </button>
          </div>
        )}
      </div>

      <div style={{
        marginTop: 24,
        fontSize: 11,
        color: "rgba(255,255,255,0.2)",
        textAlign: "center",
        maxWidth: 400,
        lineHeight: 1.6,
      }}>
        Based on CTG interpretation framework. Always combine with full clinical assessment.
      </div>

      {/* TWERIS SAS branding — fixed bottom right */}
      <div style={{
        position: "fixed",
        bottom: 14,
        right: 18,
        display: "flex",
        alignItems: "center",
        gap: 7,
        opacity: 0.6,
      }}>
        <img
          src="data:image/png;base64,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"
          alt="TWERIS"
          style={{ width: 22, height: 22, objectFit: "contain" }}
        />
        <span style={{
          fontSize: 10,
          color: "#c4b5fd",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}>
          A product of <strong style={{ letterSpacing: "0.15em" }}>TWERIS SAS</strong>
        </span>
      </div>
    </div>
  );
}
