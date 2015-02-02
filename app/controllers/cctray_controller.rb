class CctrayController < ApplicationController
  
  def view
  	if request.xhr?
  		render json: CctrayService.cctray
	else
		render :view
  	end
  end
end
