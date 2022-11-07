divyaraj.odoo.expert@gmail.com

D!\/y@r@j@2022

sudo service redis-server stop
killall redis-server

heroku stack:set heroku-18


To Start Server
bundle exec rails s -p 4001 -b 0.0.0.0
Delayed Jobs
bundle exec rake jobs:work
Worker (Optional)
bundle exec rails s -p 4002 -P 4002 -b 0.0.0.0
Scanner (Optional)
bundle exec rails s -p 4003 -P 4003 -b 0.0.0.0


ifconfig


postgres reset sequence id
ActiveRecord::Base.connection.reset_pk_sequence!('countries')
ActiveRecord::Base.connection.reset_pk_sequence!('cities')

rake update_location:city

divyaraj@atharvasystem.com

  Ath@rv@#@2022

P3PU8-HDKNS-65275-3CYM2-UWPT3

rails g controller Transaction

rails g controller pages index

rails generate model room name:string
rails generate model room name:string
rails g controller messages new create index 


EDITOR="nano" rails credentials:edit

rails g migration AddStyleToResources style:string

rails generate model msg text:string
rails generate model Transactions user:references transaction_id:string payment_status:string 
rails generate model Micropost user:references
rails generate migration AddPublishToQuestions publish:boolean

<%= debug(params) if Rails.env.development? %> 

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


document.addEventListener("contextmenu", function (e){
  e.preventDefault();
}, false);
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
  if(e.ctrlKey && e.keyCode == "S".charCodeAt(0)) {
    return false;
  }
  if(e.ctrlKey && e.keyCode == "P".charCodeAt(0)) {
    return false;
  }
}



nvm install node                # download and install latest stable Node
nvm alias default node          # make it default version
nvm list                        # check
npm --version

brew install yarn               # you can use other installer if desired, such as yvm
rvm install 2.7                 # download and install latest stable Ruby (update to exact version)
rvm use 2.7 --default           # use it and make it default
rvm list                        # check

gem install rails               # download and install latest stable Rails
gem install foreman             # download and install Foreman
