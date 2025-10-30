import java.util.*;

public class McDonaldSystem {
    // Tout est static pour simplifier (mauvaise pratique!)
    public static ArrayList<Item> inventory = new ArrayList<>();
    public static Scanner sc = new Scanner(System.in);
    public static int orderNum = 1;
    public static ArrayList<CartItem> cart = new ArrayList<>(); // Le panier global
    
    public static void main(String[] args) {
        inventory.add(new Item("Big Mac", 6.99, 50, "main"));
        inventory.add(new Item("Quarter Pounder", 7.49, 40, "main"));
        inventory.add(new Item("McChicken", 5.99, 45, "main"));
        inventory.add(new Item("Frites", 3.49, 100, "snack"));
        inventory.add(new Item("Nuggets (6)", 4.99, 60, "snack"));
        inventory.add(new Item("Coca-Cola", 2.49, 80, "drink", "Medium"));
        inventory.add(new Item("Sprite", 2.49, 70, "drink", "Medium"));
        inventory.add(new Item("Jus d'orange", 2.99, 50, "drink", "Medium"));
        
        System.out.println("=== MCDONALDS ===");
        
        while (true) {
            System.out.println("\n1. Mode Client");
            System.out.println("2. Mode Inventaire");
            System.out.println("3. Quitter");
            System.out.print("Choix: ");
            
            int c = sc.nextInt();
            
            if (c == 1) {
                clientMode();
            } else if (c == 2) {
                inventoryMode();
            } else if (c == 3) {
                break;
            }
        }
    }
    
    // Méthode énorme avec beaucoup de logique (violation SRP)
    public static void clientMode() {
        System.out.print("Nom: ");
        sc.nextLine();
        String name = sc.nextLine();
        System.out.println("Bienvenue " + name);
        
        // Vider le panier pour ce client
        cart.clear();
        
        boolean loop = true;
        while (loop) {
            System.out.println("\n1. Voir menu");
            System.out.println("2. Ajouter TRIO au panier");
            System.out.println("3. Ajouter item au panier");
            System.out.println("4. Voir panier");
            System.out.println("5. Retirer du panier");
            System.out.println("6. Passer commande");
            System.out.println("7. Retour");
            System.out.print("Choix: ");
            
            int choice = sc.nextInt();
            
            if (choice == 1) {
                // Afficher menu directement ici (code dupliqué)
                System.out.println("\n=== MENU ===");
                for (int i = 0; i < inventory.size(); i++) {
                    Item it = inventory.get(i);
                    System.out.println(it.name + " - " + it.price + "$ (stock: " + it.stock + ")");
                }
            } else if (choice == 2) {
                // Ajouter un trio au panier - tout dans la même méthode!
                System.out.println("\nPlats principaux:");
                ArrayList<Item> mains = new ArrayList<>();
                for (int i = 0; i < inventory.size(); i++) {
                    if (inventory.get(i).type.equals("main")) {
                        mains.add(inventory.get(i));
                    }
                }
                for (int i = 0; i < mains.size(); i++) {
                    System.out.println((i+1) + ". " + mains.get(i).name + " - " + mains.get(i).price + "$");
                }
                System.out.print("Choix: ");
                int m = sc.nextInt() - 1;
                
                System.out.println("\nAccompagnements:");
                ArrayList<Item> snacks = new ArrayList<>();
                for (int i = 0; i < inventory.size(); i++) {
                    if (inventory.get(i).type.equals("snack")) {
                        snacks.add(inventory.get(i));
                    }
                }
                for (int i = 0; i < snacks.size(); i++) {
                    System.out.println((i+1) + ". " + snacks.get(i).name + " - " + snacks.get(i).price + "$");
                }
                System.out.print("Choix: ");
                int s = sc.nextInt() - 1;
                
                System.out.println("\nBoissons:");
                ArrayList<Item> drinks = new ArrayList<>();
                for (int i = 0; i < inventory.size(); i++) {
                    if (inventory.get(i).type.equals("drink")) {
                        drinks.add(inventory.get(i));
                    }
                }
                for (int i = 0; i < drinks.size(); i++) {
                    System.out.println((i+1) + ". " + drinks.get(i).name + " - " + drinks.get(i).price + "$");
                }
                System.out.print("Choix: ");
                int d = sc.nextInt() - 1;
                
                // Vérifier indices
                if (m >= 0 && m < mains.size() && s >= 0 && s < snacks.size() && d >= 0 && d < drinks.size()) {
                    // Vérifier stock AVANT d'ajouter au panier
                    if (mains.get(m).stock > 0 && snacks.get(s).stock > 0 && drinks.get(d).stock > 0) {
                        CartItem trio = new CartItem(mains.get(m), snacks.get(s), drinks.get(d));
                        cart.add(trio);
                        System.out.println("✓ Trio ajouté au panier!");
                    } else {
                        System.out.println("ERREUR: Stock insuffisant pour ce trio!");
                    }
                } else {
                    System.out.println("ERREUR: Choix invalide");
                }
                
            } else if (choice == 3) {
                // Ajouter item individuel au panier
                System.out.println("\n=== MENU ===");
                for (int i = 0; i < inventory.size(); i++) {
                    Item it = inventory.get(i);
                    System.out.println((i+1) + ". " + it.name + " - " + it.price + "$ (stock: " + it.stock + ")");
                }
                System.out.print("Choix: ");
                int itemChoice = sc.nextInt() - 1;
                
                if (itemChoice >= 0 && itemChoice < inventory.size()) {
                    Item selectedItem = inventory.get(itemChoice);
                    // Vérifier stock AVANT d'ajouter au panier
                    if (selectedItem.stock > 0) {
                        CartItem cartItem = new CartItem(selectedItem);
                        cart.add(cartItem);
                        System.out.println("✓ " + selectedItem.name + " ajouté au panier!");
                    } else {
                        System.out.println("ERREUR: Plus de stock pour " + selectedItem.name);
                    }
                } else {
                    System.out.println("ERREUR: Choix invalide");
                }
                
            } else if (choice == 4) {
                // Voir panier
                if (cart.size() == 0) {
                    System.out.println("\nPanier vide!");
                } else {
                    System.out.println("\n=== VOTRE PANIER ===");
                    double total = 0;
                    for (int i = 0; i < cart.size(); i++) {
                        CartItem ci = cart.get(i);
                        System.out.printf("%d. %s - %.2f$\n", (i+1), ci.getDescription(), ci.getPrice());
                        total += ci.getPrice();
                    }
                    System.out.println("--------------------");
                    System.out.printf("TOTAL: %.2f$\n", total);
                }
                
            } else if (choice == 5) {
                // Retirer du panier
                if (cart.size() == 0) {
                    System.out.println("\nPanier vide!");
                } else {
                    System.out.println("\n=== VOTRE PANIER ===");
                    for (int i = 0; i < cart.size(); i++) {
                        CartItem ci = cart.get(i);
                        System.out.printf("%d. %s - %.2f$\n", (i+1), ci.getDescription(), ci.getPrice());
                    }
                    System.out.print("\nNuméro de l'item à retirer (0 pour annuler): ");
                    int removeChoice = sc.nextInt();
                    
                    if (removeChoice > 0 && removeChoice <= cart.size()) {
                        CartItem removed = cart.remove(removeChoice - 1);
                        System.out.println("✓ " + removed.getDescription() + " retiré du panier!");
                    } else if (removeChoice != 0) {
                        System.out.println("ERREUR: Choix invalide");
                    }
                }
                
            } else if (choice == 6) {
                // Passer la commande
                if (cart.size() == 0) {
                    System.out.println("\nPanier vide! Ajoutez des items d'abord.");
                } else {
                    // Vérifier stock pour tous les items
                    boolean stockOk = true;
                    for (int i = 0; i < cart.size(); i++) {
                        CartItem ci = cart.get(i);
                        if (ci.isTrio) {
                            if (ci.item.stock <= 0 || ci.trioSnack.stock <= 0 || ci.trioDrink.stock <= 0) {
                                stockOk = false;
                                System.out.println("ERREUR: Stock insuffisant pour " + ci.getDescription());
                            }
                        } else {
                            if (ci.item.stock <= 0) {
                                stockOk = false;
                                System.out.println("ERREUR: Stock insuffisant pour " + ci.item.name);
                            }
                        }
                    }
                    
                    if (stockOk) {
                        // Retirer du stock
                        for (int i = 0; i < cart.size(); i++) {
                            CartItem ci = cart.get(i);
                            if (ci.isTrio) {
                                ci.item.stock--;
                                ci.trioSnack.stock--;
                                ci.trioDrink.stock--;
                            } else {
                                ci.item.stock--;
                            }
                        }
                        
                        // Afficher reçu
                        System.out.println("\n========= RECU =========");
                        System.out.println("Commande #" + orderNum);
                        orderNum++;
                        double total = 0;
                        for (int i = 0; i < cart.size(); i++) {
                            CartItem ci = cart.get(i);
                            System.out.printf("%s - %.2f$\n", ci.getDescription(), ci.getPrice());
                            total += ci.getPrice();
                        }
                        System.out.println("------------------------");
                        System.out.printf("TOTAL: %.2f$\n", total);
                        System.out.println("========================");
                        
                        // Vider le panier
                        cart.clear();
                        System.out.println("\n✓ Commande passée avec succès!");
                    }
                }
                
            } else if (choice == 6) {
                // Vider le panier en quittant
                cart.clear();
                loop = false;
            }
        }
    }
    
    // Mode inventaire - accès direct à la liste (violation encapsulation)
    public static void inventoryMode() {
        boolean running = true;
        while (running) {
            System.out.println("\n=== INVENTAIRE ===");
            System.out.println("1. Afficher inventaire");
            System.out.println("2. Ajouter stock");
            System.out.println("3. Retirer stock");
            System.out.println("4. Ajouter nouvel item");
            System.out.println("5. Retour");
            System.out.print("Choix: ");
            
            int choice = sc.nextInt();
            
            if (choice == 1) {
                System.out.println("\n--- STOCK ACTUEL ---");
                for (int i = 0; i < inventory.size(); i++) {
                    Item it = inventory.get(i);
                    System.out.println(it.name + ": " + it.stock + " unités (" + it.price + "$)");
                }
            } else if (choice == 2) {
                System.out.print("Nom de l'item: ");
                sc.nextLine();
                String itemName = sc.nextLine();
                
                boolean found = false;
                for (int i = 0; i < inventory.size(); i++) {
                    if (inventory.get(i).name.equals(itemName)) {
                        System.out.print("Quantité à ajouter: ");
                        int qty = sc.nextInt();
                        inventory.get(i).stock += qty;
                        System.out.println("Stock ajouté!");
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    System.out.println("Item non trouvé");
                }
            } else if (choice == 3) {
                System.out.print("Nom de l'item: ");
                sc.nextLine();
                String itemName = sc.nextLine();
                
                boolean found = false;
                for (int i = 0; i < inventory.size(); i++) {
                    if (inventory.get(i).name.equals(itemName)) {
                        System.out.print("Quantité à retirer: ");
                        int qty = sc.nextInt();
                        if (inventory.get(i).stock >= qty) {
                            inventory.get(i).stock -= qty;
                            System.out.println("Stock retiré!");
                        } else {
                            System.out.println("ERREUR: Pas assez de stock!");
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    System.out.println("Item non trouvé");
                }
            } else if (choice == 4) {
                sc.nextLine();
                System.out.print("Nom: ");
                String n = sc.nextLine();
                System.out.print("Prix: ");
                double p = sc.nextDouble();
                System.out.print("Stock initial: ");
                int s = sc.nextInt();
                System.out.print("Type (main/snack/drink): ");
                String t = sc.next();
                
                if (t.equals("drink")) {
                    System.out.print("Taille: ");
                    String sz = sc.next();
                    inventory.add(new Item(n, p, s, t, sz));
                } else {
                    inventory.add(new Item(n, p, s, t));
                }
                System.out.println("Item ajouté!");
            } else if (choice == 5) {
                running = false;
            }
        }
    }
}