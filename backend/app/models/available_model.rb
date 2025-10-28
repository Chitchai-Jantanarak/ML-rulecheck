class AvailableModel < ApplicationRecord
    has_many  :predictions
    validates :name,                presence: true,    uniqueness: true
    validates :display_name,        presence: true
    validates :python_script_path,  presence: true

    scope :active, -> { where(is_active: true) }

    def self.seed_models
        models = [
            {
                name: 'ls',
                display_name: 'Logistic Regression',
                description: 'Fast, lightweight model for basic rule compliance',
                python_script_path: 'ml_models/ls_model.py'
            },
            {
                name: 'gru',
                display_name: 'GRU (Gated Recurrent Unit)',
                description: 'RNN-based model for sequential text analysis',
                python_script_path: 'ml_models/gru_model.py'
            },
            {
                name: 'bert',
                display_name: 'BERT',
                description: 'Transformer model for deep contextual understanding',
                python_script_path: 'ml_models/bert_model.py'
            }
        ]
        
        models.each do |model_attrs|
            find_or_create_by(name: model_attrs[:name]) do |model|
                model.assign_attributes(model_attrs)
            end
        end
    end
end