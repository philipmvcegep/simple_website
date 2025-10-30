from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict, Any, Optional

@dataclass
class SaveConfig:
    uppercase: bool = False
    add_date: bool = False
    compress: bool = False
    backup: bool = False
    log: bool = False

@dataclass
class PricingPolicy:
    tax_rate: float
    discount: float = 0.0
    shipping: float = 0.0
    insurance: float = 0.0
    # Remplace l'ancien booléen 'rush'
    rush_multiplier: float = 1.0 
    
@dataclass
class ListUpdateOptions:
    item: Any
    sort_it: bool = False
    dedup: bool = False
    max_size: Optional[int] = None
    
@dataclass
class DataProcessConfig:
    sort: bool = False
    filter_val: Optional[Any] = None
    limit: Optional[int] = None
    reverse: bool = False


def prepare_content(text: str, config: SaveConfig) -> str:
    content = text
    if config.uppercase:
        content = content.upper()
    if config.add_date:
        content = f"{datetime.now().isoformat()}\n{content}"
    if config.compress:
        content = content.replace('  ', ' ')
    return content


def save(text: str, filename: str, config: SaveConfig):
    content = prepare_content(text, config) 
    
    with open(filename, 'w') as f:
        f.write(content)
        
    if config.backup:
        with open(filename + '.bak', 'w') as f:
            f.write(content)

    if config.log:
        print(f"Saved: {filename}") 


def calc_price(base: float, policy: PricingPolicy) -> float:
    price = base
    
    if policy.discount > 0:
        price *= (1 - policy.discount / 100)
        
    price += (price * policy.tax_rate)
    price += policy.shipping
    price += policy.insurance
    price *= policy.rush_multiplier

    return round(price, 2)


def update_list(lst: List[Any], options: ListUpdateOptions):
    new_list = lst + [options.item] 
    
    if options.dedup:
        seen = set()
        new_list = [x for x in new_list if not (x in seen or seen.add(x))]
        
    if options.sort_it:
        new_list.sort()
        
    if options.max_size and len(new_list) > options.max_size:
        new_list = new_list[:options.max_size]
        
    lst.clear() 
    lst.extend(new_list)


def send(email: Dict[str, Any]): 
    print(f"To: {email.get('to')}")
    print(f"Subject: {email.get('subject')}")

    if email.get('cc'):
        print(f"CC: {email['cc']}")

    if email.get('priority'):
        print("! HIGH PRIORITY")

    print(f"\n{email.get('body')}\n")
    if email.get('attachments'):
        print(f"Attachments: {len(email['attachments'])}")

def calc_discount(price, rate): 
    return price * (1 - rate)
    
def get_discount_rate(price):
    if price < 20: return 0.00
    if price < 50: return 0.05
    if price < 100: return 0.10
    return 0.15


# =========== #
# BLOC MAIN : #
# =========== #

if __name__ == "__main__":
    # 1. SAUVEGARDE
    save_config = SaveConfig(uppercase=True, compress=True, log=True)
    save("Hello", "file.txt", save_config)

    # 2. CALCUL DU PRIX
    price_policy = PricingPolicy(
        tax_rate=0.15, 
        discount=10, 
        shipping=15, 
        insurance=5, 
        rush_multiplier=1.5 
    )
    price = calc_price(100, price_policy)
    print(price) 

    # 3. MISE À JOUR DE LISTE
    my_list = [3, 1, 4, 1, 5]
    list_options = ListUpdateOptions(
        item=9, 
        sort_it=True, 
        dedup=True, 
        max_size=10
    )
    update_list(my_list, list_options)
    print(my_list) 

    print("---------------------------------------")