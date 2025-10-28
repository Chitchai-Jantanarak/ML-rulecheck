# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 20241028) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "available_models", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "display_name", null: false
    t.boolean "is_active", default: true
    t.string "name", null: false
    t.string "python_script_path"
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_available_models_on_name", unique: true
  end

  create_table "predictions", force: :cascade do |t|
    t.bigint "available_model_id"
    t.float "confidence_score"
    t.datetime "created_at", null: false
    t.text "error_message"
    t.text "input_text", null: false
    t.boolean "is_compliant"
    t.jsonb "prediction_result"
    t.text "rules", null: false
    t.string "status", default: "pending"
    t.datetime "updated_at", null: false
    t.index ["available_model_id"], name: "index_predictions_on_available_model_id"
    t.index ["created_at"], name: "index_predictions_on_created_at"
    t.index ["status"], name: "index_predictions_on_status"
  end

  add_foreign_key "predictions", "available_models"
end
