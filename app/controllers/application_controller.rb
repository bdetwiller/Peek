class ApplicationController < ActionController::Base
  protect_from_forgery
  def after_sign_out_path_for(resource_or_scope)3
     "/"
  end

  def after_sign_in_path_for(resource)
 		"#friends"
	end
end
