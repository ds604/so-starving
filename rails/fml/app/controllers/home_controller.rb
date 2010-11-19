
require 'json'
require 'open-uri'

class HomeController < ApplicationController
  
  def index
    fml_endpoint = 'http://graph.facebook.com/search?q=so%20starving&type=post'
    fb_data = session[fml_endpoint]
    if fb_data.nil?
      puts 'fetching data'
      fb_response =  open(fml_endpoint).read()
      fb_data = JSON.parse(fb_response)["data"]
      session[fml_endpoint] = fb_data
    end
    @fb_data = fb_data
    respond_to do |format| 
      format.html
    end
  end

end
