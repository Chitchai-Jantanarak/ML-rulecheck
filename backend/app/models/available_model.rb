class AvailableModel < ApplicationRecord
    has_many  :predictions
    validates :name,                presence: true,    uniqueness: true
    validates :display_name,        presence: true
    validates :python_script_path,  presence: true

    scope :active, -> { where(is_active: true) }

    def self.seed_models
        models = [
            {
                name: "ls",
                display_name: "Logistic Regression",
                python_script_path: "ml_models/callers/ls.py"
            },
            {
                name: "gru",
                display_name: "GRU (Gated Recurrent Unit)",
                python_script_path: "ml_models/callers/gru.py"
            },
            {
                name: "bert",
                display_name: "BERT",
                python_script_path: "ml_models/callers/bert.py"
            }
        ]

        models.each do |model_attrs|
            find_or_create_by(name: model_attrs[:name]) do |model|
                model.assign_attributes(model_attrs)
            end
        end
    end
end
