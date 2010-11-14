class Task < CouchRest::Model::Base
  use_database CouchServer.default_database
  
  property  :description,   String
  property  :status,        String
  property  :board,         String
  property  :day,           Fixnum
  
  timestamps!

  view_by :board, :descending => true, :map => "
		function(doc) {
		  if ((doc['couchrest-type'] == 'Task') && (doc['board'] != null) && (doc['status'] != 'cleared')) {
		    emit(doc['board'], null);
		  }
		}  
	"


end