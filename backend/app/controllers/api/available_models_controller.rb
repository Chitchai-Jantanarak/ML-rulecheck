module Api
  class AvailableModelsController < ApplicationController
      def index 
          models = AvailableModel.acative
          render json: models, only: [:id, :name, :display_name, :description]
      end
  end
end

module Api
    class PredictionsController < ApplicationController
      def create
        prediction = Prediction.new(prediction_params)

        if prediction.save
          PredictionJob.perform_later(prediction.id)
          render json: prediction, status: :created
        else
          render json: { errors: prediction.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def predict_sync
        prediction = Prediction.new(prediction_params)

        if prediction.save
          begin
            prediction.execute!
            render json: format_prediction(prediction), status: :ok
          rescue => e
            render json: { error: e.message }, status: :internal_server_error
          end
        else
          render json: { errors: prediction.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def show
        prediction = Prediction.find(params[:id])
        render json: format_prediction(prediction)
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Prediction not found' }, status: :not_found
      end

      private

      def prediction_params                                                                                  
        params.require(:prediction).permit(:available_model_id, :input_text, :rules)                         
      rescue ActiveRecord::RecordNotFound                                                                    
        render json: { error: 'Prediction not found' }, status: :not_found                                   
      end                                                                                                    

      def format_prediction(prediction)
        {
          id:               prediction_id,
          model:            prediction.available_model.display_name,
          input_text:       prediction.input_text,
          rules:            prediction.rules,
          status:           prediction.status,
          result:           prediction.prediction_result,
          is_compliant:     prediction.is_compliant,
          confidence_score: prediction.confidence_score,
          error_message:    prediction.error_message,
          created_at:       prediction.created_at
        }
      end
    end
end