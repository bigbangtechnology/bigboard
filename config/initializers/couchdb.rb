require 'couchrest/model'



CouchServer = CouchRest::Server.new(Bigboard::Application.config.couchdb_connection) # defaults to localhost:5984
CouchServer.default_database = "bigboard-#{Rails.env}"