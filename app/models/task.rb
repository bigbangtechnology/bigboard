class Task < CouchRest::Model::Base
  use_database CouchServer.default_database
  
  property  :description,   String
  property  :status,        String
  property  :board,         String
  property  :day,           Fixnum
  
  timestamps!

  view_by :board, :map => "
		function(doc) {
			if (doc['couchrest-type'] == 'Task' && doc.board != null && doc.status != 'cleared') {
				emit([doc.board, doc.created_at], null)
			}
		}  
	"

	def self.board_index board_name
		self.by_board({ :startkey => [board_name, DateTime.now.to_s(:db) ], :endkey => [board_name, "2010/01/01 00:00:00"]})		
	end

end