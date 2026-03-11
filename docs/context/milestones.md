# Waypoint — Engineering Plan
## Finals: 2026 Digital Innovation Challenge
**Deadline:** March 19, 2026 — 4:00 PM MST
**Branch:** `maka/finals`

---

## The Bible: 10 Q&A Questions We Must Answer On Screen

Every milestone exists to make one of these answerable by pointing at a running demo — not by talking. A question answered verbally is a risk. A question answered by the screen is a win.

| # | Question | Answered by |
|---|---|---|
| 1 | How do you make agents steer toward pedagogical objectives without breaking natural conversation? | M1 |
| 2 | Walk me through the technical mechanism for behavioral signal tagging | M2 |
| 3 | What happens if a student gives one-word answers or refuses to engage? | M1 (escalation prompts) |
| 4 | How is this different from a ChatGPT conversation with a career coaching prompt? | M1 + M2 together |
| 5 | What does this cost per student session at scale? | M3 |
| 6 | What's your data and privacy model — is this PIPEDA compliant? | M4 |
| 7 | Is the Indigenous scenario designed for optics? How was it validated? | Framing answer only — no engineering |
| 8 | LLMs hallucinate — how do you ensure feedback doesn't fabricate a quote? | M2 (verbatim extraction instruction) |
| 9 | One scenario is not a platform — how does this generalize? | M5 |
| 10 | What's your fallback if the live demo fails in front of judges? | M6 |

---

## Build Sequence

```
M1 (conversation engine)
  → M2 (evaluation call)      [depends on M1 producing real transcripts]
    → M3 (cost measurement)   [depends on M1 + M2 running end-to-end]
    → M6 (recorded fallback)  [depends on M1 + M2 being demo-quality]
M4 (data diagram)             [independent — design task only]
M5 (scenario template)        [independent — content task only]
```

**Target pace**
- Day 3 (Mar 13): M1 running
- Day 5 (Mar 15): M2 complete, first real end-to-end session
- Day 8 (Mar 18): Full demo rehearsed with a cold tester. Go/no-go test passes.
- Day 9 (Mar 19 morning): M6 recorded. Deck submitted by 4 PM.

---

## M1 — The Conversation Engine
**Closes:** Q1, Q3, Q4
**Type:** Core engineering build — everything else depends on this

### What to build

Two LLM agents (Kira and Dev) with a two-layer prompt architecture each:
- **Layer 1 — Persona prompt:** who they are, personality, role, relationship to the situation
- **Layer 2 — Director prompt (system context, never visible to student):** steering objectives, escalation triggers, closing question template

### Kira — director prompt requirements

Three steering stages in priority order:

1. **Open:** Present the situation, ask for the student's honest reaction. Open-ended, no right answer.
2. **Push:** If the student's response is surface-level (general impression, no specific claim), escalate:
   > *"What specifically feels off? Who does this fail?"*
3. **Close:** Extractive closing question — the non-negotiable engineering constraint:

> **"Do not proceed to the closing question until you have identified a direct quote or close paraphrase from the student's last 3 messages. Insert it into this template exactly:**
> *'You just said [STUDENT CLAIM]. So let me ask you — in a world where AI can draft this in 30 seconds, what's the role of someone who notices what you noticed?'**"

This is extractive, not generative. Pulling a paraphrase from a short recent context window is one of the most reliable LLM tasks. Failure mode is a vague paraphrase, not a fabrication — and a vague paraphrase still works.

**Low-engagement escalation (closes Q3):**
If student response is under ~15 words or contains no specific claim, Kira fires before her next turn:
> *"Give me one specific thing you noticed in that draft — however small."*

### Dev — director prompt requirements

- **Unconditional pushback:** Dev challenges whatever the student says — not because they're wrong, but to surface how they handle friction. No branching logic needed.
- **Specificity demand:** After any student response, Dev pushes for something concrete:
  > *"Okay, but what would you actually change? Give me something specific."*

The unconditional pushback is itself the answer to Q4: ChatGPT validates. Dev challenges unconditionally. Point at it during the demo.

### Proof of completion
A judge types three sentences into the simulation. Kira's closing question contains a paraphrase of one of those sentences. Screenshot it. That screenshot is the live answer to Q1 and Q4.

---

## M2 — The Post-Processing Evaluation Call
**Closes:** Q2, Q4, Q8
**Type:** Engineering build — depends on M1 producing real transcripts

**Architecture note:** This is a separate LLM call that runs *after* the conversation ends. It never runs during the simulation. This is why there is no latency problem during the conversation (Q2) and why quote extraction is reliable — it operates on a complete, static transcript (Q8).

### What to build

A structured evaluation prompt that receives:
- **(a)** Full conversation transcript
- **(b)** Both prep room baseline answers
- **(c)** The scenario-specific signal rubric for "The Draft"

### Signal rubric for "The Draft" — observable, falsifiable definitions

| Signal | Demonstrated if... |
|---|---|
| Critical Reading | Student identified a *specific named failure* in the AI draft (e.g. absence of community name, corporate register, loss of voice) — not a general impression |
| Constructive Problem-Solving | Student proposed a *specific change*, not just critique |
| Assertiveness Under Pressure | Student maintained or escalated their original position after Dev's pushback |
| Cultural Awareness | Student identified that the report fails the community it represents, not just that the writing is poor |
| Self-Advocacy | Student's answer to Kira's closing question named something they actually demonstrated in the conversation |

### Output format

```json
{
  "strengths": [
    {
      "label": "string",
      "evidence_quote": "verbatim from transcript",
      "moment_description": "string"
    }
  ],
  "growth_edges": [
    {
      "label": "string",
      "evidence_quote": "verbatim from transcript",
      "moment_description": "string"
    }
  ],
  "contrast": {
    "detected": true,
    "baseline_claim": "string",
    "demonstrated_behavior": "string",
    "contrast_framing": "You told us [baseline]. But in this conversation, [behavior]. That's worth noticing."
  }
}
```

### Verbatim quote instruction — closes Q8

The prompt must include this hard constraint:
> *"For every evidence_quote field: copy the student's exact words from the transcript. Do not paraphrase. If no single exact quote applies, use the closest verbatim fragment. Do not invent or construct a quote."*

### Contrast mechanism — closes Q2 and Q4

> *"Compare each baseline answer to the behavioral record in the transcript. If a student's demonstrated behavior contradicts their self-report, set contrast.detected to true and complete the template using verbatim behavioral evidence from the transcript."*

### Proof of completion
Run a real session. Show the raw JSON output alongside the transcript. Point to:
- An `evidence_quote` field containing verbatim text from the chat → closes Q8
- `contrast.detected: true` with the template filled → closes Q2
- The two-call architecture (conversation model ≠ evaluation model) → closes Q4

---

## M3 — Cost Measurement
**Closes:** Q5
**Type:** Measurement task — no new build, runs after M1 + M2 are complete

### What to do
Run one complete end-to-end session. Log token counts for each call from the API usage dashboard. Screenshot it.

### Expected output

| Call | Estimated tokens |
|---|---|
| Conversation (6–8 exchanges) | 1,500–2,000 |
| Evaluation call | 2,000–2,500 |
| Feedback generation | 800–1,200 |
| **Total** | **~4,500–5,700** |

At GPT-4o pricing: approximately **$0.04–0.09 per session**.

### Answer to Q5 (rehearse verbatim)
> *"We ran it. Here's the actual token count. At roughly $0.06 per session, 1,000 students per semester costs $60 in inference. The cost isn't the constraint — scenario authoring is, and that's fixed cost, not per-student."*

---

## M4 — Data Architecture Diagram
**Closes:** Q6
**Type:** Design task — 2–3 hours, fully independent

### What to produce
One diagram slide showing:

**Data flow:**
```
Student input → simulation → transcript → evaluation call → feedback JSON → student profile
```

**Retention policy:**
- Conversation transcript is discarded after the evaluation call completes
- Only persistent data: structured output (strengths, growth edges, contrast flag) — never raw conversational text
- Exception: if student explicitly saves a journal entry, only that entry is retained and attributed to their profile

**Ownership:**
- All persistent data on institution-controlled infrastructure
- Platform deployed as an institutional instance — no shared vendor database
- Students own their data; institution is custodian

**PIPEDA alignment:**
- No sensitive personal information collected (no health, financial, or biometric data)
- Behavioral signals are functionally equivalent to LMS engagement data
- Governed under existing frameworks institutions already apply to Canvas, Brightspace, etc.

### Proof of completion
One diagram. When Q6 comes in Q&A, pull up the slide. No verbal explanation required.

---

## M5 — Scenario Template
**Closes:** Q9
**Type:** Content task — 2–4 hours, fully independent

### What to produce
A visible, fillable content template with exactly five fields. Format as a document (Google Doc, Notion, or similar) — something that clearly reads as a curriculum design artifact, not an engineering file.

**The five fields:**

1. **The AI Artifact** — the thing the student evaluates (a report, proposal, message, decision brief)
2. **The Team + Their Disagreement** — two characters, their roles, what they disagree about, why the student's perspective is needed
3. **Kira's Steering Objectives** — in plain language: what skill is this agent trying to surface? What does a strong response look like vs. a surface-level one?
4. **Dev's Pushback Style** — what does he demand? (specificity, action, commitment, evidence) What does he defend?
5. **Signal Dimensions + Observable Definitions** — list the signals this scenario evaluates and define each in falsifiable behavioral terms

### Proof of completion
Show the empty template alongside "The Draft" scenario fully filled in. The visual contrast — blank fields vs. completed example — is the argument that authoring is a content task, not an engineering rebuild.

### Answer to Q9 (rehearse verbatim)
> *"Here's the template. Here's The Draft filled in. A career centre staff member can create a new simulation in a morning. The engineering doesn't change between scenarios — only the content does."*

---

## M6 — Recorded Fallback
**Closes:** Q10
**Type:** Recording task — runs after M1 + M2 are demo-quality

### What to produce
A screen recording of a complete real session — real LLM responses, not mocked — that plays in the same interface as the live demo. Judges cannot tell the difference between this and a live session that went as planned.

### Recording must include, in order
1. Prep room (both questions answered)
2. Full simulation conversation (real agent responses, 6–8 exchanges, including Kira's extractive close referencing something from the conversation)
3. Transition screen ("Simulation complete. You've got messages.")
4. Feedback messages (real LLM output, at least one message containing a verbatim quote)
5. What Showed Up (signal map with evidence quotes)
6. The Way (three action items)

### How the fallback triggers
Silently. The presentation does not acknowledge a switch. The same browser tab plays the recording instead of running live. Judges see the same experience either way.

### Why this is a milestone, not an afterthought
A demo failure with no fallback is the most memorable moment of the competition — and it changes how judges score everything that came before it. Record it before you need it.

---

## The Go/No-Go Test — March 18

Sit down with one person who has never seen the product. No briefing. No setup. Just *"click this button."*

After the feedback loads, ask one question:

> **"Does that message contain something you actually said?"**

- **Yes** → you're ready. Submit.
- **No** → M1's extractive close needs another iteration before March 19.

This test is worth more than any amount of internal rehearsal.

---

## What Is Not Engineering

**Q7 — Indigenous scenario validation** is answered with a rehearsed verbal response only. No build required.

Prepare and deliver this without hedging:
> *"The scenario was chosen because it creates the sharpest possible contrast between what AI produces and what cultural awareness produces — it's pedagogically optimal, not demographically targeted. The scenario works for any student. For institutional deployment at schools with significant Indigenous student populations, we would co-design the scenario content with Indigenous students and advisors as part of the authoring process for that institution's version."*
