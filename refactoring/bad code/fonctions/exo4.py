# PROBLÈMES DANS CE CODE:
# 1. Code dupliqué partout - même logique copiée-collée
# 2. Validation répétée dans chaque fonction
# 3. Calculs identiques répétés
# 4. Formatage dupliqué


def process_book_order(title, price, quantity):
    if price < 0:
        print("Price cannot be negative")
        return None
    if price > 10000:
        print("Price too high")
        return None

    if quantity < 1:
        print("Quantity must be at least 1")
        return None
    if quantity > 100:
        print("Quantity too large")
        return None
    
    subtotal = price * quantity
    tax = subtotal * 0.15
    total = subtotal + tax
    result = f"""
    Item: {title}
    Subtotal: ${subtotal:.2f}
    Tax: ${tax:.2f}
    Total: ${total:.2f}
    """
    
    return result


def process_dvd_order(title, price, quantity):
    if price < 0:
        print("Price cannot be negative")
        return None
    if price > 10000:
        print("Price too high")
        return None
    
    if quantity < 1:
        print("Quantity must be at least 1")
        return None
    if quantity > 100:
        print("Quantity too large")
        return None
    
    subtotal = price * quantity
    tax = subtotal * 0.15
    total = subtotal + tax
    
    result = f"""
    Item: {title}
    Subtotal: ${subtotal:.2f}
    Tax: ${tax:.2f}
    Total: ${total:.2f}
    """

    return result


def process_game_order(title, price, quantity):
    if price < 0:
        print("Price cannot be negative")
        return None
    if price > 10000:
        print("Price too high")
        return None
    
    if quantity < 1:
        print("Quantity must be at least 1")
        return None
    if quantity > 100:
        print("Quantity too large")
        return None
    
    subtotal = price * quantity
    tax = subtotal * 0.15
    total = subtotal + tax
    
    result = f"""
    Item: {title}
    Subtotal: ${subtotal:.2f}
    Tax: ${tax:.2f}
    Total: ${total:.2f}
    """
    
    return result


def calculate_book_discount(price):
    if price <= 0:
        print("Invalid price")
        return 0
    
    if price < 20:
        discount = 0
    elif price < 50:
        discount = price * 0.05
    elif price < 100:
        discount = price * 0.10
    else:
        discount = price * 0.15
    
    return discount


def calculate_dvd_discount(price):
    if price <= 0:
        print("Invalid price")
        return 0
    
    if price < 20:
        discount = 0
    elif price < 50:
        discount = price * 0.05
    elif price < 100:
        discount = price * 0.10
    else:
        discount = price * 0.15
    
    return discount


def calculate_game_discount(price):
    if price <= 0:
        print("Invalid price")
        return 0
    
    if price < 20:
        discount = 0
    elif price < 50:
        discount = price * 0.05
    elif price < 100:
        discount = price * 0.10
    else:
        discount = price * 0.15
    
    return discount


def format_customer_name(first, last):
    first = first.strip()
    last = last.strip()
    
    first = first.capitalize()
    last = last.capitalize()
    
    return f"{first} {last}"


def format_employee_name(first, last):
    first = first.strip()
    last = last.strip()
    
    first = first.capitalize()
    last = last.capitalize()
    
    return f"{first} {last}"


def format_author_name(first, last):
    first = first.strip()
    last = last.strip()
    
    first = first.capitalize()
    last = last.capitalize()
    
    return f"{first} {last}"


# Exemple d'utilisation 
if __name__ == "__main__":
    book_result = process_book_order("Python Guide", 45, 2)
    print(book_result)
    
    dvd_result = process_dvd_order("Movie Title", 25, 1)
    print(dvd_result)
    
    game_result = process_game_order("Game Name", 60, 1)
    print(game_result)
    
    book_discount = calculate_book_discount(45)
    dvd_discount = calculate_dvd_discount(25)
    game_discount = calculate_game_discount(60)
    
    customer = format_customer_name("  john ", " DOE  ")
    employee = format_employee_name("  jane ", " SMITH  ")
    author = format_author_name("  bob ", " MARTIN  ")