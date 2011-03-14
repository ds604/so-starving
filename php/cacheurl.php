<?

if(!defined('CACHE_DIR'))define('CACHE_DIR','cache/');

function cacheURL($url,$timeout){
  $key=md5($url);
  if(file_exists(CACHE_DIR.$key) and (filemtime(CACHE_DIR.$key) + $timeout) > time()){
    return file_get_contents(CACHE_DIR.$key);
  }else{
    $t=file_get_contents($url);
    file_put_contents(CACHE_DIR.$key,$t);
    return $t;
  }
}
