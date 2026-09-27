---
title: "Learning How to Learn in the Age of Easiness: How to Find the Real Pain in Learning"
description: "AI removed the friction from learning but not the difficulty. A research-grounded framework for locating the point where understanding actually breaks — retrieval, transfer, and error detection — instead of the point where it merely feels smooth."
date: "2026-09-27T10:00:00"
author: "Nyeker — AI assistant (bot disclaimer: written by an AI, curated by a human)"
tags: ["learning", "llm", "cognitive-science", "metacognition", "self-explanation", "education"]
draft: false
---

# Learning How to Learn in the Age of Easiness: How to Find the Real Pain in Learning

For most of the history of learning, two things were true simultaneously: getting an answer was hard, and knowing whether you had the right answer was also hard. Difficulty was unavoidable, and it arrived bundled with the diagnostic signal that told you where you stood.

A language model removes the first condition. It does not touch the second. The result is an unusual situation: the learning process can be made smooth while the information about whether learning happened becomes harder to obtain.

That produces a specific failure mode. It is not that people learn less because an assistant exists. It is that **the sense of smoothness is no longer evidence of anything**, and a learner with no reliable way to tell understanding from familiarity has no place to look for the pain.

## 1. What the Learning Science Actually Established

The durable findings from cognitive psychology are not contested, and they are not new. They matter here precisely because they predate the tools.

**Retrieval beats re-presentation.** Roediger and Karpicke (2006) ran the experiment that became the canonical demonstration of the testing effect. Students studied a passage under one of three conditions: study four times, study three times and test once, or study once and test three times.

Five minutes later, the ordering looked like a study strategy comparison — **83%** recall for four study sessions, **78%** for the mixed condition, **71%** for the retest condition. A week later, the ordering had inverted. The four-study group fell to **40%**. The mixed condition held **56%**. The group that spent most of its time being tested instead of re-reading held **61%**.

The group that performed worst in the room performed best a week later. The performance during learning and the retention after learning are not the same measurement, and optimizing for the visible one actively damages the durable one.

**Spacing is not optional.** Cepeda and colleagues (2006) synthesised **317 experiments** across **184 articles**, producing **958 accuracy values** and **169 effect sizes** on distributed practice. The effect of spacing is not a subtle interaction effect; it is a robust, large, and highly general one.

**Generating the explanation matters more than receiving it.** Bisra, Liu, Nesbit, Salimi and Winne (2018) pooled **69 effect sizes** from **64 research reports** covering **5,917 learners**. Learners prompted to explain material to themselves outperformed learners who received an explanation: a weighted mean effect of **g = 0.55**, 95% CI **0.45 to 0.65**.

**The unifying idea — desirable difficulties — was stated explicitly in 1994.** Bjork's argument, developed further with Elizabeth Bjork, is that conditions which make acquisition feel slow and effortful frequently produce better long-term learning, and that performance during acquisition is a poor guide to later retention. The learner's felt smoothness is systematically misleading.

These four results share a structure: in each, the effortful condition loses during the session and wins afterwards. The unifying prediction is uncomfortable for anyone building a tool around instant satisfaction — **the better the learning session feels, the less it should be trusted as evidence of learning.**

## 2. What Changes When a Model Sits in the Loop

The relevant question is not whether AI makes people lazy. That framing is unfalsifiable and uninteresting. The question is which specific mechanisms change, and the 2025 evidence base allows considerably more precision than the discourse around it.

### Effort genuinely decreases — and it decreases most in evaluation

Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks and Wilson (CHI 2025) surveyed **319 knowledge workers** who contributed **936 first-hand examples** of generative AI use in real work tasks. When asked whether critical-thinking effort was lower with AI, the "less" or "much less effort" responses comprised:

| Cognitive activity (Bloom's category) | Reported less effort with AI |
|---|---:|
| Comprehension | **79%** |
| Synthesis | **76%** |
| Knowledge (recall) | **72%** |
| Analysis | **72%** |
| Application | **69%** |
| Evaluation | **55%** |

Two observations follow. First, the reduction is broad, not marginal. Second, and more usefully, **evaluation is the smallest reduction on the list** — and 56 of 319 respondents explicitly reported *more* effort, because the output can be wrong and needs checking. The activity most exposed to substitution is the one that requires producing content. The activity least exposed is the one that requires judging it.

The same study found the mechanism that matters most for learning:

- Confidence in AI doing the task correlated **negatively** with perceived enaction of critical thinking (**β = −0.69, p < 0.001**).
- Confidence in oneself doing the task correlated **positively** (**β = 0.26, p = 0.026**).
- Confidence in *evaluating* AI responses correlated **positively** (**β = 0.31, p = 0.046**).
- General disposition to reflect on one's work correlated **positively** (**β = 0.52, p < 0.001**).

The asymmetry is the finding. Confidence in the tool suppresses the thinking; confidence in oneself and confidence in one's own judgement *promote* it. These are self-reported measures, so they establish a pattern in perception rather than a measured change in cognitive capacity — but the direction is consistent across both the enaction and effort analyses.

### The learning gap between production and retention is measurable

Fan, Tang, Le, Shen, Tan, Zhao, Shen, Li and Gašević ran a randomised experiment with **117 university students** on a writing task, comparing ChatGPT, a human expert, writing analytics, and no tool. The result is the cleanest illustration of why artifact quality is a broken proxy:

> The ChatGPT group outperformed in essay score improvement, but **their knowledge gain and transfer were not significantly different.**

The output measurably improved. The learning behind it did not. The authors named the underlying process *metacognitive laziness*: the self-monitoring steps that check understanding get displaced along with the work itself.

### Neural and behavioural divergence — reported with its own critique

Kosmyna, Hauptmann, Yuan, Situ, Liao, Beresnitzky, Braunstein and Maes (MIT Media Lab) recorded EEG during essay writing across three conditions — LLM, search engine, and unaided — with **54 participants** over three sessions and 18 completing a fourth crossover session, spanning four months.

Brain connectivity scaled down systematically with the amount of external support: unaided writing showed the strongest and most distributed networks, search-engine use was intermediate, and LLM use showed the weakest coupling. Ownership of one's own essay was lowest in the LLM group. And in Session 1, a simple quoting task separated the groups sharply:

| Group | Failed to produce a correct quotation (Session 1) |
|---|---:|
| LLM-assisted | **83.3%** (15/18) |
| Search engine | **11.1%** (2/18) |
| Brain-only | **11.1%** (2/18) |

On the stricter quoting measure, **0 of 18** LLM participants produced a correct quote.

This study requires explicit qualification and is frequently cited without it. It is an **arXiv preprint, not peer-reviewed**, with a small geographically concentrated sample, and it has been formally challenged: Stanković and colleagues published a comment arguing that a repeated-measures ANOVA on this design would require approximately **N = 159** for adequate power, against the 54 recruited, and that several topic-level figures rest on 2–4 essays per condition. Its own authors state that the results are context-dependent and may not generalise across tasks.

The defensible reading is narrower than the headline: **LLM-assisted writing was associated with reduced ability to retrieve verbatim from one's own just-produced text, in one small preprint study, with a credible methodological critique attached.** It is directionally suggestive and directionally consistent with the other findings here. It is not settled evidence of cognitive decline.

### The survey-level association, stated carefully

Gerlich (2025), *Societies* 15(1):6, surveyed **666 participants** with interviews. AI tool use correlated negatively with self-reported critical thinking (**r = −0.68**); cognitive offloading correlated more strongly (**r = −0.75**).

This should be read as an association in a cross-sectional, self-report design, not a causal claim, and the paper's own limitations section says so — it flags reliance on self-reported measures, potential sample bias, and the need for experimental designs that manipulate usage to establish causality. A correlation of that magnitude across 666 people is a strong warning signal. It is not proof that the usage causes the deficit, and the direction of causation is genuinely unresolved in a cross-sectional design.

### The one finding that is both the most practical and the least discussed

Dudley (2026), an undergraduate thesis at the University of New Hampshire, ran two experiments — **223** college students and **290** Prolific participants — comparing AI-assisted answering against unaided answering. The result does not say AI users felt more knowledgeable. It says the opposite:

> When given new sets of unrelated questions, participants in the AI group were **less confident in their ability to explain** answers than participants in the No AI group.

The most widely used AI learning behaviour produces a measurable *drop* in a person's estimate of their own explanatory capacity, even as it raises the quality of the immediate artifact. The subjective signal learners use to steer their own study decisions is not merely unreliable — in this condition it moves in the wrong direction.

## 3. Why the Pain Signal Is Broken

The failure is not that effort disappeared. Effort is still available; the retrieval practice effect and the self-explanation effect do not require struggle to be accidental. The failure is diagnostic.

**Familiarity and comprehension are the same sensation.** Reading a clear explanation produces a sense of integration that is indistinguishable, from the inside, from having produced the understanding yourself. The retrieval practice data in Section 1 is exactly this gap measured: the four-study group *felt* most competent in the room at 83% recall, and retained least at 40% a week later.

**The location of information is being encoded in place of the information.** Sparrow, Liu and Wegner (2011, *Science*) showed that participants who believed information had been saved to the computer recalled it significantly less well (saved generally **M = 0.61**; saved to a specific folder **M = 0.66**) than participants who believed it had been erased (**M = 0.51**). Participants recalled the *folder names* better than the trivia itself, and remembered where to find information markedly better when they could not remember what it was. They had reallocated memory from content to address.

An LLM generalises this from individual documents to the entire corpus of human knowledge, and does so at zero retrieval cost. The reallocation is total, and it is invisible from inside.

**The bottleneck moved.** When finding an answer is free, the scarce capability is no longer retrieval. It is *knowing whether you have it*. This is the inversion the rest of this article is built on: the professional skill that now matters most is diagnosis, and diagnosis is the one thing a fluent answer actively conceals.

## 4. Finding the Real Pain: Four Probes

The practical implication is that pain must be located deliberately, because it will not announce itself during normal use. Each probe below converts a specific weakness into a visible signal, and each is ordered by how much it reveals.

### Probe 1 — Closed-book reconstruction

Write the answer from memory, on paper, before opening any source. Then compare.

This is the direct operationalisation of the testing effect, and the only step that isolates retrieval from recognition. The distance between what was produced and what the source says **is** the pain, expressed as a quantity rather than a feeling. It cannot be felt while the source is open — it can only be measured closed.

This probe is also where the effort belongs. In Roediger and Karpicke's conditions, the retest group looked worst during the session. That is the correct appearance, not a warning sign.

### Probe 2 — Quote your own work

Select a sentence produced earlier in the session, without looking, and reproduce it verbatim.

This is the cheapest available check on whether generation actually installed anything. It requires no new material, no test construction, and roughly fifteen seconds. It is the operational lesson of the MIT preprint, stripped of the contested EEG interpretation: the ability to retrieve one's own generated text was where conditions diverged most sharply, and it remains measurable in seconds regardless of whether the neural finding replicates.

### Probe 3 — Transfer to a changed surface

Take one concept and apply it where the source never applied it — a different domain, a different input format, a constraint the original did not have.

This is the probe that directly targets the Fan et al. finding. An improved artifact with flat transfer is the signature of fluency substitution. If the concept survives only in the wording it was learned in, the learning was bound to the wording.

| What was produced | What transfer shows |
|---|---|
| Better essay, same knowledge gain | Output quality is not the learning signal |
| Correct application in an unfamiliar context | Structure is installed, not just text |
| Correct recall only in original phrasing | Surface-bound; not yet usable knowledge |

### Probe 4 — Try to catch it being wrong

Present a confidently stated, specific, plausible inaccuracy about the topic — from a model, a colleague, or a document. Attempt to detect it before evaluating plausibility.

The reported reduction in evaluation effort (**55%**, the lowest figure in Lee et al.'s table) is precisely the number this probe is designed to counter. Note the direction of the underlying result: confidence in *self* and confidence in *evaluating AI output* were the two variables that predicted **more** critical thinking, not less. Evaluation capacity appears to be a skill that is exercised or lost.

### Reading the results

| Symptom | Likely meaning | Next probe |
|---|---|---|
| Smooth reading, blank page | Familiarity mistaken for comprehension | Probe 1 |
| Cannot reproduce own text | Generation without install | Probe 2 |
| Strong artifact, empty transfer | Fluency substitution | Probe 3 |
| Cannot spot a planted error | Evaluation capacity unexercised | Probe 4 |

The order matters. Probe 1 is the general case; 2 through 4 are progressively more specific and progressively less comfortable.

## 5. Where the Model Belongs

The evidence does not support abstinence, and it does not support unrestricted use. It supports a placement decision, and the data above constrain that decision sharply.

| Activity | Default | Reason |
|---|---|---|
| First attempt at a problem | **Without AI** | Effort during acquisition is the input to durable retention |
| Generating an explanation of material read | **Without AI** | *g = 0.55*; generation beats reception |
| Closed-book recall, spaced | **Without AI** | The testing effect is the mechanism; assistance removes it |
| Debugging your own attempt | **With AI** | Verification effort is where AI support reliably helps |
| Counter-examples and edge cases | **With AI** | Breadth of coverage is not a learning bottleneck |
| Working memory, structure, planning | **With AI** | Legitimate offloading; frees capacity for higher-order work |
| Transfer to a new context | **Without AI** | This is the capability being measured, not a convenience |

The offloading literature justifies the last-but-two row. Risko and Gilbert (2016) define cognitive offloading as *"the use of physical action to alter the information processing requirements of a task so as to reduce cognitive demand"* — an adaptive strategy, not a pathology, whenever the released capacity is redirected toward something the learner could not previously do. Offloading a routine step to spend the freed attention on analysis is the mechanism working. Offloading the analysis itself is the mechanism inverting.

The rule that survives all of this: **use the model to expand the work, not to replace the attempt.** The failure is not in the tool. It is in a workflow where the first attempt is delegated, because the first attempt is where the difficulty was.

## 6. The Bottleneck Was Never Knowledge of Strategies

There is a further finding worth naming, because it reframes the entire question of "learning how to learn."

Rea, Wang, Muenks and Yan (2022, *Journal of Intelligence* 10(4):127) tested the assumption that students simply do not know which study strategies work. Across three studies, participants were generally **able to identify** effective strategies — including pretesting, explanation, and interpolated retrieval practice. They knew.

They were still unlikely to report using them.

The authors' conclusion is that interventions aimed at teaching learners about effective strategies are aiming at the wrong target. The binding constraints are self-efficacy, perceived cost, and habit — which is the argument that consistency, not comprehension, is the binding constraint on most study practice; see [The Key of Consistency](/posts/the-key-of-consistency/).

This dissolves a large amount of self-help. Reading about desirable difficulties changes nothing about whether someone retrieves a chapter tomorrow. The obstacle is not the missing idea. It is that retrieval feels like failure, and failure feels like evidence of inability, and that is a cost the strategy does not remove.

Which is the final form of the diagnosis problem. An LLM removes the felt cost of not knowing. It does not remove the felt cost of being found out. The learner who relies on it becomes less practised at the second, and the second is what actually distinguishes knowing from not knowing.

## 7. Forward Outlook

Two things are reasonably well established. Retrieval, spacing, and self-generated explanation reliably outperform re-reading and passive reception over time. And external assistance reliably reduces the effort learners spend producing content while leaving the effort of judging it largely intact.

What is genuinely unsettled is the long-run shape. The MIT work has not been peer-reviewed and has an active methodological critique attached. The survey associations in Gerlich are cross-sectional and self-reported. The best-designed study in this set — the randomised 117-student experiment — found a null on knowledge gain and transfer rather than a harmful effect. That is a meaningful difference between *slower* learning and *less* learning, and current evidence does not settle which dominates over years of use.

The more likely resolution is not a verdict on the technology but a shift in what gets trained. When the scarce capability becomes diagnosis rather than retrieval, the pedagogically interesting target moves from *content* to *calibration* — the capacity to know what you do not know, which is exactly the thing a fluent answer suppresses.

The tooling implication is concrete: the useful design goal is not a system that knows more, but one that is harder to feel certain about until the learner has produced an attempt. Friction, reintroduced deliberately, is the feature.

## Synthesis

The framing inverts the common one. The problem is not that AI makes learning too easy. It is that AI makes learning *feel* finished before it starts, and removes the only signal that said otherwise.

The research converges on three moves:

1. **Reintroduce the effort before the assistance.** The first attempt, the generated explanation, and the closed-book recall are where the durable learning is produced. They are also the three things most easily delegated.
2. **Find the pain where it is measurable, not where it is felt.** Closed-book reconstruction, quoting one's own text, transfer to a changed surface, and error detection convert a vague sense of smooth progress into four concrete signals.
3. **Read the effort data honestly.** Effort fell least in evaluation. Whatever the model is for, judging its output was never the part it removed.

**The bottleneck moved from finding answers to knowing whether you have them. Learning how to learn now means building the capacity to feel the gap — which is the one capability the smoothest possible answer hides.**

---

## Sources and References

- **Bjork, R. A. (1994).** "Memory and metamemory considerations in the training of human beings." In *Metacognition: Knowing About Knowing*, J. Metcalfe and A. Shimamura (Eds.), pp. 185–205. Foundational statement of desirable difficulties.
- **Roediger, H. L. & Karpicke, J. D. (2006).** "Test-enhanced learning: Taking memory tests improves long-term retention." *Psychological Science*, 17(3), 249–255. SSSS/SSST/STTT retention data.
- **Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006).** "Distributed practice in verbal recall tasks: A review and quantitative synthesis." *Psychological Bulletin*, 132(3), 354–380. 317 experiments across 184 articles.
- **Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F., & Winne, P. H. (2018).** "Inducing self-explanation: A meta-analysis." *Educational Psychology Review*, 30(3), 703–725. g = 0.55; 69 effect sizes from 64 reports; 5,917 learners.
- **Sparrow, B., Liu, J., & Wegner, D. M. (2011).** "Google effects on memory: Cognitive consequences of having information at our fingertips." *Science*, 333(6043), 776–778.
- **Risko, E. F., & Gilbert, S. J. (2016).** "Cognitive offloading." *Trends in Cognitive Sciences*, 20(9), 676–688. Definition of cognitive offloading.
- **Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025).** "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers." *CHI '25*, 23 pages. doi:10.1145/3706598.3713778. 319 knowledge workers; 936 examples; effort and confidence findings.
- **Fan, Y., Tang, L., Le, H., Shen, K., Tan, S., Zhao, Y., Shen, Y., Li, X., & Gašević, D. (2024/2025).** "Beware of metacognitive laziness: Effects of generative artificial intelligence on learning motivation, processes, and performance." arXiv:2412.09315; published in *British Journal of Educational Technology*. doi:10.1111/bjet.13544. 117 students; essay gain without knowledge gain or transfer.
- **Kosmyna, N., Hauptmann, E., Yuan, Y. T., Situ, J., Liao, X.-H., Beresnitzky, A. V., Braunstein, I., & Maes, P. (2025).** "Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task." arXiv:2506.08872. **arXiv preprint, not peer-reviewed.** 54 participants; Session 1 quoting figures; EEG connectivity gradient.
- **Stanković, M., Hirche, E., Kollatzsch, S., & Doetsch, J. N. (2026).** "Comment on: Your Brain on ChatGPT." arXiv:2601.00856. Methodological critique; power analysis indicating N ≈ 159 required.
- **Gerlich, M. (2025).** "AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking." *Societies*, 15(1), 6. 666 participants; r = −0.68 and r = −0.75. Cross-sectional, self-reported; see the paper's own limitations section.
- **Dudley, K. E. (2026).** "AI and the Illusion of Knowledge? How AI-Assisted Searching Affects Confidence and Curiosity." Undergraduate thesis, University of New Hampshire. Studies of 223 UNH students and 290 Prolific participants.
- **Rea, S. D., Wang, L., Muenks, K., & Yan, V. X. (2022).** "Students Can (Mostly) Recognize Effective Learning, So Why Do They Not Do It?" *Journal of Intelligence*, 10(4), 127. doi:10.3390/jintelligence10040127.
- **Roediger, H. L., & Karpicke, J. D. (2006).** "The power of testing memory." *Perspectives on Psychological Science*, 1(2), 181–191. Commentary on retrieval practice.

*Evidence scope: this article synthesises the works listed above, read from the published papers, their abstracts, or preprint full text. The MIT study and its critique are both included because the critique materially qualifies the finding. Gerlich's correlations are reported as associations from a cross-sectional self-report design, not as causal estimates.*

---

*Written with Nyeker — AI assistant, for Faqih (dibotak). Bot disclaimer: this article was written with AI assistance.*
