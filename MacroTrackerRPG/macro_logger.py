import json
import os

from character import Character

#Target macros for the week
targets = {"Calories": 3000, "Protein": 200, "Carbs": 150, "Fat": 60}

#variable for file path 
file_path = "macro_data.txt"

#check to see if path exists
if (os.path.exists(file_path)):

    #opens file to read as f
    #loads f into meals
    with open(file_path, "r") as f:
        meals = json.load(f)
else:
    #List that stores each meal
    meals = []
    #creates the file (same as writing to a file)
    #converts list to JSON text then writes meals
    with open(file_path, "w") as f:
        json.dump(meals, f)
    



#load character
character = Character.load()

#Main loop
while True:
    
    name = input("Meal name: ")
    calories = int(input("Calories: "))
    protein = int(input("Protein: "))
    carbs = int(input("Carbs: "))
    fat = int(input("Fat: "))


    #store meal in dictonary
    meal = {"Name": name, "Calories": calories, "Protein": protein, "Carbs": carbs, "Fat": fat}

    #add meal to list
    meals.append(meal)

    #writes meals to file
    with open(file_path, "w") as f:
        json.dump(meals, f)

    #store the totals for each macro
    total_protein = 0
    total_calories = 0
    total_carbs = 0
    total_fat = 0

    #will store total macros
    total = {}

    #iterate over each meal to add macro totals
    for meal in meals:
        
        total_calories += meal["Calories"]

        total_protein += meal["Protein"]

        total_carbs += meal["Carbs"]

        total_fat += meal["Fat"]


    #add macro totals to total
    total = {"Calories": total_calories, "Protein": total_protein, "Carbs": total_carbs, "Fat": total_fat}

    print("Your total calories are: ", total["Calories"], " / ", targets["Calories"], 
          ". Protein: ", total["Protein"], "g", " / ", targets["Protein"], 
          "g. Carbs: ", total["Carbs"], "g", " / ", targets["Carbs"], 
          "g. Fat: ", total["Fat"], "g", " / ", targets["Fat"], "g.")
   
    

    #check to continue loop
    add_meal = input("Enter Y to add another meal," \
    " F to finish for the day, or Q to quit: ")

    #remove case sensitivity
    add_meal = add_meal.lower()

    #check to continue loop, finish for the day, or quit
    #quit********************
    if (add_meal == "q"):

        break
    #finish for the day*************************************************************************************************************
    elif (add_meal == "f"):

        #print macros for the day
        print("\nFinishing for the day.\n")
        print("Daily Totals: ")
        print("Calories: ", total["Calories"], " / ", targets["Calories"], 
          ". Protein: ", total["Protein"], "g", " / ", targets["Protein"], 
          "g. Carbs: ", total["Carbs"], "g", " / ", targets["Carbs"], 
          "g. Fat: ", total["Fat"], "g", " / ", targets["Fat"], "g.")
        
    
        #calculate calories ratio
        if (total_calories > targets["Calories"]):
            #if total calories is over 15% greater than target calories, ratio = 0
            if (total_calories > (targets["Calories"] * 1.15)):
                calories_ratio = 0
            #total is greater than target, ratio is flipped to target / total
            else:
                calories_ratio = (targets["Calories"] / total_calories) * 100
        #if total calories are under 0.75 of target calories then ratio =0        
        elif (total_calories < ((targets["Calories"]) * 0.75 )):
            calories_ratio = 0
        #ratio is total / target
        else:
            calories_ratio = (total_calories / targets["Calories"]) 

            #set XP range from 1 to 100 starting at 75%
            calories_ratio = ((calories_ratio - 0.75) / 0.25) * 100

        #calculate carbs ratio
        if (total_carbs > targets["Carbs"]):
            #if total carbs are 25% greater than target, ratio = 0
            if (total_carbs > (targets["Carbs"] * 1.30)):
                carbs_ratio = 0
            #total is greater than target, ratio is flipped to target / total
            else:
                carbs_ratio = (targets["Carbs"] / total_carbs) * 100
        #if total carbs are under 50% of target carbs then ratio = 0
        elif (total_carbs < (targets["Carbs"] * 0.50)):
            carbs_ratio = 0
        #ratio is total / target
        else:
            carbs_ratio = (total_carbs / targets["Carbs"]) 

            #set xp range from 1 to 100 starting at 50%
            carbs_ratio = ((carbs_ratio - 0.50) / 0.50) * 100

        #calculate fat ratio
        if (total_fat > targets["Fat"]):
            #if total fat is 25% greater than target, ratio = 0 
            if (total_fat > (targets["Fat"] * 1.25)):
                fat_ratio = 0
            #total is greater than target, ratio is flipped to target / total
            else:
                fat_ratio = (targets["Fat"] / total_fat) * 100
        #if total fat is under 40% of target then ratio = 0
        elif (total_fat < (targets["Fat"] * 0.40)):
            fat_ratio = 0
        #ratio is total / target
        else:
            fat_ratio = (total_fat / targets["Fat"]) 
            #set xp range from 1 to 100 starting at 40%
            fat_ratio = ((fat_ratio - 0.40) / 0.60) * 100

        #calculate protein xp
        if (total_protein < targets["Protein"]):
            #if total protein is less than target, ratio = 0
            if (total_protein < (targets["Protein"] * 0.70) ):
                protein_ratio = 0
            #ratio is total / target
            else:
                protein_ratio = (total_protein / targets["Protein"])

                #set xp range from 1 to 100 starting at 70%
                protein_ratio = ((protein_ratio - 0.70) / 0.30) *100
        #ratio is total / target
        else:
            protein_ratio = (total_protein / targets["Protein"]) 

            #set xp range from 1 to 100 starting at 70%
            protein_ratio = ((protein_ratio - 0.70) / 0.30) * 100
        


        #calculate XP*************************************************************************************


        #if both calories and protein are under minimum, xp = 0
        if ((total_calories < targets["Calories"] * 0.75) and (total_protein < targets["Protein"] * 0.70)  ):
            xp = 0
        else:
            #weight each macro_ratio to adjust for the importance of each in reaching fitness goals
            xp = ( (calories_ratio * 0.40) + (protein_ratio * 0.35) + (carbs_ratio * 0.15) + (fat_ratio * 0.10) ) 
        
        #variable to track how many macros are under threshold
        under_count = 0

        #count macros under threshold
        if (calories_ratio == 0):
            under_count += 1
        if (protein_ratio == 0):
            under_count += 1
        if (carbs_ratio == 0):
            under_count += 1
        if (fat_ratio == 0):
            under_count += 1

        #if under_count is 3 or more, xp = 0
        if (under_count >= 3):
            xp = 0

        #***************************************************************************************************    
        print("\nYour total XP earned for the day is: ", xp)
        #add xp to character, display character info, save character
        character.add_xp(round(xp))
        character.display()
        character.save()
        
        #clear file to prepare for next day
        with open(file_path, "w") as f:
            json.dump([], f)

            break
    #******************************************************************************************************************************************
    #continue program ****************************************
    elif (add_meal == "y"):
        continue
        


