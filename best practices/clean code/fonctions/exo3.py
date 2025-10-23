# PROBLÈMES DANS CE CODE:
# 1. Fonctions trop longues (> 20 lignes)
# 2. Noms vagues (proc, handle, calc)
# 3. Chaque fonction fait 3-4 choses différentes
# 4. Mélange de niveaux d'abstraction


def proc(order):
    # Validation
    if not order:
        print("ERROR: No order")
        return None
    if 'items' not in order:
        print("ERROR: No items")
        return None
    
    # Calcul du total
    subtotal = 0
    for item in order['items']:
        price = item['price']
        qty = item['qty']
        discount = item.get('discount', 0)
        item_total = price * qty
        item_total = item_total - (item_total * discount / 100)
        subtotal += item_total
    
    # Taxes
    tax_rate = 0.15
    tax = subtotal * tax_rate
    total = subtotal + tax
    
    # Formater
    result = {
        'subtotal': round(subtotal, 2),
        'tax': round(tax, 2),
        'total': round(total, 2),
        'item_count': len(order['items'])
    }
    
    # Logger
    print(f"Order processed: {result['total']}")
    
    # Sauvegarder dans fichier
    with open('orders.txt', 'a') as f:
        f.write(f"Total: ${result['total']}\n")
    
    # Email
    print(f"Email sent to: {order.get('email', 'unknown')}")
    
    return result


def handle(user):
    # Validation nom
    if not user.get('name') or len(user['name']) < 2:
        print("Name too short")
        return False
    
    # Validation email
    email = user.get('email', '')
    if '@' not in email:
        print("Invalid email")
        return False
    
    parts = email.split('@')
    if '.' not in parts[1]:
        print("Bad email domain")
        return False
    
    # Validation age
    age = user.get('age', 0)
    if age < 18:
        print("Too young")
        return False
    
    # Créer username
    username = user['name'].lower().replace(' ', '_')
    
    # Créer dossier
    import os
    folder = f"./users/{username}"
    os.makedirs(folder, exist_ok=True)
    
    # Sauvegarder info
    with open(f"{folder}/info.txt", 'w') as f:
        f.write(f"Name: {user['name']}\n")
        f.write(f"Email: {email}\n")
        f.write(f"Age: {age}\n")
    
    # Logger
    print(f"User created: {username}")
    
    return True


def calc(numbers, mode):
    # Nettoyage
    clean = []
    for num in numbers:
        if num is not None:
            clean.append(num)
    
    if not clean:
        print("No valid numbers")
        return 0
    
    # Calcul
    if mode == 1:
        result = sum(clean)
    elif mode == 2:
        result = sum(clean) / len(clean)
    elif mode == 3:
        result = max(clean)
    elif mode == 4:
        result = min(clean)
    else:
        result = 0
    
    # Arrondir
    result = round(result, 2)
    
    # Logger
    print(f"Calculation done: {result}")
    
    # Sauvegarder
    with open('results.txt', 'a') as f:
        f.write(f"Result: {result}\n")
    
    return result


# Exemple d'utilisation
if __name__ == "__main__":
    order = {
        'items': [
            {'price': 50, 'qty': 2, 'discount': 10},
            {'price': 30, 'qty': 1}
        ],
        'email': 'client@mail.com'
    }
    
    proc(order)
    
    user = {'name': 'Bob Smith', 'email': 'bob@mail.com', 'age': 25}
    handle(user)
    
    calc([10, 20, 30, None, 40], 2)