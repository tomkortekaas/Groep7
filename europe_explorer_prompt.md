# Context
You are an expert React/TypeScript developer specialized in building educational, gamified UI's for children. We are adding a new module to an existing English learning app for a smart 10-year-old boy.

# Task
Create a new component called `EuropeExplorer` (or `GeographyModule`). This component must teach and test the geography of Europe based on specific data points (Rivers, Capitals, Mountains).

# Design Requirements
1. **Visual Style:** Adventure/Explorer theme. It should look like a "Mission Control" or a vibrant map interface. Use Tailwind CSS for styling and Framer Motion for animations.
2. **Target Audience:** A 10-year-old boy. It needs to be visual, responsive, and not "babyish".
3. **Modes:**
    - **Mode 1: Reconnaissance (Learning):** The user can hover over or click items on the map to see their English names and hear pronunciation (placeholder).
    - **Mode 2: Mission (Testing):** The app asks "Find the Volga River" or "Where is the capital of Sweden?". The user must click the correct location.
4. **Feedback:** Immediate visual feedback (Green/Confetti for correct, Shake/Red for incorrect). A score/progress bar is required.

# Data to Include
Please hardcode this data structure. The map labels are Dutch, but the app is English, so use the English translations:

## Capitals
- Amsterdam (Netherlands)
- Brussels (Belgium)
- Luxembourg (Luxembourg)
- London (United Kingdom)
- Paris (France)
- Bern (Switzerland)
- Madrid (Spain)
- Rome (Italy)
- Vienna (Austria)
- Berlin (Germany)
- Warsaw (Poland)
- Oslo (Norway)
- Stockholm (Sweden)
- Moscow (Russia)

## Rivers
- Rhine (Rijn)
- Scheldt (Schelde)
- Thames (Theems)
- Seine
- Rhône
- Danube (Donau)
- Volga

## Mountains
- Alps (Alpen)
- Pyrenees (Pyreneeën)
- Caucasus (Kaukasus)
- Ural (Oeral)

# Technical Implementation
- Create a **stylized interactive map** using a relative coordinate system (percentages of top/left) on a container.
- Use a placeholder image URL for the map of Europe.
- Arrange the click targets (`buttons` or `divs` with absolute positioning) roughly where they belong geographically using a `const` array for locations so coordinates can be fine-tuned later.

# Output
Provide the full React component code (TypeScript), including the data array and the game logic state (current question, score, mode switching).
