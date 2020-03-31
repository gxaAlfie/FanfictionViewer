module Rescuable
  private

  def error_handler
    yield
  rescue StandardError => error
    puts error.message
  end
end
