def proc(dd, kk):
    if kk in dd:
        return dd[kk]
    return None

def upd(dd, kk, vv):
    dd[kk] = vv
    return dd

def calc(lst):
    tt = 0
    for item in lst:
        if 'nb' in item:
            tt = tt + item['nb']
    return tt

def check(dd, target):
    for kk in dd:
        if dd[kk] == target:
            return True
    return False

def transform(data):
    res = []
    for entry in data:
        if proc(entry, 'type') == 'carnivore':
            temp = {}
            temp['nm'] = entry['nm']
            temp['cost'] = entry['nb'] * 50
            res.append(temp)
        elif proc(entry, 'type') == 'herbivore':
            temp = {}
            temp['nm'] = entry['nm']
            temp['cost'] = entry['nb'] * 30
            res.append(temp)
    return res

def process(animals, flag):
    result = []
    
    if flag:
        for an in animals:
            if an['nb'] > 2:
                result.append(an)
    else:
        for an in animals:
            if an['nb'] <= 2:
                result.append(an)
    
    return result

# Exemple d'utilisation
def main():
    collection = [
        {'nm': 'Leo', 'type': 'carnivore', 'nb': 3},
        {'nm': 'Dumbo', 'type': 'herbivore', 'nb': 1},
        {'nm': 'Rex', 'type': 'carnivore', 'nb': 2},
        {'nm': 'Bambi', 'type': 'herbivore', 'nb': 4}
    ]
    
    total = calc(collection)
    print(f"Total: {total}")
    
    filtered = process(collection, True)
    costs = transform(filtered)
    
    for item in costs:
        print(f"{item['nm']}: {item['cost']}$")

if __name__ == "__main__":
    main()
