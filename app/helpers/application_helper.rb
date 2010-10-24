module ApplicationHelper
  
  def couchdb_url
    "#{Bigboard::Application.config.couchdb_url}/bigboard"
  end
end
