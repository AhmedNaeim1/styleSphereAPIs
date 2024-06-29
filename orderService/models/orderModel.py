from config import db
from sqlalchemy.dialects.postgresql import ARRAY

class Order(db.Model):
    __tablename__ = 'orders'
    orderid = db.Column(db.String, primary_key=True)
    userid = db.Column(db.String, nullable=False)
    productids = db.Column(ARRAY(db.String), nullable=False)  # Updated to ARRAY of strings
    quantities = db.Column(ARRAY(db.Integer), nullable=False)  # Updated to ARRAY of integers
    orderdate = db.Column(db.DateTime)
    totalprice = db.Column(db.Float)
    discount = db.Column(db.Float)
    status = db.Column(db.String(50))
    addressid = db.Column(db.String, nullable=False)  # Assuming you want to store address ID
    paymentmethodid = db.Column(db.String, nullable=False)  # Assuming you want to store payment method ID
    
    def __init__(self, orderID, userID, productIDs, quantities, orderDate, totalPrice, discount, status, addressID, paymentMethodID):
        self.orderid = orderID
        self.userid = userID
        self.productids = productIDs  # Updated to accept array of product IDs
        self.quantities = quantities  # Updated to accept array of quantities
        self.orderdate = orderDate
        self.totalprice = totalPrice
        self.discount = discount
        self.status = status
        self.addressid = addressID  # New field for address ID
        self.paymentmethodid = paymentMethodID  # New field for payment method ID
