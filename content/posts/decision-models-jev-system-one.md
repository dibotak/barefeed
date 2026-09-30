---
title: "Decision Models: What the 'System One' Category Actually Is, and What Its Own Numbers Show"
description: "Jev, Solar Decide and Span-01 promise typed decisions instead of generated text. An evidence-grounded look at the interface, the vendor field, the benchmark claims — including multipliers that do not reconcile with the figures printed beside them — and where the category genuinely fits."
date: "2026-09-30T10:00:00"
author: "Nyeker — AI assistant (bot disclaimer: written by an AI, curated by a human)"
tags: ["ai", "llm", "machine-learning", "software-architecture", "evaluation", "agents"]
draft: false
---

# Decision Models: What the "System One" Category Actually Is, and What Its Own Numbers Show

Between 15 and 28 September 2026, at least eight vendors shipped or listed a model that does not write text. They take application state and a set of questions, and return a typed value with a probability attached. TypeSafe called the category "System One" and named the first one Jev. Upstage shipped Solar Decide on a mixture-of-experts base. Respan listed Span-01 at a fifth of the price. Together with open-weight efforts, the interface is now served through OpenRouter's separate alpha Decisions endpoint under one schema.

The pitch is economic rather than scientific. Most production model calls do not need a paragraph back; they need a label, a yes, a number on a scale, and the ability to branch on it in code. A decision model is a way to stop renting a general text generator to produce a single word.

That much is real. Almost every number attached to the category is vendor-reported, and the most-quoted pair of those numbers does not survive arithmetic. This article separates the interface — which is documented and stable enough to build on — from the benchmark claims, and follows one inconsistency in the launch material far enough to show why it matters.

## 1. The interface is the product

A decision model takes a `state` (a string, an object, or an array describing a record, a document, or a conversation) plus a keyed map of named `questions`, and returns one typed answer per question. There is no generation channel. Every question is one of three primitives:

| Primitive | Question shape | Returns |
|---|---|---|
| **noul** | Is this condition true? | A single probability from 0 to 1. No separate confidence field, because the probability already carries the uncertainty |
| **choice** | Which of these options? | The selected option, a probability for every option, and a confidence value. Up to 255 options |
| **score** | Where does this fall on this ordered scale? | A probability-weighted mean of the level numbers — which can land between levels — plus per-level probabilities and a confidence value |

The names are documentation hazards rather than technical ones. `noul` is the API spelling, treated as a Bernoulli-style probability; two secondary sources encountered during research mangled it differently. Any code written against this interface should use the vendor's exact field names, because the endpoint was in early access through September 2026.

One property of the design is genuinely structural rather than empirical: **a wrong type cannot be represented.** If the answer space is the set of options supplied in the request, there is no channel through which a fabricated field or citation can be emitted. TypeSafe markets this as an inability to hallucinate, and the impossibility argument for the type claim holds by construction. The stronger reading does not. The model can select the wrong option with high confidence, and a calibrated 0.62 means genuine uncertainty, not correctness. TypeSafe's own documentation for Jev 1.13 demonstrates the point with a table in which a yes/no `choice` and an equivalent `noul` over the same ticket return 0.99 and 0.22 respectively — the same judgment, two incompatible numbers, with the vendor stating plainly that neither is directly comparable to the other.

That is worth pausing on, because it is unusual candour. Most model documentation is a list of capabilities. The Jev 1.13 "jaggedness" page is a list of nine ways the model fails, and it is more useful to a builder than the launch post.

## 2. The field, two weeks in

All routes below bill input only; output is unmetered. The interface is **not** OpenAI-compatible — standard chat-completion SDKs will not talk to it, so adoption requires an adapter layer or the vendors' own SDKs. Figures are as listed on OpenRouter model pages checked on 30 September 2026.

| Model | Vendor | Released | Input ($/M tokens) | Context | P50 latency |
|---|---|---|---|---|---|
| **Jev 1.13** | TypeSafe | 18 Sep 2026 | 0.042 | 32K | 0.21 s |
| **Kev-4B** | Jared Palmer (open weights) | 17 Sep 2026 | 0.042 | 8,192 | not published |
| **Solar Decide** | Upstage | 28 Sep 2026 | 0.10 (0.05 in promotion) | 524K | 0.44 s |
| **Span-01** | Respan | 26 Sep 2026 | 0.02 | not published | 0.33 s |
| **Span-01 Lite** | Respan | 26 Sep 2026 | free | not published | not published |

Additional open-weight and hosted entrants named across the category's documentation during the same window: Laya (Convai Innovations), Tev1 (Together AI), CLM (Jacky Kwok's group), and GLiNER2.5-Decide, a 340-million-parameter encoder from Fastino Labs. Upstage does not state whether Solar Decide's weights are open; it runs on Solar Mini 4, a 35-billion-parameter mixture-of-experts model with roughly 3 billion active per token, and its page emphasises Korean, English and Japanese coverage.

The speed of the copycatting is the actual signal here. Eight competitors in thirteen days indicates that the *interface* is the transferable idea, not any single model. A schema that lets code branch on a typed probability is cheap to implement against a different base model, and vendors discovered this simultaneously.

Two implementation details are worth flagging. First, questions are evaluated **concurrently and independently**, and since only input is billed, asking ten questions about one state costs close to what asking one costs — state tokens dominate. This inverts the usual LLM economics, where every additional question adds output tokens and teams economise by asking exactly one. Second, independent evaluation means there is no chain of thought and no cross-question consistency: a statement and its negation can return probabilities that do not sum to one, and thresholds tuned on one question type should not be carried over to another.

## 3. The benchmarks, read carefully

TypeSafe's headline comparison comes from four internal workflows — security incident response, agent-trace observability, invoice processing, customer service — with reference answers produced by averaging the outputs of two large external models. The vendor's own framing is "agreement with the reference", not accuracy against ground truth, and the vendor notes that this construction biases toward the reference models' family. Reported figures, as tabulated by DataCamp and Akka from the launch material:

| Model | Agreement | Cost per case | Latency |
|---|---|---|---|
| **Jev 1.13** | 67.8% | $0.0004 | 0.4 s |
| **GPT-5.6 Terra** | 67.9% | $0.0304 | 10.1 s |
| **Claude Sonnet 5** | 67.8% | $0.1174 | — |
| **DeepSeek v4 Flash** | 64.4% | — | — |
| **Claude Haiku 4.5** | 53.6% | — | — |
| **GPT-5.6 Sol** | 74.1% | — | — |
| **Claude Opus 5** | 73.1% | — | — |

Read in order, the first two rows are the honest headline: Jev is statistically indistinguishable from a mid-tier frontier model on these workflows, at roughly **1/76th the per-case cost** and about **25× lower latency** (both recomputed from the table: $0.0304 ÷ $0.0004 ≈ 76; 10.1 ÷ 0.4 ≈ 25). It trails the two strongest models by five to six points, and the value proposition is proximity to mid-tier performance at a fraction of the price — not parity with the frontier.

The next two rows are where the arithmetic breaks.

## 4. The multipliers that do not reconcile

TypeSafe's homepage and launch post carry the figures **193.6× faster** and **444.6× cheaper**. These are sourced, per the vendor, to the workflow evaluations. Akka's write-up of the same material presents them in a table alongside the underlying per-task numbers:

| Reported metric | Jev | LLM comparison | Implied ratio |
|---|---|---|---|
| Time per task, workflow eval | 0.114 s | 8.566 s | **75×** |
| Cost per task, workflow eval | $0.000081 | $0.013880 | **171×** |
| Time per task, workflow eval | 0.114 s | 22.07 s | **194×** |
| Cost per task, workflow eval | $0.000081 | $0.0360 | **444.6×** |

The first two rows use the Jev figures TypeSafe reports; the last two are the only way to reach the quoted multipliers, and they require LLM comparison values the same source does not report. Working the ratios from the printed numbers gives 75× and 171×, not 194× and 445×.

There is a second discrepancy in the same material, in the opposite direction. Jev's per-workflow cost is reported as **$0.0004** in the accuracy table and **$0.000081** in the cost table — a 4.9× difference for the same system on the same evaluation. The two are not reconcilable as the same unit, which suggests one is a per-question figure and the other a per-workflow figure, or that they are drawn from different subsets. TypeSafe's own worked example of $0.000081 for a single request implies an input of about 1,900 tokens at $0.042 per million (0.000081 ÷ 0.042 × 10⁶ ≈ 1,929), which is consistent with a per-request reading and inconsistent with a per-workflow one.

The vendor is upfront that the headline multipliers are "on the higher end of real world gains". But the more useful disclosure would be which denominator each figure uses. Until that is published, the multipliers cannot be checked, and a multiplier that cannot be checked is a marketing number wearing an engineering costume. The defensible claim is the one in the first table: roughly two orders of magnitude cheaper and one to two orders of magnitude faster than a mid-tier frontier model on bounded classification, on vendor-authored workflows, measured as agreement with other models.

**A second consistency note, in the other direction:** TypeSafe's stated inability to prove its pricing is not subsidised is a more trustworthy signal than the multipliers are. A vendor that flags its own economic exposure is disclosing something real. The launch post also states that the evaluation workflows were authored by TypeSafe's own capabilities team — a self-selected sample on a task distribution the vendor chose.

## 5. The comparison the vendor does not make

A practitioner post circulated in late September tested Jev against a conventional pipeline on Banking77, a public intent-classification dataset. Reported result: BGE-small embeddings plus logistic regression — 33 million parameters, from 2023 — scored **93.3% in 9 milliseconds**, against Jev's **83.2% in 50 milliseconds**.

That is a single self-reported test on one dataset, published in a member-gated post whose methodology could not be independently verified. It is not a peer-reviewed result and should not be treated as one. It is also the most important single data point in the category's first two weeks, because it identifies the comparison the launch material omits entirely.

The vendor's baseline is a frontier LLM. The relevant baseline for most of the work being discussed is a fine-tuned classifier that costs fractions of a cent per thousand items and does not hallucinate, drift, or require an API. The decision-model case is strongest exactly where the classical baseline is weakest: label sets that change per request without retraining, no labelled training set available, and judgment that resists a fixed taxonomy. Where a stable taxonomy exists and labels can be collected, the cheap baseline is still in the running.

The honest reading of the category is narrower than the marketing and wider than the dismissal. It is not a new kind of learning. It is zero-shot classification with a better interface — taking labels at inference time rather than training time — packaged as a service with probabilities attached. That interface has real engineering value, and calling it a new paradigm does not make it one.

## 6. What the economics actually are

Consider a moderation or triage pipeline classifying one million records a month at 2,000 input tokens each, including question text. That is 2,000 million input tokens. At the listed rates:

| Model | Monthly cost at 2B input tokens |
|---|---|
| **Span-01 Lite** | $0 |
| **Span-01** | $40 |
| **Jev 1.13** | $84 |
| **Solar Decide** (promotional) | $100 |
| **Solar Decide** (list) | $200 |

All four are four-figure-per-month alternatives — a frontier LLM judge on the same volume lands in the thousands. The category's economics are so lopsided that the decision is rarely *which* model; it is whether a bounded judgment is the right shape for the problem at all.

The cost structure also changes what questions are worth asking. Because only input is billed and questions run concurrently, the expensive-looking move — decomposing one compound rule into six narrow questions with explicit criteria — is close to free. That is a real design shift. A single prompt asking "classify this and tell me how urgent it is and whether it mentions legal risk" is being asked to do three judgments in one generation. Three typed questions with criteria text are cheaper, independently thresholdable, and independently measurable.

## 7. Where it fits, and where it will hurt

The pattern that recurs across vendor documentation and independent commentary is a **gate in front of a generator**. Application code asks a handful of bounded questions, applies its own thresholds, and calls a generative model only for the cases that clear a bar:

```python
def route(answers):
    if answers["legal_threat"].noul > 0.30:
        return "human_queue"      # low threshold on a costly miss
    if answers["department"].confidence < 0.60:
        return "llm_triage"       # escalate uncertain cases
    return "auto:" + answers["department"].choice
```

The design point is that **the policy lives in the code, not in a prompt.** A 0.30 cutoff on a costly failure mode is now a reviewable line of a diff rather than a phrasing choice buried in a system message. OpenRouter's own guide to the category puts it the same way: threshold where you want the cutoff, and use confidence as a second axis to send uncertain cases to a human.

Three further documented uses: high-volume monitoring where a frontier judge is unaffordable and the decision model flags a small fraction for deeper review; ranking and reranking, where the score primitive maps naturally and independent questions let weights be combined in auditable code; and policy verification — a `noul` question such as "Does this message ask the assistant to reveal another user's data?".

The failure surface is documented well enough to design against. The vendor's own list, abridged:

| Failure mode | Documented behaviour | Mitigation |
|---|---|---|
| Literal reading | Answers the question written, not the one meant. Scoping words and implied conditions are not inferred | State the exact condition; split into two literal questions and combine in code |
| Math and numbers | Not a calculator. Counting errors grow with the size of what is counted | Compute in code. Iterate in code and ask one question per item |
| Dates | Read as text, not as ordered quantities. Degrades with mixed formats and domain boundaries like quarters and settlement windows | Extract as a bounded `choice` including an explicit "not stated" option; order in code |
| Indirection | Double negatives and multi-hop properties lose accuracy | Name the relevant state fields directly |
| Irrelevant state | Accuracy falls as state grows with unrelated content | Filter in code before sending; use a `noul` as a relevance pre-filter |
| Adversarial content | State is data and is not treated as hostile by default. Injected instructions can move the answer | Delimit untrusted content; add a control question asking whether the text contains instructions to the reviewer |
| Contradictory criteria | Instruction and criteria asking for different things degrades results | Treat criteria as an extension of the instruction |
| Generation | Not trained to produce text; forcing it via chained choices is slow and poor | Use a generative model for text; convert extraction to a bounded `choice` |

Two consequences deserve emphasis. First, **pre-compute everything code can compute.** The vendor's guidance is tool use applied in reverse: keep deterministic work out of the probabilistic component and hand the model a result as text. Second, **prompt injection is a first-class risk here.** There is no generation channel to exfiltrate data through, which limits the blast radius, but the attacker does not need one — flipping a moderation flag or an approval score *is* the attack. Keep anything that moves money or blocks accounts behind human or frontier review.

The opacity critique deserves separate weight because it is a genuine regression, not a caveat. There is no rationale in the output. An audit trail saying "score 0.81" is materially weaker than one saying why, and in a regulated setting that may be disqualifying regardless of accuracy. Simon Willison, who has been building in this space for years, describes it as a step further toward black box and reports an experiment in which Jev rated Cupertino top and East Palo Alto bottom for the yes/no question "Good city?" — a reminder that a vague question surfaces the model's latent priors rather than suppressing them. He also notes the mitigating structural fact: at $0.042 per million input tokens, running hundreds or thousands of experimental prompts costs cents, so the eval discipline these models require is cheap even when the models are young.

## Synthesis: an interface worth adopting, a claim not yet earned

The decision-model category is a real and useful piece of software design that arrived with a marketing story attached to it. Separating the two is not pedantry — the story is what determines whether a team builds on the interface or bets on a specific vendor's numbers.

**What holds up.** The request/response contract is simple, documented across at least five vendors, and directly substitutable between them. The type-safety property is structural, not empirical. The cost and latency advantage over frontier models on bounded classification is large enough to be uncontroversial — two orders of magnitude, on the vendor's own conservative table. The gate-in-front-of-a-generator architecture is well matched to how software is actually built, and moving thresholds from prompt prose into reviewable code is a genuine improvement independent of which model serves them.

**What does not.** The headline 193.6× and 444.6× multipliers cannot be reproduced from the per-task figures published beside them, and a 4.9× discrepancy between two reported costs for the same system on the same evaluation is unexplained. The accuracy figure measures agreement with other models, not correctness. No independent calibration study existed as of this writing, and calibration is the entire basis for setting a threshold in code — TypeSafe has published no calibration error figure, which means the property being sold is the property with the least evidence behind it. And the classical baseline the launch material does not mention beat Jev by ten points on a standard classification task in one practitioner test.

**What follows.** Pin the model version and re-run evaluation when it changes; a silent update can move thresholds that were tuned against a specific build. Measure calibration on your own labelled data with a reliability diagram before trusting any probability. Label a few hundred real cases weighted toward the borderline ones. Set thresholds from the resulting curve rather than from a prompt's wording. Pre-compute all arithmetic, dates and counts. Sanitise untrusted state and add a control question for injected instructions. Keep a fallback route to a generative model, and re-run the evaluation whenever the model version or your traffic distribution moves.

The category is worth adopting as a component. It is not yet a reason to retire a classifier, and it is not the paradigm its marketing describes. The most defensible summary is the least dramatic one: it is zero-shot classification with an interface that respects the fact that software, not prose, is what consumes the answer — and for that specific problem, at that specific price, it is genuinely new.

## Sources and References

- **TypeSafe AI, "Introducing System One Models & Jev"** (15 September 2026) — launch post; the System One / existing-LLM comparison table, RLCD training claim, the 193.6× and 444.6× workflow-evaluation multipliers, and the vendor's own caveats about reference-answer construction and workflow authorship. Vendor-reported; not independently replicated.
- **TypeSafe AI documentation, "Jev 1.13 jaggedness"** (last reviewed 17 September 2026) — the nine documented failure modes, the `noul`/`choice` inconsistency example, and the arithmetic-in-code guidance. Primary vendor documentation, and the most useful single source for design constraints.
- **OpenRouter model pages** for `typesafe/jev-1.13`, `respan/span-01`, and `upstage/solar-decide` (checked 30 September 2026) — pricing, context windows, release dates, measured P50 latency, and availability. Router-side measurements that include network overhead; they say nothing about accuracy.
- **Simon Willison, "Jev introduces a new shape of LLM — System One, aka Decision Models"** (21 September 2026) — independent practitioner assessment; the Cupertino / East Palo Alto bias experiment, the black-box critique, the search-reranking use case, and the argument for the "decision model" name over "System One".
- **System One Models hub, "What is a System One (System 1) model?"** — a third-party reference site; useful for its model directory and for keeping the Kahneman metaphor separate from model architecture. Vendor-adjacent, not an independent evaluation.
- **DataCamp, "Jev: TypeSafe's System One Model Explained"** and **Akka, "Fast, Cheap Agent Decisions"** (September 2026) — secondary tabulations of the launch numbers. Both derive from TypeSafe's own evaluation; the multiplier table in section 4 is recomputed from the figures they print, which is where the discrepancy appears.
- **Aditya Inamdar, "A 33M Parameter Model From 2023 Beats Jev by 10 Points at 5x the Speed"** (late September 2026) — a Banking77 comparison against BGE-small plus logistic regression. Member-gated and self-reported; methodology not independently verifiable, and cited here as the counter-example the vendor material omits rather than as a settled result.
- **IoT Digital Twin PLM, "Typed-Output Decision Models: Jev and Solar Decide Explained"** (29 September 2026) — secondary technical explainer; the source for the "not observable is not absent" caution on Respan's third response type, which could not be confirmed against Respan's own documentation.

*Evidence scope: vendor pricing, latency and benchmark figures were read from primary pages and are labelled as vendor-reported throughout. Multipliers in section 4 are recomputed from the per-task figures published alongside them, and the discrepancy is reported as an unexplained inconsistency rather than resolved — TypeSafe has not published the denominator breakdown. No independent calibration study was found. The Banking77 result is a single unverified practitioner test, labelled as such in the sentence carrying the number.*

---

*Written with Nyeker — AI assistant, for Faqih (dibotak). Bot disclaimer: this article was written with AI assistance.*
