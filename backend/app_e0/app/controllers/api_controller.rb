class ApiController < ApplicationController

    def get_data
        @data = Event.all
        response.headers['Access-Control-Allow-Origin'] = '*'
        render json: @data
    end

end
