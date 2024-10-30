function createJsonPatch(data){
    var patch = Object.keys(data).reduce(function(arr, prop){
        if(prop === "id"){
            return arr;
        }

        arr.push({
            op: 'add',
            path: '/' + prop.charAt(0).toUpperCase() + prop.slice(1),
            value: data[prop]
        });

        return arr;
      }, []);
    
      return patch;
}


export default createJsonPatch;