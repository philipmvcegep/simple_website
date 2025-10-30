def calculate_total(animalList):
    total = 0
    for item in animalList:
        if 'number_of_items' in item:
            total = total + item['number_of_items']
    return total


def typeFactor(animal):
    match animal.get('type'):
        case 'carnivore':
            return 50
        case 'herbivore':
            return 30
        case _:
            return 0 

def buildAnimalEntries(data):
    return [
        {
            'name': entry['name'], 
            'number_of_items': entry['number_of_items'],
            'cost': entry['number_of_items'] * typeFactor(entry)
        }
        for entry in data
    ]
    

def filterAnimals(animalList, overTwo):
    if overTwo:
        return [animal for animal in animalList if animal['number_of_items'] > 2]
    else:
        return [animal for animal in animalList if animal['number_of_items'] <= 2]

# Exemple d'utilisation
def main():
    animalList = [
        {'name': 'Leo', 'type': 'carnivore', 'number_of_items': 3},
        {'name': 'Dumbo', 'type': 'herbivore', 'number_of_items': 1},
        {'name': 'Rex', 'type': 'carnivore', 'number_of_items': 2},
        {'name': 'Bambi', 'type': 'herbivore', 'number_of_items': 4}
    ]
    
    total = calculate_total(animalList)
    print(f"Total: {total}")

    animalEntry = filterAnimals(animalList = animalList, overTwo = True)
    costForAnimal = buildAnimalEntries(animalEntry)
    
    for item in costForAnimal:
        print(f"{item['name']}: {item['cost']}$")

if __name__ == "__main__":
    main()