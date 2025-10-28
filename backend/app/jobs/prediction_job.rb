class PredictionJob < ApplicationJob
    queue_as :predictions

    def perform(prediction_id)
      prediction = Prediction.find(prediction_id)
      prediction.execute!
      
      # DEBUG
      ActionCable.server.broadcast(
        "predictions_#{prediction_id}",
        { 
          status: 'completed',
          result: prediction.prediction_result 
        }
      )
    
    rescue => e
      Rails.logger.error("Prediction job failed: #{e.message}")
      raise
    end
end