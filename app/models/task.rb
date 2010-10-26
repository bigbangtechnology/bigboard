class Task < CouchRest::Model::Base
  use_database CouchServer.default_database
  
  property  :description,   String
  property  :status,        String
  property  :board,         String
  property  :day,           Fixnum
  
  timestamps!
  
  view_by :board, :descending => true

end