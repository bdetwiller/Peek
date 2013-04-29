class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:instagram]
  devise :confirmable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  # for oauth
  attr_accessible :provider, :uid


  def self.find_or_create_by_instagram_oauth(auth)
      user = User.where(:provider => auth.provider, :uid => auth.uid).first

      unless user
        user = User.create!(
        provider: auth.provider,
        uid: auth.uid,
        email: auth.info.email,
        authentication_token: auth.credentials.token,
        password: Devise.friendly_token[0,20])
      end

     user
   end
end
