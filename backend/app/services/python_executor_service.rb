class PythonExecutorService
  class PythonExecutionError < StandardError; end

  def self.call(model_name:, input_text:, rules:)
    new(model_name, input_text, rules).execute
  end

  def initialize(model_name, input_text, rules)
    @model_name  = model_name
    @dispatcher_script_path = Rails.root.join('ml_models', 'dispatcher.py')
    @input_text  = input_text
    @rules       = rules
  end

  def execute
    input_data = {
      text:   @input_text,
      rules:  @rules
    }

    temp_input  = Tempfile.new(['input', '.json'])
    temp_output = Tempfile.new(['output', '.json'])

    begin
      File.write(temp_input.path, input_data.to_json)
      command = build_command(@model_name, temp_input.path, temp_output.path)
      _stdout, stderr, status = Open3.capture3(command)

      unless status.success?
          Rails.logger.error("Python execution failed: #{stderr}")
          raise PythonExecutionError, "Python script failed: #{stderr}"
      end

      output_content = File.read(temp_output.path)
      result = JSON.parse(output_content)

      validate_result!(result)
      result
      
    rescue JSON::ParserError => e
      raise PythonExecutionError, "Invalid JSON output from Python: #{e.message}"
    ensure
      temp_input.close
      temp_input.unlink
      temp_output.close
      temp_output.unlink
    end
  end

  private

  def build_command(model_name, input_path, output_path)
    python_bin = ENV['PYTHON_PATH'] || 'python3'
    "#{python_bin} #{@dispatcher_script_path} #{model_name} #{input_path} #{output_path}"
  end

  def validate_result!(result)
        required_keys = ['is_compliant', 'confidence']
        missing_keys  = required_keys - result.keys

        if missing_keys.any?
          raise PythonExecutionError, "Missing required keys: #{missing_keys.join(', ')}" 
        end
  end

end