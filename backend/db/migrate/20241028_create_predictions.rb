# db/migrate/20241028_create_predictions.rb
class CreatePredictions < ActiveRecord::Migration[7.1]
  def change
    # Static models available
    create_table :available_models do |t|
      t.string :name, null: false           # 'ls', 'gru', 'bert'
      t.string :display_name, null: false   # 'Logistic Regression', 'GRU', 'BERT'
      t.text :description
      t.string :python_script_path          # Path to .py file
      t.boolean :is_active, default: true
      t.timestamps
    end

    # User predictions
    create_table :predictions do |t|
      t.references :available_model, foreign_key: true
      t.text :input_text, null: false
      t.text :rules, null: false
      t.string :status, default: 'pending'  # pending, processing, completed, failed
      t.jsonb :prediction_result            # Store prediction output
      t.float :confidence_score
      t.boolean :is_compliant
      t.text :error_message
      t.timestamps
    end

    add_index :available_models, :name, unique: true
    add_index :predictions, :status
    add_index :predictions, :created_at
  end
end