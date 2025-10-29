class PythonExecutorService
  class PythonExecutionError < StandardError; end

  def self.call(model_name:, input_text:, rules:)
    new(
      model_name: model_name,
      input_text: input_text,
      rules: rules
    ).execute
  end

  def initialize(model_name:, input_text:, rules:)
    @model_name  = model_name
    @input_text  = input_text
    @rules       = rules
  end

  def execute
    input_data = {
      text:   @input_text,
      rules:  @rules
    }

    temp_input  = Tempfile.new([ "input", ".json" ])
    temp_output = Tempfile.new([ "output", ".json" ])

    begin
      File.write(temp_input.path, input_data.to_json)
      command = build_command(@model_name, temp_input.path, temp_output.path)

      Rails.logger.info("Executing Python command: #{command}")

      _stdout, stderr, status = Open3.capture3(command)

      output_content = File.read(temp_output.path)
      result = JSON.parse(output_content) rescue {}

      unless status.success?
        error_message = result['error'] || stderr
        Rails.logger.error("Python execution failed: #{error_message}")
        raise PythonExecutionError, "Python script failed: #{error_message}"
      end

      validate_result!(result)
      result

    rescue JSON::ParserError => e
      raise PythonExecutionError, "Invalid JSON output from Python: #{e.message}"
    rescue Errno::ENOENT => e
      raise PythonExecutionError, "Python executable or script not found: #{e.message}"
    ensure
      temp_input.close
      temp_input.unlink
      temp_output.close
      temp_output.unlink
    end
  end

  private

  def build_command(model_name, input_path, output_path)
    python_bin = ENV["PYTHON_PATH"] || "python"
    "#{python_bin} -m ml_models #{model_name} #{input_path} #{output_path}"
  end

  def validate_result!(result)
        required_keys = [ "is_compliant", "confidence" ]
        missing_keys  = required_keys - result.keys

        if missing_keys.any?
          raise PythonExecutionError, "Missing required keys: #{missing_keys.join(', ')}"
        end
  end
end
