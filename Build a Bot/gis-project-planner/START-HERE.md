# GeoPlan Buddy — build kit

## Purpose
Build a small GIS project planning assistant. This folder contains prepared content, not a deployed bot or a live product link.

## Configure in your chosen chatbot builder
1. Create a bot named **GeoPlan Buddy**.
2. Description: **Turn a GIS idea into a practical project plan with data needs, tasks, milestones, and quality checks.**
3. Paste bot-instructions.txt into the builder's instructions field.
4. Add knowledge-guide.txt as a text/file knowledge source, if supported. If not, append its content to the instructions within the platform's limits.
5. Use the opening greeting from the instructions.
6. Add starter prompts if supported:
   - Help me plan a park-access mapping project.
   - Turn my GIS assignment into a one-week plan.
   - Help me identify data needs and risks for my GIS project.
7. Review the platform's actual privacy policy, terms, and sharing settings; record findings in lab-documentation.md.
8. Run test-plan.md, save evidence, and revise instructions based on failures.
9. Enable the appropriate sharing option and verify the resulting link as the reviewer would access it.

## First manual test prompt
I am a beginner using QGIS. I need a PDF map about park access in my county within two weeks, and I have 10 total work hours. I have not collected any data yet. Help me define a realistic project.

The bot should clarify the county and meaning of access before finalizing its plan. A polished answer alone is not a passed test; check its assumptions, effort estimates, and limitations.
