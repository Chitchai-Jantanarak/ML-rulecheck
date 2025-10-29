
require "test_helper"

module Api
  class PredictionsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @prediction = predictions(:two)
      @available_model = available_models(:one)
    end

    test "should get index" do
      get api_predictions_url
      assert_response :success

      predictions = JSON.parse(@response.body)
      assert_equal 2, predictions.length
      assert_equal @prediction.id, predictions.first["id"]
    end

    test "should create prediction" do
      assert_enqueued_with(job: PredictionJob) do
        post api_predictions_url, params: { prediction: { available_model_id: @available_model.id, input_text: "New input", rules: "new_rule" } }, as: :json
      end
      assert_response :created

      assert_equal 3, Prediction.count
      prediction = Prediction.last
      assert_equal "New input", prediction.input_text
      assert_equal "new_rule", prediction.rules
      assert_equal @available_model.id, prediction.available_model_id
    end
    test "should predict sync" do
      PythonExecutorService.stubs(:call).returns({ "is_compliant" => true, "confidence" => 0.95 })
      assert_difference("Prediction.count", 1) do
        post predict_sync_api_predictions_url, params: { prediction: { available_model_id: @available_model.id, input_text: "Sync input", rules: "sync_rule" } }, as: :json
      end
      assert_response :ok

      prediction = Prediction.last
      prediction.reload
      assert prediction.status_completed?
      assert_not_nil prediction.prediction_result
      assert_equal true, prediction.is_compliant
      assert_equal 0.95, prediction.confidence_score
    end
    test "should show prediction" do
      get api_prediction_url(@prediction)
      assert_response :success

      response_prediction = JSON.parse(@response.body)
      assert_equal @prediction.id, response_prediction["id"]
      assert_equal @prediction.input_text, response_prediction["input_text"]
    end

    test "should not show non-existent prediction" do
      get api_prediction_url(99999)
      assert_response :not_found
    end
  end
end
