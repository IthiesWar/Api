"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUserID;
let CurrentUser;
let CurrentMed;
let CurrentOrder;
let CurrentUserName;
let currentmedicineID;
let OrderId;
function signup() {
    var c = document.getElementById('signup');
    var d = document.getElementById('signin');
    c.style.display = "block";
    d.style.display = "none";
}
function signin() {
    var c = document.getElementById('signup');
    var d = document.getElementById('signin');
    c.style.display = "none";
    d.style.display = "block";
}
function subsignin(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        var email = document.getElementById('email1');
        var password = document.getElementById('password1');
        var flag = 0;
        let fetchsignin = yield fetchUser();
        for (var i = 0; i < fetchsignin.length; i++) {
            if (email.value == fetchsignin[i].userEmail) {
                var a = document.getElementById('in');
                var b = document.getElementById('up');
                var c = document.getElementById('signup');
                var d = document.getElementById('signin');
                var e = document.getElementById('ul');
                var f = document.getElementById('wrapper');
                d.style.display = "none";
                f.style.display = "none";
                e.style.display = 'block';
                CurrentUserID = fetchsignin[i].userID;
                CurrentUser = fetchsignin[i];
                flag = 1;
                home();
            }
        }
        if (flag == 0) {
            alert("not exit");
        }
    });
}
function subsignup(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        var name1 = document.getElementById('name').value;
        var email1 = document.getElementById('email').value;
        var phone1 = document.getElementById('phone').value;
        var password1 = document.getElementById('password').value;
        var balance1 = parseInt(document.getElementById('balance').value);
        var flag = 0;
        var signupUser = {
            userID: undefined,
            userName: name1,
            userEmail: email1,
            userBalance: balance1,
            userPhone: phone1,
            userPassword: password1
        };
        addUser(signupUser);
        alert("Successfully Signup");
    });
}
function home() {
    var home = document.getElementById('home');
    home.innerHTML = "Hello " + CurrentUser.userName;
}
function showbalance() {
    var editShow = document.getElementById('edit');
    editShow.style.display = "none";
    var purchase1 = document.getElementById('purchase1');
    purchase1.style.display = "none";
    var home = document.getElementById('home');
    var balance = document.getElementById('balance1');
    balance.innerHTML = "";
    var recharge1 = document.getElementById('recharge1');
    recharge1.style.display = "none";
    var history1 = document.getElementById('history1');
    history1.style.display = "none";
    balance.innerHTML += "balance " + CurrentUser.userBalance;
    var cancel1 = document.getElementById('cancel1');
    cancel1.style.display = "none";
    balance.style.display = "block";
    home.style.display = "none";
    var medicineid = document.getElementById('medicineid');
    medicineid.style.display = "none";
}
function recharges() {
    var home = document.getElementById('home');
    home.style.display = "none";
    var inputrecharge = document.getElementById('inputrecharge').value;
    var medicineid = document.getElementById('medicineid');
    medicineid.style.display = "none";
    CurrentUser.userBalance += Number(inputrecharge);
    UpdateUser(CurrentUser.userID, CurrentUser);
}
function recharge() {
    var editShow = document.getElementById('edit');
    editShow.style.display = "none";
    var medicine2 = document.getElementById('medicine1');
    medicine2.style.display = "none";
    var purchase1 = document.getElementById('purchase1');
    purchase1.style.display = "none";
    var recharge1 = document.getElementById('recharge1');
    recharge1.style.display = "block";
    var balance = document.getElementById('balance1');
    balance.style.display = "none";
    var history1 = document.getElementById('history1');
    history1.style.display = "none";
    var cancel1 = document.getElementById('cancel1');
    cancel1.style.display = "none";
}
function medicine() {
    return __awaiter(this, void 0, void 0, function* () {
        var editShow = document.getElementById('edit');
        editShow.style.display = "none";
        var recharge1 = document.getElementById('recharge1');
        recharge1.style.display = "none";
        var cancel1 = document.getElementById('cancel1');
        cancel1.style.display = "none";
        var balance = document.getElementById('balance1');
        balance.style.display = "none";
        var home = document.getElementById('home');
        home.style.display = "none";
        var medicine2 = document.getElementById('medicine1');
        medicine2.style.display = "block";
        var history1 = document.getElementById('history1');
        history1.style.display = "none";
        var med1 = document.getElementById("med1");
        med1.innerHTML = "";
        var purchase1 = document.getElementById('purchase1');
        purchase1.style.display = "none";
        let fetMed = yield fetchMedicine();
        for (var i = 0; i < fetMed.length; i++) {
            var row = document.createElement("tr");
            row.innerHTML = `<td id="medname">${fetMed[i].medicineName}</td>
                <td id="medcount">${fetMed[i].medicineCount}</td>
                <td id="medprice">${fetMed[i].medicinePrice}</td>
                <td id="meddate">${fetMed[i].expiaryDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td><button onclick="edithistory(${fetMed[i].medicineID});">edit</button></td>
                <td><button onclick="deletemed(${fetMed[i].medicineID});">delete</button></td>`;
            med1.appendChild(row);
        }
    });
}
let medID;
function edithistory(medicineID) {
    medID = medicineID;
    var editShow = document.getElementById('edit');
    editShow.style.display = "block";
    var home = document.getElementById('home');
    home.style.display = "none";
    var balance = document.getElementById('balance1');
    balance.style.display = "none";
    var recharge1 = document.getElementById('recharge1');
    recharge1.style.display = "none";
    var purchase1 = document.getElementById('purchase1');
    purchase1.style.display = "none";
    var quantity = document.getElementById('quantity');
    quantity.style.display = "none";
    var history1 = document.getElementById('history1');
    history1.style.display = "none";
    var cancel1 = document.getElementById('cancel1');
    cancel1.style.display = "none";
    var htable1 = document.getElementById('htable1');
}
function editing() {
    return __awaiter(this, void 0, void 0, function* () {
        var ename = document.getElementById('ename').value;
        var ecount = parseInt(document.getElementById('ecount').value);
        var eprice = parseInt(document.getElementById('eprice').value);
        var edate = document.getElementById('edate').value;
        let fetMed = yield fetchMedicine();
        for (var i = 0; i < fetMed.length; i++) {
            if (medID == fetMed[i].medicineID) {
                let addMed = {
                    medicineID: medID,
                    medicineName: ename,
                    medicineCount: ecount,
                    medicinePrice: eprice,
                    expiaryDate: edate
                };
                UpdateMed(medID, addMed);
                alert("edited");
            }
        }
    });
}
function deletemed(medicineID) {
    deleteMedicineDetails(medicineID);
}
function purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        var editShow = document.getElementById('edit');
        editShow.style.display = "none";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('balance1');
        balance.style.display = "none";
        var recharge1 = document.getElementById('recharge1');
        recharge1.style.display = "none";
        var cancel1 = document.getElementById('cancel1');
        cancel1.style.display = "none";
        var purchase1 = document.getElementById('purchase1');
        purchase1.style.display = "block";
        var medicine2 = document.getElementById('medicine1');
        medicine2.style.display = "none";
        var table1 = document.getElementById("table1");
        table1.innerHTML = "";
        let purfet = yield fetchMedicine();
        for (var i = 0; i < purfet.length; i++) {
            var row = document.createElement("tr");
            row.innerHTML = `<td>${purfet[i].medicineName}</td>
              <td>${purfet[i].medicineCount}</td>
              <td>${purfet[i].medicinePrice}</td>
              <td>${purfet[i].expiaryDate.split("T")[0].split("-").reverse().join("/")}</td>
              <td><button onclick="Medicine('${purfet[i].medicineID}');">buy</button></td>`;
            table1.appendChild(row);
        }
    });
}
function Medicine(MedicineId) {
    currentmedicineID = MedicineId;
    var quantity = document.getElementById('quantity');
    quantity.style.display = "block";
}
function quantity() {
    buyMedicine();
}
function buyMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        let purfet = yield fetchMedicine();
        let order_Status = "orderd";
        for (var i = 0; i < purfet.length; i++) {
            if (purfet[i].medicineID == currentmedicineID) {
                if (purfet[i].medicinePrice <= CurrentUser.userBalance) {
                    var quantity = parseInt(document.getElementById('quantity1').value);
                    purfet[i].medicineCount -= Number(quantity);
                    var price = quantity * purfet[i].medicinePrice;
                    CurrentUser.userBalance -= price;
                    let orderPush = {
                        orderID: 0,
                        medicineName: purfet[i].medicineName,
                        medicineCount: purfet[i].medicineCount,
                        medicinePrice: purfet[i].medicinePrice,
                        orderStatus: order_Status
                    };
                    addOrder(orderPush);
                    UpdateUser(CurrentUser.userID, CurrentUser);
                    alert("Successfully pushed");
                }
                else {
                    alert("wrong id");
                }
            }
        }
    });
}
function cancel() {
    return __awaiter(this, void 0, void 0, function* () {
        var editShow = document.getElementById('edit');
        editShow.style.display = "none";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('balance1');
        balance.style.display = "none";
        var recharge1 = document.getElementById('recharge1');
        recharge1.style.display = "none";
        var purchase1 = document.getElementById('purchase1');
        purchase1.style.display = "none";
        var quantity = document.getElementById('quantity');
        quantity.style.display = "none";
        var medicine2 = document.getElementById('medicine1');
        medicine2.style.display = "none";
        var cancel1 = document.getElementById('cancel1');
        cancel1.style.display = "block";
        var ctable1 = document.getElementById('ctable1');
        ctable1.innerHTML = "";
        let fetcancel = yield fetchOrder();
        for (var i = 0; i < fetcancel.length; i++) {
            if (fetcancel[i].orderStatus == "orderd") {
                var row = document.createElement("tr");
                row.innerHTML = `<td>${fetcancel[i].medicineName}</td>
              <td>${fetcancel[i].medicineCount}</td>
              <td>${fetcancel[i].medicinePrice}</td>
              <td>${fetcancel[i].orderStatus}</td>
              <td><button id="btn" onclick="cancelorder('${fetcancel[i].orderID}');">Cancel</button></td>`;
                ctable1.appendChild(row);
            }
        }
    });
}
function orderhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        var editShow = document.getElementById('edit');
        editShow.style.display = "none";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('balance1');
        balance.style.display = "none";
        var recharge1 = document.getElementById('recharge1');
        recharge1.style.display = "none";
        var purchase1 = document.getElementById('purchase1');
        purchase1.style.display = "none";
        var quantity = document.getElementById('quantity');
        quantity.style.display = "none";
        var history1 = document.getElementById('history1');
        history1.style.display = "block";
        var cancel1 = document.getElementById('cancel1');
        cancel1.style.display = "none";
        var htable1 = document.getElementById('htable1');
        htable1.innerHTML = "";
        let fetOrder = yield fetchOrder();
        for (var i = 0; i < fetOrder.length; i++) {
            var row = document.createElement("tr");
            row.innerHTML = `<td>${fetOrder[i].medicineName}</td>
                <td>${fetOrder[i].medicineCount}</td>
                <td>${fetOrder[i].medicinePrice}</td>
                <td>${fetOrder[i].orderStatus}</td>`;
            htable1.appendChild(row);
        }
    });
}
function cancelorder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = 0;
        let fetOrder = yield fetchOrder();
        let fetMed = yield fetchMedicine();
        for (var i = 0; i < fetOrder.length; i++) {
            if (orderID == fetOrder[i].orderID) {
                if (fetOrder[i].orderStatus == "orderd") {
                    fetOrder[i].orderStatus = "Cancelled";
                    CurrentUser.userBalance += fetOrder[i].medicinePrice;
                    UpdateOrder(fetOrder[i].orderID, fetOrder[i]);
                    UpdateUser(CurrentUser.userID, CurrentUser);
                    flag++;
                }
            }
        }
        if (flag != 0) {
            alert("Amount added to user and Order status Changed");
        }
        /*
        if(flag !=0)
          {
            alert("amt added to user")
          }
          for(var i=0;i<fetOrder.length;i++)
            {
              for(var j=0;j<fetMed.length;j++)
                {
                  fetOrder[i].medicineName==fetMed[j].medicineName
                  {
                    fetMed[j].medicineCount+=fetOrder[i].medicineCount
                    UpdateMed(fetMed[j].medicineID,fetMed[j]);
                    flag1++;
                  }
                }
            }
            if(flag1 !=0)
              {
                alert("Medicine count added");
              }*/
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5029/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5029/api/MedicineInfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5029/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5029/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5029/api/MedicineInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5029/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function UpdateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5029/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function UpdateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5029/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function UpdateMed(id, med) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5029/api/MedicineInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(med)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function deleteMedicineDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5029/api/MedicineInfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        medicine();
    });
}
