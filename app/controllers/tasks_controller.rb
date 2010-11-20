class TasksController < ApplicationController
  def index
    render :json => { :models => Task.board_index(params[:board]) }
  end
  
  def create
    task = Task.new(params[:model])
   
    if task.save
      render :json => { :model => task }
    else
      render :json => task.errors, :status => :bad_request
    end
  end

	def update
		task = Task.find(params[:id])
		
		if (task.board == params[:board])
			if task.update_attributes(params[:model])
				head :ok
			else
				render :json => task.errors, :status => :bad_request
			end
		else
			logger.info("SOMETHING WENT WRONG")
			logger.info(task.inspect)
		end
	end
end