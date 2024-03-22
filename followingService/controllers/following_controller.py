from flask import Blueprint, jsonify, request
from repositories.following_repository import *

following_blueprint = Blueprint('following_blueprint', __name__)

@following_blueprint.route('/follow', methods=['POST'])
def create_following_controller():
    try:
        request_data = request.get_json()

        followerID = request_data.get("followerID")
        followedID = request_data.get("followedID")
        followDate = request_data.get("followDate")

        result = add_following_to_db(followerID, followedID, followDate)
      
        return jsonify({'result': result}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@following_blueprint.route('/unfollow', methods=['DELETE'])
def unfollow_controller():
    try:
        request_data = request.get_json()

        followerID = request_data.get("followerID")
        followedID = request_data.get("followedID")
        result = unfollow(followerID,followedID)
        return jsonify({'result': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@following_blueprint.route('/followings/followers/<int:followerID>', methods=['GET'])
def get_user_followers_controller(followerID):
    try:
        following_list = get_user_followings(followerID)
        if following_list:
            return jsonify(following_list), 200
        else:
            return jsonify({'message': 'Followings not found'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@following_blueprint.route('/followings/followed/<int:followedID>', methods=['GET'])
def get_user_followed_controller(followedID):
    try:
        following_list = get_user_followers(followedID)
        if following_list:
            return jsonify(following_list), 200
        else:
            return jsonify({'message': 'Followings not found'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@following_blueprint.route('/exists', methods=['GET'])
def is_following_exists_controller():
    try:
        request_data = request.get_json()

        followerID = request_data.get("followerID")
        followedID = request_data.get("followedID")
        
        if followerID is None or followedID is None:
            return jsonify({'error': 'followerID and followedID are required parameters'}), 200
        
        exists = is_following_exists(followerID, followedID)
        return jsonify({'exists': exists}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500