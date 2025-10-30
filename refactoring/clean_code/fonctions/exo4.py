def process_order(name, price, quantity):
    if price < 0:
        raise ValueError("Price cannot be negative") # Lève une exception
    if price > 10000:
        raise ValueError("Price too high (max 10000)")

    if quantity < 1:
        raise ValueError("Quantity must be at least 1")
    if quantity > 100:
        raise ValueError("Quantity too large (max 100)")

    subtotal = price * quantity
    tax = subtotal * 0.15
    total = subtotal + tax
    
    return {
        "subtotal": subtotal,
        "tax": tax,
        "total": total,
        "name": name
    }


def get_discount_rate(price):
    if price < 20:
        return 0.00
    if price < 50:
        return 0.05
    if price < 100:
        return 0.10
    return 0.15


def calculate_discount(price):
    if price <= 0:
        raise ValueError("Invalid price: Price must be positive.") 

    # Happy Path
    rate = get_discount_rate(price)
    discount = price * rate
    final_price = price - discount
    
    return final_price


def format_name(first, last):
    first = first.strip()
    last = last.strip()
    
    first = first.capitalize()
    last = last.capitalize()
    
    return f"{first} {last}"


def run_order_processing():
    print("\n Traitement des Commandes:")
    try:
        # 1. Récupérer le dictionnaire des détails
        book_details = process_order("Python Guide", 45, 2)
        
        # 2. Extraire le total numérique (qui est un float) et le formater
        book_total = book_details["total"]
        print(f"Livre (45$ x 2) -> Total: ${book_total:.2f}")
        
        # Répéter pour le DVD
        dvd_details = process_order("Movie Title", 25, 1)
        dvd_total = dvd_details["total"]
        print(f"DVD (25$ x 1) -> Total: ${dvd_total:.2f}")
        
        # Commande Invalide (pour tester le try/except)
        game_details = process_order("Game Name", 60, 1) 
        game_total = game_details["total"]
        print(f"Jeu (60$ x 1) -> Total: ${game_total:.2f}") 
        
    except ValueError as e:
        print(f"ERREUR lors du Traitement des Commandes: {e}")
    except Exception as e:
        print(f"ERREUR SYSTÈME INCONNUE (Commandes): {e}")

def run_discount_calculations():
    print("\n Calculs d'Escompte:")
    try:
        book_discount = calculate_discount(45)
        print(f"Escompte Livre (45$): {book_discount:.2f}%")
        
        dvd_discount = calculate_discount(25)
        print(f"Escompte DVD (25$): {dvd_discount:.2f}%")
        
        # Simule un prix invalide
        game_discount = calculate_discount(1000000) 
        print(f"Escompte Jeu (1000000$): {game_discount:.2f}%")
        
    except ValueError as e:
        print(f"ERREUR lors du Calcul des Escomptes: {e}")
    except Exception as e:
        print(f"ERREUR SYSTÈME INCONNUE (Escomptes): {e}")


def run_name_formatting():
    print("\n Formatage des Noms:")
    try:
        customer = format_name("  john ", " DOE  ")
        print(f"Client: {customer}")

        employee = format_name("  jane ", " SMITH  ")
        print(f"Employé: {employee}")

        # Simule un nom vide qui lève une erreur
        author = format_name("", " MARTIN  ") 
        print(f"Auteur: {author}") # Ne sera pas atteint si 'raise' est utilisé dans format_name

    except ValueError as e:
        print(f"ERREUR lors du Formatage des Noms: {e}")
    except Exception as e:
        print(f"ERREUR SYSTÈME INCONNUE (Noms): {e}")



if __name__ == "__main__":
    print("\n--- Démarrage de l'Application Clean Code ---")
    
    run_order_processing()
    run_discount_calculations()
    run_name_formatting()
    
    print("\n--- Fin de l'Exécution ---")