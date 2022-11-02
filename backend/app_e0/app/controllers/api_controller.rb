class ApiController < ApplicationController

    def get_data
        @data = Event.all
        render json: @data
    end

end
