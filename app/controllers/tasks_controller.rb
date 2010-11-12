class TasksController < ApplicationController
  def index
		sleep(2)
    render :json => { :models => Task.by_board({ :key => params[:board]}) }
  end
  
  def create
    task = Task.new(params[:model])
   
    if task.save
      render :json => { :model => task }
    else
      render :json => task.errors, :status => :bad_request
    end
  end
end