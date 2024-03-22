from config import db
from models import following_model

import uuid

def is_following_exists(followerID, followedID):
    existing_following = following_model.Following.query.filter_by(followerid=followerID, followedid=followedID).first()
    if existing_following:
        return "exists"
    else:
        return "not exists"
    
def add_following_to_db(followerID, followedID, followDate):
    try:
        if is_following_exists(followerID, followedID):
            return 'Following already exists'
        
        follow = following_model.Following(followID=uuid.uuid4().hex, followerID=followerID, followedID=followedID, followDate=followDate)
        db.session.add(follow)
        db.session.commit()
        return 'Followed successfully'
    except Exception as e:
        return str(e), 500

def get_user_followings(followerID):
    try:
        followings_list = following_model.Following.query.filter_by(followerid=followerID).all()
        return [following_model.Following.following_to_dict(following) for following in followings_list]
    except Exception as e:
        return str(e), 500
    
def get_user_followers(followedID):
    try:
        followers_list = following_model.Following.query.filter_by(followedid=followedID).all()
        return [following_model.Following.following_to_dict(follower) for follower in followers_list]
    except Exception as e:
        return str(e), 500


def unfollow(followerID, followedID):
    try:
        following_entry = following_model.Following.query.filter_by(followerid= followerID, followedid=followedID).first()
        if following_entry:
            db.session.delete(following_entry)
            db.session.commit()
            return 'Unfollowed successfully'
        else:
            return 'Following not found', 404
    except Exception as e:
        return str(e), 500
