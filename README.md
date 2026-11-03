<h1 align="center">MacroRPG</h1>

<h3 align="center">Macro tracking app that pairs daily macro tracking with RPG character progression.</h3> 

Built using TypeScript, React Native, Expo, and SQLite. It allows users to set their macro targets and input their daily macros to earn XP based on how well they hit their targets.  

<h3 align="center">Demo</h3>
<div align = "center">
  <video 
  src ="https://github.com/user-attachments/assets/8e4ff807-478f-4b4c-bdc8-9e87150b5f6b"
  width= "360"
  controls>
  
  </video>
</div>

 

<h3>Features</h3>

- Character Creation - Name your character and set your initial macro targets
- Meal Logging - Log meals throughout the day to make progress towards your target macros
- Progress Tracking - Track how close you are towards hitting each macro category/target
- Finish Day/XP Calculation - End the log for the day and calculate XP based on how well you hit each macro target
- Level Ups - Fill your XP bar by hitting your daily targets and getting XP. Once you fill the XP bar and reach the next XP threshold, you level up
- Persistence/Local Data Storage - Save characters, targets, and logged progress in a local SQLite database and restore data when closing and opening the app

<h3>Status</h3>

- MacroRPG is actively in development
- Currently supports tracking macros, gaining XP and leveling up, data persistence
- The skill tree functionality is not yet implemented and only supports viewing, dragging, and zooming
- Upcoming features include:
    - Unlocking skills
    - Character model
    - Settings page
