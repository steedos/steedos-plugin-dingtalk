let objectql = require('@steedos/objectql');
let steedosConfig = objectql.getSteedosConfig();

exports.getSpace = function(corpId){
    try {
        let space;
        let spaceId = typeof steedosConfig !== "undefined" && steedosConfig !== null ? (_ref5 = steedosConfig.tenant) != null ? _ref5._id : void 0 : void 0;
        if (!spaceId){
            space = Creator.getCollection('spaces').findOne({});
        }else{
            space = Creator.getCollection('spaces').findOne({_id:spaceId});
        }

        return space;
    } catch (err) {
        console.error(err);
        throw _.extend(new Error("Failed to get space with error: " + err), {
            response: err
        });
    }
}