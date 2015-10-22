class CctrayController < ApplicationController
  
  def view
  	if request.xhr?
			all_projects = CctrayService.cctray
			projects = Settings.projects
			my_projects = all_projects.find_all{|pl| projects.any?{|project| pl['name'].match (project)} }
			# my_projects = all_projects.select {|k, v| t = k["name"]; projects.grep /#{t}.*/  }
  		render json: my_projects
	else
		render :view
  	end
  end
end
