public class Item {
    public String name;
    public double price;
    public int stock;
    public String type; // "main", "snack", "drink"
    public String size; // pour drinks seulement
    
    public Item(String n, double p, int s, String t) {
        name = n;
        price = p;
        stock = s;
        type = t;
    }
    
    public Item(String n, double p, int s, String t, String sz) {
        name = n;
        price = p;
        stock = s;
        type = t;
        size = sz;
    }
}