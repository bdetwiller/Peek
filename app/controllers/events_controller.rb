class EventsController < ApplicationController
  respond_to :json
  respond_to :html, :only => [:index]

  def geo
    respond_to do |format|
      format.html { render :index } # entry-point for Backbone app
      format.json { render :nothing => true }
    end
  end

	def index
    # respond_to do |format|
   #    format.json { render :nothing => true }
   #  end
	end


end
