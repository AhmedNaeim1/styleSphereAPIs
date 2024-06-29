from config import db
from models import orderModel

import uuid

# Add order to the database
import uuid
from datetime import datetime

def add_order_to_db(userID, productIDs, quantities, totalPrice, addressID, paymentMethodID):
    try:
        orderID = uuid.uuid4().hex
        orderDate = datetime.now()
        discount = 0  # Assuming discount is not provided and is set to 0
        status = 'pending'  # Assuming default status is 'pending'

        # Create a single order entry with productIDs and quantities as lists
        order = orderModel.Order(
            orderID=orderID,
            userID=userID,
            productIDs=productIDs,  # Storing productIDs as a list
            quantities=quantities,  # Storing quantities as a list
            orderDate=orderDate,
            totalPrice=totalPrice,
            discount=discount,
            status=status,
            addressID=addressID,
            paymentMethodID=paymentMethodID
        )
        
        db.session.add(order)
        db.session.commit()
        return True
    except Exception as e:
        print(str(e))  # Log the error for debugging purposes
        return False


# Get order by orderID
def get_order_by_id(orderID):
    try:
        order = orderModel.Order.query.filter_by(orderid=orderID).first()
        if order:
            return {'orderid': order.orderid, 'userid': order.userid, 'productid': order.productid, 'quantity': order.quantity, 
                    'orderdate': order.orderdate, 'totalPrice': order.totalPrice, 'discount': order.discount, 'status': order.status}
        else:
            return None
    except Exception as e:
        return str(e), 500
    
# Get all orders
def get_orders():
    try:
        orders = orderModel.Order.query.all()
        order_list = []
        for order in orders:
            order_list.append({'orderid': order.orderid, 'userid': order.userid, 'productid': order.productid, 'quantity': order.quantity, 
                    'orderdate': order.orderdate, 'totalPrice': order.totalPrice, 'discount': order.discount, 'status': order.status})
        return order_list
    except Exception as e:
        return str(e), 500
    
# Get orders by userID
def get_user_order_by_id(userID):
    try:
        orders = orderModel.Order.query.filter_by(userid=userID).all()
        order_list = []
        for order in orders:
            order_list.append({'orderid': order.orderid, 'userid': order.userid, 'productid': order.productid, 'quantity': order.quantity, 
                    'orderdate': order.orderdate, 'price': order.price, 'discount': order.discount, 'status': order.status})
        return order_list
    except Exception as e:
        return str(e), 500

# Update order status
def update_order_status(orderID, status):
    try:
        order = orderModel.Order.query.filter_by(orderid=orderID).first()
        order.status = status
        db.session.commit()
        return 'Order status updated successfully'
    except Exception as e:
        return str(e), 500

# Delete order by orderID
def delete_order_by_id(orderID):
    try:
        order = orderModel.Order.query.filter_by(orderid=orderID).first()
        db.session.delete(order)
        db.session.commit()
        return 'Order deleted successfully'
    except Exception as e:
        return str(e), 500

# Get all orders for a product
def get_product_orders(productID):
    try:
        orders = orderModel.Order.query.filter_by(productid=productID).all()
        order_list = []
        for order in orders:
            order_list.append({'orderid': order.orderid, 'userid': order.userid, 'productid': order.productid, 'quantity': order.quantity, 
                    'orderdate': order.orderdate, 'price': order.price, 'discount': order.discount, 'status': order.status})
        return order_list
    except Exception as e:
        return str(e), 500
