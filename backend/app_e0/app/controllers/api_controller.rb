class ApiController < ApplicationController

    def get_data
        @data = Event.all
        response.headers['Access-Control-Allow-Origin'] = '*'
        render json: @data
    end

    def post_workers
        @id = params[:id].to_i
        @lat = params[:lat].to_f
        @lon = params[:lon].to_f
        puts "id: #{@id}, lat: #{@lat}, lon: #{@lon}"

        if current_user?
            @job = Job.find_by(user_id: current_user, event_id: @id)
            if @job.blank? == false
                @job.destroy
            end
        end
        @events = Event.order(id: :desc).limit(2000)
        @response = RestClient.post '44.208.40.132:8080/job', {'id' => @id, 'lat' => @lat, 'lon' => @lon, 'eventos' => @events}.to_json, :content_type => :json, :accept => :to_json
        @new = Job.create(user_id: current_user.id, event_id: @id, job_id: @response)
        if @new.save
            render json: {status: 'SUCCESS', message: 'Job created', data: @new}, status: :ok
        else
            puts "Error"
        end
    end

    def heartbeat
        render json RestClient.get '44.208.40.132:8080/heartbeat'
    end

end
