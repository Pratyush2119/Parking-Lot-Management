function submitHandler() {
    var name=document.getElementById("name").value;
    var vehname=document.getElementById("vehname").value;
    var vehnum=document.getElementById("vehnum").value;
    var endate=new Date(document.getElementById("endate").value);
    var tendate=document.getElementById("endate").value;
    var exdate=new Date(document.getElementById("exdate").value);
    var texdate=document.getElementById("exdate").value;
    if(name!='' && vehname!='' && vehnum!='' && endate!='' && exdate!='') {
        var regpat='^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$';
        if(vehnum.match(regpat)) {
            if (endate.getTime()<exdate.getTime()) {
                var data={"name": name,"vehname":vehname,"vehnum":vehnum,"endate":tendate,"exdate":texdate};
                var key=String(Math.floor((Math.random()*100000)+1));
                window.localStorage.setItem(key,JSON.stringify(data));
    
                var storage = allStorage();
                var values = storage.values;
                var keys = storage.keys;
                displayCarData(values,keys);
                console.log(values);
            }
            else {
                document.getElementById('endateError').style.visibility="visible";
                document.getElementById('exdateError').style.visibility="visible";
            }
        }
        else {
            document.getElementById('vehnumError').style.visibility="visible";
        }
    }
    else {
        if(name=='') {
            document.getElementById('nameError').style.visibility="visible";
        }
        if(vehname=='') {
            document.getElementById('vehnameError').style.visibility="visible";
        }
        if(vehnum=='') {
            document.getElementById('vehnumError').style.visibility="visible";
        }
        if(endate=='Invalid Date') {
            document.getElementById('endateError').style.visibility="visible";
        }
        if(exdate=='Invalid Date') {
            document.getElementById('exdateError').style.visibility="visible";
        }
    }
}

function checkContent(id,iderr) {
    var content = document.getElementById(id).value;
    if(content=='') {
        document.getElementById(iderr).style.visibility = "visible";
    }
    else {
        document.getElementById(iderr).style.visibility = "hidden";
    }
}

function allStorage() {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
        values.push(localStorage.getItem(keys[i]) );
    }
    return {values,keys};
}

function displayCarData(values,keys) {
    var cartab = document.getElementById("car-list").getElementsByTagName("tbody")[0];
    cartab.innerHTML = '';
        for (let i=0;i<values.length;i++) {
            var row = cartab.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            rowdata = JSON.parse(values[i]);
            cell1.innerHTML=rowdata.name;
            cell1.style.textAlign="center";
            cell1.style.padding="10px";
            cell2.innerHTML=rowdata.vehname;
            cell2.style.textAlign="center";
            cell3.innerHTML=rowdata.vehnum;
            cell3.style.textAlign="center";
            cell4.innerHTML=rowdata.endate;
            cell4.style.textAlign="center";
            cell5.innerHTML=rowdata.exdate;
            cell5.style.textAlign="center";
            cell6.innerHTML="<button class='deleteBtn' onclick='onDeleteRow("+keys[i]+")'>X</button>";
            cell6.style.textAlign="center";
        }
}

window.onload = function() {
    var storage = allStorage();
    if (storage.values.length > 0) {
        displayCarData(storage.values,storage.keys);
    }
}

function onDeleteRow(key) {
    localStorage.removeItem(key);
    var storage = allStorage();
    var values = storage.values;
    var keys = storage.keys;
    displayCarData(values,keys);
}

//localStorage.clear();