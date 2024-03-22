from config import db

class Order(db.Model):
    __tablename__ = 'orders'
    orderid = db.Column(db.String, primary_key=True)
    userid = db.Column(db.String, nullable=False)
    productid = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer)
    orderdate = db.Column(db.DateTime)
    price = db.Column(db.Float)
    discount = db.Column(db.Float)
    status = db.Column(db.String(50))
    
    def __init__(self,orderID, userID, productID, quantity, orderDate, price, discount, status):
        self.orderid = orderID
        self.userid = userID
        self.productid = productID
        self.quantity = quantity
        self.orderdate = orderDate
        self.price = price
        self.discount = discount
        self.status = status
