from flask import Blueprint, jsonify, request
from repositories.order_repository import *

order_blueprint = Blueprint('order_blueprint', __name__)

@order_blueprint.route('/create-order', methods=['POST'])
def create_order_controller():
    try:
        request_data = request.get_json()

        orderID = request_data.get("orderID")
        userID = request_data.get("userID")
        productID = request_data.get("productID")
        quantity = request_data.get("quantity")
        orderDate = request_data.get("orderDate")
        price = request_data.get("price")
        discount = request_data.get("discount")
        status = request_data.get("status")

        result = add_order_to_db(orderID, userID, productID, quantity, orderDate, price, discount, status)
      
        return jsonify({'result': result}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@order_blueprint.route('/get-order/<string:orderID>', methods=['GET'])
def get_order_controller(orderID):
    try:
        order = get_order_by_id(orderID)
        if order:
            return jsonify(order), 200
        else:
            return jsonify({'message': 'Order not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@order_blueprint.route('/get-orders', methods=['GET'])
def get_all_orders_controller():
    try:
        order = get_orders()
        if order:
            return jsonify(order), 200
        else:
            return jsonify({'message': 'Order not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@order_blueprint.route('/get-user-orders/<string:userID>', methods=['GET'])
def get_user_orders_controller(userID):
    try:
        order = get_user_order_by_id(userID)
        if order:
            return jsonify(order), 200
        else:
            return jsonify({'message': 'Order not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@order_blueprint.route('/update-order-status/<string:orderID>', methods=['PUT'])
def update_order_status_controller(orderID):
    try:
        request_data = request.get_json()
        status = request_data.get("status")

        result = update_order_status(orderID, status)
        return jsonify({'result': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@order_blueprint.route('/delete-order/<string:orderID>', methods=['DELETE'])
def delete_order_controller(orderID):
    try:
        result = delete_order_by_id(orderID)
        return jsonify({'result': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@order_blueprint.route('/get-product-orders/<int:productID>', methods=['GET'])
def get_product_orders_controller(productID):
    try:
        order = get_product_orders(productID)
        if order:
            return jsonify(order), 200
        else:
            return jsonify({'message': 'Order not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500