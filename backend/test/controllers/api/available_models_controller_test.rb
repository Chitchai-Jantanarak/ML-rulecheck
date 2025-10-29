
require "test_helper"

module Api
  class AvailableModelsControllerTest < ActionDispatch::IntegrationTest
    test "should get index" do
      get api_available_models_url
      assert_response :success

      models = JSON.parse(@response.body)
      assert_equal 1, models.length
      assert_equal "bert", models.first["name"]
    end
  end
end
