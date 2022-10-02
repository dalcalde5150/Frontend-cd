class HomeController < ApplicationController
  def index
  end

  def update
    @id = params[:id].to_i
    @lat = params[:lat].to_f
    @lon = params[:lon].to_f
    return unless current_user && @id

    @job = Job.find_by(user_id: current_user, event_id: @id)
    if @job.blank? == false
      @job.destroy
    end
    @events = Event.order(id: :desc).limit(2000)
    @response = RestClient.post 'https://localhost:8080/job', {'id' => @id, 'lat' => @lat, 'lon' => @lon, 'eventos' => @events}.to_json, :content_type => :json, :accept => :to_json
    @new = Job.create(user_id: current_user.id, event_id: @id, job_id: @response)
    if @new.save
      redirect_to root_path
    else
      puts "Error"
    end
  end
end
