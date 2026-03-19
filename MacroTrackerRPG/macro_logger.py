#Target macros for the week
targets = {"Calories": 3000, "Protein": 200, "Carbs": 150, "Fat": 60}

#List that stores each meal
meals = []



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

    print("Your total calories are: ", total["Calories"], " / ", targets["Calories"], ". Protein: ", total["Protein"], "g", " / ", targets["Protein"], 
          "g. Carbs: ", total["Carbs"], "g", " / ", targets["Carbs"], "g. Fat: ", total["Fat"], "g", " / ", targets["Fat"], "g.")
   
    

    #check to continue loop
    add_meal = input("Add another meal? Y for yes and N for no:")

    #remove case sensitivity
    add_meal = add_meal.lower()

    #check to continue loop
    if (add_meal == "n"):

        break



