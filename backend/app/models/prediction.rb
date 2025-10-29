class Prediction < ApplicationRecord
    belongs_to :available_model

    validates :input_text,  presence: true
    validates :rules,       presence: true

    STATUSES = { pending: "pending", processing: "processing", completed: "completed", failed: "failed" }.freeze

    def status
      super.inquiry
    end

    def status_pending?
      status == "pending"
    end

    def status_processing?
      status == "processing"
    end

    def status_completed?
      status == "completed"
    end

    def status_failed?
      status == "failed"
    end

    def status=(value)
      super(value)
    end

    scope :recent, -> { order(created_at: :desc) }

    def execute!
        update!(status: "processing")

        begin
            result = PythonExecutorService.call(
                model_name:         available_model.name,
                input_text:         input_text,
                rules:              rules
            )

            update!(
                status:             "completed",
                prediction_result:  result,
                confidence_score:   result["confidence"],
                is_compliant:       result["is_compliant"]
            )
        rescue => e
            update!(
                status:             "failed",
                error_message:      e.message
            )
            raise
        end
    end
end