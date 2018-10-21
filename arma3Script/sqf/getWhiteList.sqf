
waitUntil{"url_fetch" callExtension "http://95.89.230.39/lista?type=text&filter=uid" == "OK"};
WhiteList = "url_fetch" callExtension "OK";

hint str(WhiteList);