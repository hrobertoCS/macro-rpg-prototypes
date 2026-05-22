import json
import os

#character class
class Character: 
    def __init__(self, name, level = 1, xp = 0, stats = None, streak = 0):
        self.name = name
        self.level = level 
        self.xp = xp
        #if stats has no stats, create new stats dict
        #stat categories are temporary and will be updated in v2.0 once a UI is implemented 
        self.stats = stats if stats is not None else {"strength": 0, "endurance": 0, "recovery": 0, "vitality": 0}
        self.streak = streak

    #adds xp
    #takes xp as amount and adds that to self.xp
    #calls check_level_up
    def add_xp(self, amount):
        self.xp += amount

        self.check_level_up()






    

    #checks if character leveled up
    def check_level_up(self):       

        #checks if user has leveled up
        #uses exponential growth formula so each level is 1.5 times as much xp to level up
        while (self.xp >= (500 * (1.5 ** (self.level - 1)))):

                self.level += 1

                


                print("Level Up!!!", "\n", "You are level ",  self.level, "!")


        print("\nYour current XP is: ", self.xp, "\n")
        next_level = (500 * (1.5 ** (self.level - 1))) - self.xp
        print("XP until next level is: ", next_level, "\n")

    
    #saves the character
    def save(self):
         
         character_data = {"Name": self.name, "Level": self.level, "XP": self.xp, "Streak": self.streak, 
                           "Stats": self.stats}

         with open("character_data.json", "w") as f:
              json.dump(character_data, f)

    #loads or creates a character
    @classmethod
    def load(cls):
         if (os.path.exists("character_data.json")):
            with open("character_data.json", "r") as f:
                  data = json.load(f)
            return cls(name = data["Name"], level = data["Level"], xp = data["XP"], 
                        streak = data["Streak"], stats = data["Stats"])
         else:
              name = input("Enter your name: ")
              return cls(name = name)

    #displays character info
    def display(self):
         print(self.name, ": ", "Level: ", self.level, " Current XP: ", self.xp, " Stats: ", self.stats, " Streak: ", self.streak)






        






