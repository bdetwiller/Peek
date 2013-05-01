class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:instagram]
  #devise :confirmable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :password_confirmation, :remember_me,
                  :token
  # attr_accessible :title, :body

  # for oauth
  attr_accessible :provider, :uid

  def email_required?
    false
  end


  def self.find_or_create_by_instagram_oauth(auth)
      user = User.where(:provider => auth.provider, :uid => auth.uid).first

      unless user
        user = User.create!(
        username: auth.info.nickname,
        provider: auth.provider,
        uid: auth.uid,
        email: "#{auth.info.nickname}@instagram.com",
        token: auth.credentials.token,
        password: Devise.friendly_token[0,20])
      end

     user
   end
   #
   # def as_json
   #   json = super
   #   json["authentication_token"] = authentication_token
   #   json
   # end
end
