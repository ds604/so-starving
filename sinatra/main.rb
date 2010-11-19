
require 'rubygems'

require 'erb'
require 'json'
require 'open-uri'
require 'sinatra'

enable :sessions

get '/' do
  fml_endpoint = 'http://graph.facebook.com/search?q=so%20starving&type=post'
  fb_data = session['fml_endpoint']
  if fb_data.nil? 
    fb_response =  open(fml_endpoint).read()
    fb_data = JSON.parse(fb_response)["data"]
    session[fml_endpoint] = fb_data
  end
  @fb_data = fb_data
  erb :index
end

