class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def instagram
    instagram_data = request.env["omniauth.auth"]

    # You need to implement the method below in your model
    @user = User.find_or_create_by_instagram_oauth(instagram_data)

    sign_in_and_redirect @user
  end



end