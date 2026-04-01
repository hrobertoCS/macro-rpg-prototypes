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
    def add_xp(self, amount, lvl, last_lvl_xp, lvl_two_xp = 500):
        self.amount = amount
        self.lvl = lvl
        self.last_lvl = last_lvl_xp
        self.lvl_two_xp = lvl_two_xp

        self.xp += self.amount

        self.check_level_up(self.amount, self.lvl)







    

    #checks if character leveled up
    def check_level_up(self, amount, lvl, last_lvl, new_lvl = 0):
        self.amount = amount
        self.lvl = lvl
        self.last_lvl = last_lvl
        self.new_lvl = new_lvl

        self.new_lvl = last_lvl * 1.5

        if (self.amount > self.new_lvl):
            self.lvl += 1

            print("Level Up!!!!")

        




        






