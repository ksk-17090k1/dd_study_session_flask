class Hero:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"名前：{self.name} 年齢：{self.age}"


class Item:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __str__(self):
        return f"商品ID：{self.id} 商品名：{self.name}"
