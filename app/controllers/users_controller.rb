class UsersController < ApplicationController
  def show
   p request.env['omniauth.auth']
    @user = User.find(params[:id])
    render :json => @user
  end

end
