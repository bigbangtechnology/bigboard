Bigboard::Application.routes.draw do  
	scope("/:board/") do
  	resources :tasks, :only => [:index, :create, :update]
	end

  
	root :to => "home#index"
end
