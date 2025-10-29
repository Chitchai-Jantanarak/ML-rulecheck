module Api
  class AvailableModelsController < ApplicationController
    def index
      models = AvailableModel.active
      render json: models, only: [ :id, :name, :display_name, :description ]
    end
  end
end
