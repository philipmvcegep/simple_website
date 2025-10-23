# PROBLÈMES DANS CE CODE:
# 1. Trop d'arguments (6-8 paramètres)
# 2. Flag arguments (True/False) - ambigu
# 3. Arguments utilisés comme OUTPUT
# 4. Ordre illogique

def save(text, filename, uppercase, add_date, compress, backup, log):
    content = text
    if uppercase:
        content = content.upper()
    if add_date:
        from datetime import datetime
        content = f"{datetime.now()}\n{content}"
    if compress:
        content = content.replace('  ', ' ')
    with open(filename, 'w') as f:
        f.write(content)
    if backup:
        with open(filename + '.bak', 'w') as f:
            f.write(content)
    if log:
        print(f"Saved: {filename}")


def send(to, subject, body, cc, priority, attachments):
    print(f"To: {to}")
    print(f"Subject: {subject}")
    if cc:
        print(f"CC: {cc}")
    if priority:
        print("! HIGH PRIORITY")
    print(f"\n{body}\n")
    if attachments:
        print(f"Attachments: {len(attachments)}")


def calc_price(base, tax_rate, discount, shipping, insurance, rush):
    price = base
    if discount > 0:
        price = price - (price * discount / 100)
    tax = price * tax_rate
    price = price + tax
    if shipping:
        price = price + shipping
    if insurance:
        price = price + insurance
    if rush:
        price = price * 1.5
    return round(price, 2)


def process(data, sort, filter_val, limit, reverse):
    result = data.copy() 
    if sort:
        result.sort()
    if filter_val:
        result = [x for x in result if x > filter_val]
    if reverse:
        result = result[::-1]
    if limit:
        result = result[:limit]
    return result


def update_list(lst, item, sort_it, dedup, max_size): 
    lst.append(item)
    if dedup:
        temp = []
        for x in lst:
            if x not in temp:
                temp.append(x)
        lst.clear()
        lst.extend(temp)
    if sort_it:
        lst.sort()
    if max_size and len(lst) > max_size:
        del lst[max_size:]


def format_text(text, trim, lower, remove_spaces, add_prefix, add_suffix):   
    result = text
    if trim:
        result = result.strip()  
    if lower:
        result = result.lower()  
    if remove_spaces:
        result = result.replace(' ', '')  
    if add_prefix:
        result = "PRE_" + result  
    if add_suffix:
        result = result + "_SUF" 
    return result


def create_report(data, title, summary, details, footer):
    report = []
    report.append(f"=== {title} ===\n")
    if summary:
        total = sum(data)
        avg = total / len(data)
        report.append(f"Total: {total}\n")
        report.append(f"Average: {avg}\n\n")
    if details:
        for i, val in enumerate(data):
            report.append(f"{i+1}. {val}\n")
    if footer:
        report.append("\nEnd of report")
    return ''.join(report)


def modify_dict(dict_obj, key, value, overwrite):
    if key in dict_obj and not overwrite:
        return
    dict_obj[key] = value


# Exemple d'utilisation 
if __name__ == "__main__":
    save("Hello", "file.txt", True, False, True, False, True)

    price = calc_price(100, 0.15, 10, 15, 5, True)
    print(price)

    my_list = [3, 1, 4, 1, 5]
    update_list(my_list, 9, True, True, 10)
    print(my_list)