


azm_getwt = {
	private "_result";
	"url_fetch" callExtension _this;
	sleep .1;
	_result = "url_fetch" callExtension "OK"; 
	if (_result != "WAIT") then {
		if (_result == "ERROR") exitWith {
			//deal with error here
			diag_log format [
				">>> [url_fetch v2.0] >>> ERROR: %1; ARGUMENTS: %2",
				"url_fetch" callExtension "ERROR",
				_this
			];
		};
		private _final = (call compile _result) select 0;
		_final = _final + ["_SP_PLAYER_"];
		missionNamespace setVariable ["azm_whitelist",_final,true];
		//systemChat format["%1",_final];
		_result
	} else {
		AZM_WHITELIST_LINK remoteExec ["azm_getwt",2];
	};
};

azm_check_white = {
	AZM_WHITELIST_LINK remoteExec ["azm_getwt",2];
	sleep 1;
	if (getPlayerUID player in (missionNamespace getVariable "azm_whitelist")) then {
		systemChat "Benvenuto";
	} else {
		[] spawn {
			cutText ["WHITELIST","BLACK"];
			diag_log format ["AZM WHITELIST>>> %1(%2) non è whitelistato",name player,getPlayerUID player];
			sleep 5;
			["whitelist", false, false] call BIS_fnc_endMission;
		}
	};
};

onPlayerConnected {
	[] spawn azm_check_white;	
};
