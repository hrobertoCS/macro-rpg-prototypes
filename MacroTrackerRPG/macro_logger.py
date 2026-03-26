import json
import os

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
    #calculate the XP for the day 
    if (add_meal == "q"):

        break
    elif (add_meal == "f"):

        print("Finishing for the day.")
        print("Daily Totals: ")
        print("Calories: ", total["Calories"], " / ", targets["Calories"], 
          ". Protein: ", total["Protein"], "g", " / ", targets["Protein"], 
          "g. Carbs: ", total["Carbs"], "g", " / ", targets["Carbs"], 
          "g. Fat: ", total["Fat"], "g", " / ", targets["Fat"], "g.")
        
        #calculate XP
        xp = (((total_calories / targets["Calories"]) * 100 ) + 
              ((total_protein / targets["Protein"]) * 100) + 
              ((total_carbs / targets["Carbs"]) * 100) + 
              ((total_fat / targets["Fat"]) * 100)) / 4
        
        print("Your total XP earned for the day is: ", xp)
        
        with open(file_path, "w") as f:
            json.dump([], f)

            break

    elif (add_meal == "y"):
        continue
        


