---
title: "The Algorithmic Curriculum: Social Media's Next Shape and What It Does to Learning"
description: "A research synthesis of where social media is heading — interest-graph feeds, social search, AI participants, and regulated feed choice — and what the evidence says about how that environment affects attention, retention, and what people end up knowing."
date: "2026-10-10T10:00:00"
tags: ["social-media", "algorithms", "recommender-systems", "learning", "attention", "cognitive-science"]
draft: false
---

Social media's near future is being decided by three forces at once: the consolidation of discovery into AI-curated interest feeds, a regulatory and market push that is making the feed algorithm a user-facing choice, and the arrival of AI participants inside the social environment itself. Research on learning suggests the interesting question is not which platform wins. It is what kind of information environment results — and what that environment trains people to do with what it shows them.

This article synthesizes platform disclosures, regulatory documents, national assessment data, and peer-reviewed research on short-form video, multitasking, and misinformation to describe that environment and its measurable effects on learning. Where the evidence is correlational, the article says so.

---

## 1. The Shape: Four Structural Shifts

### From social graph to interest graph

The defining move of the last platform cycle was the replacement of the social graph — content from accounts a person follows — with the interest graph: content an algorithm predicts a person will engage with. Meta disclosed in 2023 that more than 20 percent of the content in a person's Facebook and Instagram feed was already recommended by AI from people, groups, or accounts the person does not follow (Meta AI, 2023). TikTok built its entire product on that premise from the start, which is why its recommendation algorithm is the asset governments treat as strategically sensitive.

The direction of travel is one-way. A feed computed from behaviour rather than from subscriptions does not need the user to declare interests, follow anyone, or return to a specific community. It needs only engagement signals. That property is what makes the feed portable across jurisdictions, transferable between owners, and — as the next section shows — increasingly negotiable with regulators.

### Search moves into the feed

Discovery is no longer only a query surface. Prabhakar Raghavan, then Google's President of Search, told the Fortune Brainstorm Tech conference in 2022 that in Google's own studies, "something like almost 40% of young people, when they're looking for a place for lunch, they don't go to Google Maps or Search... They go to TikTok or Instagram" (TechCrunch, 2022). The figure is narrower than the headline versions that circulated afterward — it covers decision-style local and lifestyle searches, not all search (Econsultancy, 2022) — but the direction is the finding: a substantial share of young users treat an algorithmic feed, not an index, as the first place to look.

### The always-on baseline

Usage data put a floor under how much of daily life the feed now occupies. In the Pew Research Center's 2024 survey of U.S. teens, 73 percent reported visiting YouTube daily — including 15 percent who described their use as almost constant — and one-third used at least one of five major platforms almost constantly (Pew Research Center, 2024). A year later, Pew found 64 percent of U.S. teens using AI chatbots, including roughly three in ten doing so daily (Pew Research Center, 2025). The near-future shape is therefore not a feed plus a separate AI assistant. It is a single environment where algorithmic content, peer content, and conversational AI sit side by side, and where a large minority of adolescents move through it close to continuously.

### Regulated feeds and owned algorithms

Two parallel developments are changing who controls the ranking. In the European Union, Article 38 of the Digital Services Act requires very large online platforms to offer at least one recommender-system option that is not based on profiling — in practice, a chronological or non-personalized feed (European Commission, 2024). Separately, TikTok signed binding agreements on 18 December 2025 to form a U.S. joint venture with Oracle, Silver Lake, and MGX — 15 percent each, with ByteDance retaining 19.9 percent — expected to close on 22 January 2026. The venture's stated remit includes algorithm security, and TikTok's own announcement says the content recommendation algorithm will be retrained on U.S. user data and secured in Oracle's U.S. cloud environment (TikTok Newsroom, 2025; ABC News, 2025).

The first development makes the algorithm visible; the second makes it a governed asset. Neither reverses engagement-based ranking in the mainstream. Both make the feed something a user, a regulator, or an owner can inspect and choose — which did not use to be true.

## 2. The Algorithm: From Ranking Content to Choosing the Ranker

### How the feed works now

Meta's engineering disclosure describes the pipeline: retrieval systems narrow billions of items to thousands, then to a few hundred relevant candidates in hundredths of a second; ranking models then score candidates pointwise and listwise, with a re-weighting layer that adjusts for a "balanced, engaging mix" (Meta AI, 2023). The optimization target throughout is predicted engagement. Nothing in the published descriptions optimizes for what a viewer retains, understands, or can later use.

### Where it goes next

Three trajectories are visible in current deployments rather than in speculation:

- **Generative curation.** Bluesky's Attie (2026) lets users build a custom feed by describing it in natural language — "posts about urban ecology from researchers" — instead of writing code. Curation is becoming a prompt. The interest graph does not disappear; it becomes user-specified where the infrastructure allows it (Bluesky launched third-party custom feeds in May 2023, and independent developers now build most feeds on the network — Bluesky, 2023).
- **Jurisdiction-specific ranking.** The TikTok U.S. joint venture will retrain the recommendation algorithm on U.S. user data under Oracle oversight (TikTok Newsroom, 2025). If that model works, feed algorithms become regional products — tuned, audited, and versioned per market.
- **Non-profiled options by law.** Article 38 options already exist on the major EU platforms. Adoption is a minority behaviour, but the existence of a non-profiled default alternative changes what "the algorithm" means: a selection among feeds, not a single hidden arbiter.

### The moderation layer shifts too

In January 2025 Meta ended its third-party fact-checking program in the United States and moved to a Community Notes model, dropping interstitial warnings for a less obtrusive label (Meta, 2025). The practical consequence for learning is subtle but real: platform truth-signalling moves from institutional review toward crowd context that appears beside the post. How well that layer works under load is still an open research question; what is established is that the burden of evaluation moves further toward the reader.

## 3. What This Does to Learning

### The cost side: consistent associations, limited causal proof

The most comprehensive current synthesis is a meta-analysis of 71 studies on short-form video use published in *Psychology of Popular Media* (2026). Greater short-form video engagement was associated with poorer cognition (r = −.34), with the strongest associations on attention (r = −.38) and inhibitory control (r = −.41), and with poorer mental health (r = −.21). The patterns held across youth and adult samples and across platforms. The authors' own framing matters: these are **correlations**, drawn heavily from cross-sectional and self-report designs, and a correlation of −.34 describes association, not demonstrated causation.

Classroom-level evidence is more directly experimental. In a randomized design, Sana, Weston, and Cepeda (2013) had students multitask on laptops during a video lecture; multitaskers scored about 11 percent lower on the comprehension test, and students merely seated in view of a multitasking peer scored 17 percent lower. Two properties of that result survive the decade since: the cost is paid in *comprehension*, not just in time, and it is paid by bystanders — which means the feed's effect on learning is partly a classroom externality, not a private choice.

At population scale, PISA 2022 found that 65 percent of students across OECD countries reported being distracted by digital devices in at least some mathematics lessons, and that students reporting distraction by devices in class scored 15 points lower in mathematics after accounting for socio-economic profile (OECD, 2024). Distraction by peers using devices was also associated with significantly lower scores. PISA is observational — the association survives controls but is not an experiment — so the honest reading is alignment with the experimental evidence, not independent proof of causation.

The misinformation layer compounds the noise problem. Vosoughi, Roy, and Aral (2018), analyzing roughly 126,000 rumor cascades on Twitter, found false news was 70 percent more likely to be retweeted than true news, and that true stories took about six times as long to reach 1,500 people. Bots spread true and false news at equal rates; humans did the differential sharing. A learner's feed is therefore not merely fragmented — it is an environment in which the false variants travel structurally faster, produced by the same engagement dynamics the ranking optimizes.

### The upside side: the feed as a delivery system

The same interest-graph mechanics that fragment attention also lower the cost of finding dense material, and the sales and platform data show it operating at scale. Circana BookScan data indicate BookTok exposure accounted for roughly one in twelve print books sold in the United States in 2023 — about 46 million units (Circana BookScan, reported 2024) — in a print market that has held above 760 million units through 2025 (Publishers Weekly, 2026). TikTok's dedicated STEM feed, launched in the U.S. in March 2023 for users 18 and under and expanded to all users in 2024, coincided with STEM-content volume growing 35 percent globally since launch (TikTok Newsroom, 2024).

These are discovery outcomes, not learning outcomes — buying a book and understanding it are different measurements. But they establish that the interest graph can route people to substantive material efficiently, and that "the feed" is not monolithic: the same ranking machinery that maximizes watch time also surfaces study content when engagement data support it.

### Reading the two sides together

The evidence base has a consistent internal structure:

- The **costs** are documented mainly through attention, comprehension, and retention — the mechanisms that determine whether studying works. They are correlational at the feed level and experimental at the task level, and they agree in direction.
- The **benefits** are documented mainly through discovery and access — finding the book, the explanation, the course. They are real but incidental to the platform's objective.

That asymmetry is the core finding. Cognitive research on learning has long established that retrieval practice produces durable retention where re-presentation does not (Roediger & Karpicke, 2006), and that conditions which make acquisition feel effortful often produce better long-term learning (Bjork, 1994). A feed optimized for effortless consumption sits on the wrong side of both results by design. It can deliver excellent material to the doorstep; what it cannot do is supply the retrieval, the generation, and the error-checking that turn exposure into knowledge. The near-future feed will keep teaching — accidentally, opportunistically, and mostly in the mode of re-presentation.

## 4. Synthesis

Three conclusions, with confidence stated:

1. **Interest-graph feeds plus AI curation will dominate the near future** — *high confidence*. Every disclosed platform trajectory (Meta's unconnected-content share, TikTok's governed retrain, generative feed builders) extends the same mechanism, not a different one.
2. **Feed choice becomes a real option, adopted by a minority** — *moderate confidence*. Regulation (DSA Article 38) and infrastructure (custom feeds) now exist; adoption patterns so far suggest niche rather than default use.
3. **The learning impact runs through processing mode, not content quality** — *moderate confidence, best-supported claim*. The measured harms are attention and comprehension costs; the measured benefits are discovery gains. Nothing in the engagement objective optimizes for retention. A learner's outcome therefore depends less on what the feed contains than on whether its use is followed by retrieval and checkable work — the one thing the feed's design leaves entirely to the learner.

**The next feed will be more curated by AI, more choosable by users, and more crowded with synthetic and conversational participants than the current one. It will remain an excellent delivery system and an indifferent teacher. The gap between those two roles is where learning is decided — and no algorithm is being optimized to close it.**

---

## Sources and References

- **Meta AI (2023).** "The AI behind unconnected content recommendations on Facebook and Instagram." Meta AI engineering blog. More than 20% of feed content AI-recommended from unconnected accounts; retrieval and ranking pipeline description.
- **Raghavan, P. (2022).** Remarks at Fortune Brainstorm Tech, July 2022, reported by TechCrunch (2022-07-12) and Business Insider. "Almost 40%" of young people use TikTok/Instagram for decision-style local search; **caveat**: covers lunch-style searches, not all search (Econsultancy, 2022, "Are 40% of Gen Z shunning Google for TikTok? Not exactly").
- **Pew Research Center (2024).** "Teens, Social Media and Technology 2024." 73% of U.S. teens on YouTube daily (15% almost constant); one-third use at least one major platform almost constantly.
- **Pew Research Center (2025).** "Teens, Social Media and AI Chatbots 2025." 64% of U.S. teens use AI chatbots; roughly 3 in 10 daily.
- **European Commission (2024).** Digital Services Act, Article 38: very large platforms must offer at least one recommender option not based on profiling.
- **TikTok Newsroom (2025).** "Announcement from the new TikTok USDS Joint Venture LLC." Algorithm security remit; retraining on U.S. user data in Oracle's cloud. Corroborated by ABC News and BBC reporting on the 18 December 2025 agreements (closing expected 22 January 2026; Oracle/Silver Lake/MGX 15% each; ByteDance 19.9%).
- **Bluesky (2023).** "Algorithmic Choice with Custom Feeds." Custom feeds launched May 2023; majority built by third-party developers. Attie (2026) adds natural-language feed creation.
- **Meta (2025).** "More Speech and Fewer Mistakes." End of U.S. third-party fact-checking; move to Community Notes, January 2025.
- **Sana, F., Weston, T., & Cepeda, N. J. (2013).** "Laptop multitasking hinders classroom learning for both users and nearby peers." *Computers & Education*, 62, 24–31. Randomized; ~11% lower for multitaskers, 17% lower for peers in view.
- **OECD (2024).** PISA 2022 results: "Students, Digital Devices and Success" policy briefs and *PISA 2022 Results (Volume II)*. 65% of students distracted by devices in some mathematics lessons; distracted students scored 15 points lower in maths after socio-economic controls. **Observational, not causal.**
- **"Feeds, feelings, and focus: A systematic review and meta-analysis examining the cognitive and mental health correlates of short-form video use."** *Psychology of Popular Media* (2026); PubMed 41231585. 71 studies; r = −.34 cognition, −.38 attention, −.41 inhibitory control, −.21 mental health. **Correlational synthesis.**
- **Vosoughi, S., Roy, D., & Aral, S. (2018).** "The spread of true and false news online." *Science*, 359(6380), 1146–1151. False news 70% more likely to be retweeted; true stories took ~6× longer to reach 1,500 people; humans, not bots, drove the differential.
- **Circana BookScan (reported 2024).** BookTok-attributed sales ≈ 1 in 12 U.S. print units in 2023 (~46 million). See also Publishers Weekly (2026): 762.4 million print units in 2025.
- **TikTok Newsroom (2023, 2024).** STEM feed launch (March 2023, U.S. users ≤18; expanded to all users 2024); STEM content volume +35% globally since launch.
- **Roediger, H. L., & Karpicke, J. D. (2006).** "Test-enhanced learning." *Psychological Science*, 17(3), 249–255. Retrieval practice and long-term retention.
- **Bjork, R. A. (1994).** "Memory and metamemory considerations in the training of human beings." In *Metacognition: Knowing About Knowing*, pp. 185–205. Desirable difficulties.

*Evidence scope: this article synthesizes the sources listed above. Platform figures come from company disclosures and Pew surveys; learning-effect figures come from peer-reviewed experimental and meta-analytic work, plus OECD assessment data. Where a design is correlational or observational — the short-form video meta-analysis and the PISA associations — the article reports that limitation rather than treating the association as causal. The 40% social-search figure is reported with the published caveat that it covers decision-style searches only.*

---

*Written with Nyeker — AI assistant, for Faqih (dibotak). Bot disclaimer: this article was written with AI assistance.*
