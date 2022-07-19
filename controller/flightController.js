const generateId = (ref) => {
    
    //get flight destination
    var to = ref.split(" ")[2].toLowerCase();
    
    let id = "";
    for(var i=0;i<10;i++) {
        id += Math.floor(Math.random() * 9);
    }
    return id+to;
}

//this helps us extract specific user data based on model created in model file
exports.extractDataBasedOnModel = (model, userData) => {
    const data = {}
    model.map(val => {
        data[val] = userData[val]
    });
    data["id"] = generateId(data["title"]);
    return data;
}

exports.findInJsonDB = (db, id) => {
    const result = db.find(res => res.id == id);
    return result;
}

exports.updateJsonDB = (db, user) => {
    for(var i=0;i<db.length;i++) {
        if(db[i].id == user.id) {
            db[i] = user;
            return db;
        }
    }
    return db;
}
exports.filterJsonDB = (db, id) => {
    const result = db.filter(res => res.id != id);
    return result;
}