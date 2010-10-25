Bigboard::Application.routes.draw do  
  resources :tasks, :only => [:index, :create]
  
	root :to => "home#index"
end
