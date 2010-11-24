require 'pusher'

Pusher.app_id = '2938'
Pusher.key = 'd63e6e0bfa04a9adb62a'
Pusher.secret = '1e36be2e9291b2aa0dd4'

class TasksController < ApplicationController
  def index
    render :json => { :models => Task.board_index(params[:board]) }
  end
  
  def create
    task = Task.new(params[:model])
   
    if task.save			
			Pusher[params[:board]].trigger('task-create', task.as_json, params[:socket_id])
			
      render :json => { :model => task }
    else
      render :json => task.errors, :status => :bad_request
    end
  end

	def update
		task = Task.find(params[:id])
		
		if (task.board == params[:board])
			if task.update_attributes(params[:model])
				
				Pusher[params[:board]].trigger('task-update', task.as_json, params[:socket_id])
				
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