require "instagram"


CALLBACK_URL = "http://localhost:4567/oauth/callback"

Instagram.configure do |config|
  config.client_id = "c8f7973e4c2a40909deb8ac3c5c11843"
  config.client_secret = "c02752f7a0d54e32b510859841d67ac5"
end