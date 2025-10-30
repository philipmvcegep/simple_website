public class CartItem {
    public Item item;
    public boolean isTrio;
    public Item trioSnack;  // Si c'est un trio
    public Item trioDrink;  // Si c'est un trio
    
    // Pour un item simple
    public CartItem(Item i) {
        item = i;
        isTrio = false;
    }
    
    // Pour un trio
    public CartItem(Item main, Item snack, Item drink) {
        item = main;
        trioSnack = snack;
        trioDrink = drink;
        isTrio = true;
    }
    
    // Calculer le prix
    public double getPrice() {
        if (isTrio) {
            double total = item.price + trioSnack.price + trioDrink.price;
            return Math.round(total * 0.85 * 100.0) / 100.0; // 15% rabais, arrondi à 2 décimales
        } else {
            return Math.round(item.price * 100.0) / 100.0;
        }
    }
    
    public String getDescription() {
        if (isTrio) {
            return "TRIO: " + item.name + " + " + trioSnack.name + " + " + trioDrink.name + " (15% rabais)";
        } else {
            return item.name;
        }
    }
}


