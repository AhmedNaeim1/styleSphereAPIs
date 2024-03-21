from config import db

class Following(db.Model):
    __tablename__ = 'following'
    followid = db.Column(db.String, primary_key=True)
    followerid = db.Column(db.Integer, nullable=False)
    followedid = db.Column(db.Integer, nullable=False)
    followdate = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self, followID, followerID, followedID, followDate):
        self.followid = followID
        self.followerid = followerID
        self.followedid = followedID
        self.followdate = followDate
    
    def following_to_dict(following):
        return{
        'followid': following.followid,
        'followerid': following.followerid,
        'followedid': following.followedid,
        'followdate': following.followdate.strftime('%Y-%m-%d %H:%M:%S') if following.followdate else None
    }

