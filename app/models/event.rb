class Event < ActiveRecord::Base
  attr_accessible :end, :latitude, :longitude, :name, :start
end
