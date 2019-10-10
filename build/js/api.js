var social_total_data = [];
var social_total_multi_data = [];

function getUserInfo(isMultiData){
    
    for(var j = 0; j<(isMultiData?5:1); j++) {

        var apiAddress = "";
        if (!isMultiData)
            apiAddress = "../build/db/sampledata.json";
        else
            apiAddress = "../build/db/sampledata"+(j+1)+".json";
            
        $.getJSON(apiAddress,  function(res){
            var social_data_temp = [];

            for(var i=0; i<res.length; i++){
                var newInfo = {
                    facebook_follower:'',
                    tw_follower:'',
                    in_follower:'',
                    category:'',
                    website_global_rank:'',
                    web_global_rank_delta:'',
                    web_domestic_rank:'',
                    facebook_rating:'',
                    bbs_google_rating:'',
                    yelp_rating:'',
                    bbs_company_name:'',
                    bbs_google_rating:'',
                    bbs_google_review:'',
                    bbs_address:'',
                    bbs_website:'',
                    key_entity:[]
                }

                var obj = JSON.parse(res[i]["key_entity"].replace(/'/g, '"'));
                var count = 0;

                if(res[i]["facebook_follower"] == ""){
                    newInfo.facebook_follower=0;
                    // facebook_follower = 0;    
                }else{                 
                    newInfo.facebook_follower = parseInt((res[i]["facebook_follower"].split(" ")[0]).replace(/,/g, ''));
                }
                if(res[i]["tw_follower"] == ""){
                    newInfo.tw_follower = 0;
                }else{
                    newInfo.tw_follower = parseInt((res[i]["tw_follower"].split(" ")[0]).replace(/,/g, ''));
                }
                if(res[i]["in_follower"] == "" || res[i]["in_follower"] == "[]"){
                    newInfo.in_follower = 0;
                }else{
                    newInfo.in_follower = parseInt((res[i]["in_follower"].split(" ")[0]).replace(/,/g, ''));
                }
                if(res[i]["website_global_rank"] == "Low traffic past 90 days"){
                    newInfo.website_global_rank = 0;
                }else{
                    newInfo.website_global_rank = parseInt(res[i]["website_global_rank"]);
                }
                if(res[i]["web_global_rank_delta"] == "Low traffic past 90 days"){
                    newInfo.web_global_rank_delta = 0;
                }else{
                    newInfo.web_global_rank_delta = parseInt(res[i]["web_global_rank_delta"]);
                }
                if(res[i]["web_domestic_rank"] == "Low traffic past 90 days"){
                    newInfo.web_domestic_rank = 0;
                }else{
                    newInfo.web_domestic_rank = parseInt(res[i]["web_domestic_rank"]);
                }
                if(res[i]["facebook_rating"] == ""){
                    newInfo.facebook_rating = 0;
                }else{
                    newInfo.facebook_rating = res[i]["facebook_rating"].split(" ")[0];
                    newInfo.facebook_rating = parseInt(newInfo.facebook_rating);
                }
                if(res[i]["bbs_google_rating"] == ""){
                    newInfo.bbs_google_rating = 0;
                }else{
                    newInfo.bbs_google_rating = res[i]["bbs_google_rating"];
                }
                if(res[i]["yelp_rating"] == ""){
                    newInfo.yelp_rating = 0;
                }else{
                    newInfo.yelp_rating = res[i]["yelp_rating"].split(" ")[0];
                    newInfo.yelp_rating = parseInt(newInfo.yelp_rating);
                }
                newInfo.bbs_company_name = res[i]["bbs_company_name"];
                newInfo.category = res[i]["category"];
                newInfo.bbs_google_review = res[i]["bbs_google_review"];
                newInfo.bbs_address = res[i]["bbs_address"];
                newInfo.bbs_website = res[i]["bbs_website"];

                while(typeof(obj["entity_"+count]) != "undefined"){

                    var info = {
                        key_entity_key:obj["entity_"+count]["key"],
                        key_entity_search_volume_monthly:obj["entity_"+count]["search_volume_monthly"],
                        key_entity_directed_url:obj["entity_"+count]["directed_url"]
                    };
                    newInfo.key_entity.push(info);
                    count++;
                }
                social_data_temp.push(newInfo);
            }
            if (!isMultiData) {
                timerFlag = false;
                social_total_data = social_data_temp;
            } else {
                social_total_multi_data.push(social_data_temp);
                if (social_total_multi_data.length == 5) {
                    timerFlag = false;                    
                }
            }
        })        
    }
}

function getUserData(index) {
    return social_total_data[index];
}

function getCompetitorData(compNo, index) {
    return social_total_multi_data[compNo][index];
}