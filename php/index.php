<?
require_once('cacheurl.php');
$fml_endpoint='http://graph.facebook.com/search?q=so%20starving&type=post';
$fb_data=json_decode(cacheURL($fml_endpoint,30*60));
include('template/index.php');
