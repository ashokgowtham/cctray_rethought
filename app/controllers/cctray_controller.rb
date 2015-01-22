class CctrayController < ApplicationController
  
  def view
  	if request.xhr?
  		render_json CctrayService.cctray
	else
		render :view
  	end
  end
end
