# OPEVA Documentation Website – Master Prompt (English)

Use the following prompt with AI coding/design agents:

---

You are a senior product designer + full-stack documentation engineer.

I have an existing Docusaurus website focused mainly on **routing** and **fleet management** for the OPEVA project.  
I want to transform it into a **complete project documentation portal** that covers all OPEVA workstreams.

## Objective
Build a modern, well-structured documentation website that answers:  
**“What did we build in OPEVA across the whole project?”**

The current routing and fleet-management docs must remain, but become only part of a larger information architecture.

## Scope to Include
Create sections/pages for:
- Project overview and vision
- Tools (internal tools, utilities, dashboards)
- Scripts and automations
- Repositories and codebases (with purpose, status, ownership)
- Key files/documents (specs, architecture docs, standards)
- Videos (demos, walkthroughs, presentations)
- Articles / papers / references
- Optional blog posts / updates / changelog
- Existing sections: routing + fleet management (preserve and integrate)

## Requirements
0. **Technology Constraint (Important)**  
   - Keep and evolve the existing **Docusaurus** stack.  
   - Do **not** propose migrating to another framework unless explicitly requested.  
   - Focus on improving IA, content model, theme/customization, and page structure within Docusaurus.

1. **Modern UI/UX**  
   - Replace the current generic look with a cleaner and more modern visual identity.  
   - Improve typography, spacing, cards, section hierarchy, and homepage storytelling.  
   - Add clear CTAs and quick navigation to major categories.

2. **Information Architecture**  
   - Propose a new sitemap and sidebar structure.  
   - Group content by domain (e.g., Platform, AI/ML, Routing, Fleet Ops, Integrations, Research, Media).  
   - Keep navigation simple for both technical and non-technical **users**.

3. **Content System**  
   - Define reusable templates for pages such as:
     - Tool page
     - Repository page
     - Script page
     - Video entry
     - Reference/article entry
   - Use consistent metadata (owner, links, status, tags, last updated).

4. **Implementation Plan**  
   - Provide a phased roadmap:
     - Phase 1: IA + design system
     - Phase 2: core pages + migration of existing docs
     - Phase 3: media/blog/reference expansion
     - Phase 4: quality, search, and governance
   - Include milestones, dependencies, and definition of done per phase.

5. **Deliverables**  
   - Updated folder/page structure
   - Navigation redesign
   - Homepage redesign proposal
   - Example content for each major page type
   - Migration checklist from current routing/fleet docs
   - Contributor workflow (how team adds new tools/repos/videos)

6. **Quality Bar**
   - Keep content scannable and professional.
   - Avoid vague placeholders; provide concrete example entries.
   - Ensure multilingual-readiness and future extensibility.

## Output Format
Return:
1. Proposed sitemap  
2. New sidebar/navigation structure  
3. Visual/UI improvement strategy  
4. Concrete page templates (with example fields)  
5. Step-by-step implementation roadmap  
6. First set of example pages/content  
7. Migration plan for existing routing/fleet documentation

If helpful, split the work into specialized agents (IA agent, UI agent, content agent, migration agent), then provide a final merged plan.

---
