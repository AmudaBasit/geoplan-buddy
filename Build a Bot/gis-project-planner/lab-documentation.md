# AI Lab documentation — GeoPlan Buddy

Status: working draft. Proposed design choices are recorded below. User research, platform setup, live tests, and reflections remain to be completed with actual evidence.

## Project concept

GeoPlan Buddy helps students and beginning GIS users turn a mapping question into a realistic project plan. The first version uses text conversations and an introductory reference guide. It provides planning support rather than running spatial analysis.

## Empathize

Initial assumption to validate: beginning GIS users may know what they want to map but struggle to identify data requirements, dependencies, realistic time estimates, and quality checks.

Ask potential users: What was difficult about starting your last GIS project? Where did you lose time? What would have helped? Record actual responses here: [pending].

## Define

Provisional problem statement: Students and beginning GIS users need a structured way to turn a mapping goal into achievable tasks because unclear scope and missing data can delay their work.

Success criteria: the plan addresses the user's goal, fits available work hours, explains dependencies, identifies unknowns, includes relevant GIS checks, and gives a concrete first step. Validate these criteria with users.

## Ideate

Ideas considered: GIS Project Planner, GIS Data Readiness Assistant, Map Design Coach, and GIS Troubleshooting Buddy.

Selected direction: GIS Project Planner. Rationale: combines GIS and project management, supports a narrow text-based prototype, and allows clear testing without needing a GIS engine or live datasets.

## Prototype: build-plan parameters

1. Objective: produce a realistic GIS project plan.
2. Knowledge: introductory planning guide, user-provided project constraints, and verified sources only when available.
3. Boundaries: no fabricated analysis, data availability, sources, reminders, or completed work.
4. Engagement: friendly, concise, beginner-accessible; at most two focused questions per turn.
5. Data interaction: text only for the first version; images and GIS file processing are outside initial scope.
6. Opening: ask for the spatial question and study area.
7. Steps: clarify goal and constraints, confirm scope, generate plan, invite revision.
8. Conclusion: present the plan, identify unknowns, offer a specific adjustment, and give a first action.
9. Successful engagement: user has an actionable, reviewable plan with explicit assumptions.
10. Rule testing: see test-plan.md; record actual results and retests.

Prepared artifacts: bot-instructions.txt, knowledge-guide.txt, test-plan.md, and this documentation draft. Preparation is not evidence of deployment or successful tests.

## Platform and policy review — pending

- Chosen platform and plan:
- Date checked:
- Privacy policy and terms links:
- What user content is collected and retained:
- Who can access conversations and shared bots:
- Whether content is used for model improvement and available controls:
- Deletion options and relevant account/use restrictions:
- Free-tier usage and availability constraints:
- Reason for platform selection:

Record findings from the actual policies. Do not assume a platform is private or free of restrictions.

## Test and iterate — pending

Record test cases, actual outputs, user feedback, issues, changes, and retest outcomes. Keep a version history: version, change, reason, evidence.

## Earlier AI Lab activities — pending

### LLM practice
Record the model/tool, prompt with context/task/constraints, results from at least three separate chats, comparison criteria, similarities/differences, and reflection.

### Existing custom GPT practice
Record the GPT used and evidence of back-and-forth: request a change, add your own information, ask for improvement, ask why an output was generated, explore a what-if, and request a conversation summary. Add your reflection.

### Research assistant practice
Record your chosen familiar topic, STORM research output and references, observations about the displayed brainstorming process, your own explanation of how the tool appears to work, and reflection. Distinguish observed behavior from assumptions.

## Final submission checklist

- [ ] Document real user insights and refine the problem statement.
- [ ] Review platform privacy policy and terms; record findings.
- [ ] Configure the bot and add its reference guide.
- [ ] Run and record tests; improve and retest.
- [ ] Gather actual user feedback.
- [ ] Complete earlier lab activities and personal reflections.
- [ ] Record the deployed product link: [pending].
- [ ] Test the link as the intended reviewer would access it.
- [ ] Include dated screenshots or conversation evidence.
- [ ] Submit documentation and the product link as instructed by the assignment.
