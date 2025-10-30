from datetime import datetime

class P:
    def __init__(self, n, p, q):
        self.n = n
        self.p = p
        self.q = q
        self.dt = datetime.now()

class Mgr:
    def __init__(self):
        self.data = []
        self.cnt = 0
    
    def add(self, n, p, q):
        if not n or p <= 0:
            return False
        prod = P(n, p, q)
        prod.x = self.cnt
        self.cnt += 1
        self.data.append(prod)
        return True
    
    def fetch(self, x):
        for thing in self.data:
            if thing.x == x:
                return thing
        return None
    
    def modify(self, x, n=None, p=None, q=None):
        item = self.fetch(x)
        if item:
            if n: item.n = n
            if p: item.p = p
            if q is not None: item.q = q
            return True
        return False
    
    def calc(self):
        sum = 0
        for x in self.data:
            sum += x.p * x.q
        return sum
    
    def lowstock(self):
        result = []
        for item in self.data:
            if item.q < 10:
                result.append(item)
        return result

# Exemple d'utilisation
if __name__ == "__main__":
    m = Mgr()
    m.add("Laptop", 999.99, 5)
    m.add("Mouse", 25.50, 3)
    print("Total:", m.calc())
    print("Low stock:", len(m.lowstock()))