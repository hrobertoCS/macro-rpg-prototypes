#Target macros for the week
targets = {"calories": 3000, "protein": 200, "carbs": 150, "fat": 60}

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

    print(meals)

    

    total = 0

    for meal in meals:
        
        total += meal["Protein"]


    print("Your total protein intake was: ", total, " g")
   
    

    #check to continue loop
    add_meal = input("Add another meal? Y for yes and N for no:")
    if (add_meal == "N"):

        break



