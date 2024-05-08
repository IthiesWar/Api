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
let userAutoIncrement = 1000;
let UserID;
let CUser;
let Cname;
let ticketIncrement = 1000;
let ticketID;
let CticketID;
let orderID;
let orderAutoIncremet = 1000;
let price;
/*
let Userlist:Array<User> =new Array<User>();
Userlist.push(new User("harshad","harshad@gamil.com",0,"1","1"))
Userlist.push(new User("harshad","harshad@gamil.com",0,"1","1"))
let ticketlist:Array<Ticket> =new Array<Ticket>();
ticketlist.push(new Ticket("Annanagar","chepauk",50,10))
ticketlist.push(new Ticket("chepauk","annanagr",50,10))
let orderlist:Array<Order> =new Array<Order>();
orderlist.push(new Order("chepauk","annanagar",20,2))
*/
function signin() {
    let signin = document.getElementById('signin');
    let signup = document.getElementById('signup');
    signin.style.display = "block";
    signup.style.display = "none";
}
function signup() {
    let signin = document.getElementById('signin');
    let signup = document.getElementById('signup');
    signin.style.display = "none";
    signup.style.display = "block";
}
function subsignup() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let balance = document.getElementById('balance').value;
        let phone = document.getElementById('phone').value;
        let password = document.getElementById('password').value;
        let flag = 0;
        let SignupUser = {
            userID: 0,
            userName: name,
            userEmail: email,
            userBalance: Number(balance),
            userPhone: phone,
            userPassword: password
        };
        /*
        for(var i=0;i<signupfet.length;i++)
            {
                if(Userlist[i].UserEmail.toLocaleLowerCase()==email.toLocaleLowerCase())
                    {
                        flag=1
                    }
            }
            if(flag==0)
                {
                    Userlist.push(new user(name,email,0,phone,password))
                }
                else
                {
                    alert("User Already Exists")
                }*/
        addUser(SignupUser);
        alert("Successfully Signup");
    });
}
function subsignin() {
    return __awaiter(this, void 0, void 0, function* () {
        let email = document.getElementById('s-email').value;
        let passowrd = document.getElementById('s-password').value;
        let flag = 0;
        //  let signinfet:User[];
        // try{
        let signinfet = yield fetchUser();
        for (var i = 0; i < signinfet.length; i++) {
            if (email == signinfet[i].userEmail && passowrd == signinfet[i].userPassword) {
                flag = 1;
                Cname = signinfet[i].userName;
                CUser = signinfet[i];
            }
        }
        if (flag == 1) {
            var nav = document.getElementById('nav');
            nav.style.display = "block";
            home();
            var signin_up = document.getElementById('container');
            signin_up.style.display = "none";
        }
        // } catch(error){
        //     console.log(error);
        // }
    });
}
function home() {
    var home = document.getElementById('home1');
    home.style.display = "block";
    var nav = document.getElementById('nav');
    nav.style.display = "block";
    var signin_up = document.getElementById('container');
    signin_up.style.display = "none";
    var balancediv = document.getElementById('balancediv');
    balancediv.style.display = "none";
    var recharge = document.getElementById('Recharge');
    recharge.style.display = "";
    var ticket = document.getElementById('tickets');
    ticket.style.display = "none";
    var getquantity = document.getElementById('getquantity');
    getquantity.style.display = "none";
    var bookticket = document.getElementById('bookings');
    bookticket.style.display = "none";
    var history = document.getElementById('history');
    history.style.display = "none";
    home.innerHTML = "Hello " + CUser.userName;
}
function showbalance() {
    var home = document.getElementById('home1');
    home.style.display = "none";
    var nav = document.getElementById('nav');
    nav.style.display = "block";
    var signin_up = document.getElementById('container');
    signin_up.style.display = "none";
    var balancediv = document.getElementById('balancediv');
    balancediv.style.display = "block";
    var recharge = document.getElementById('Recharge');
    recharge.style.display = "none";
    var ticket = document.getElementById('tickets');
    ticket.style.display = "none";
    var getquantity = document.getElementById('getquantity');
    getquantity.style.display = "none";
    var history = document.getElementById('history');
    history.style.display = "none";
    var bookticket = document.getElementById('bookings');
    bookticket.style.display = "none";
    balancediv.innerHTML = CUser.userBalance + "";
}
function recharge() {
    var home = document.getElementById('home1');
    home.style.display = "none";
    var nav = document.getElementById('nav');
    nav.style.display = "block";
    var signin_up = document.getElementById('container');
    signin_up.style.display = "none";
    var balancediv = document.getElementById('balancediv');
    balancediv.style.display = "none";
    var recharge = document.getElementById('Recharge');
    recharge.style.display = "block";
    var ticket = document.getElementById('tickets');
    ticket.style.display = "none";
    var getquantity = document.getElementById('getquantity');
    getquantity.style.display = "none";
    var history = document.getElementById('history');
    history.style.display = "none";
    var bookticket = document.getElementById('bookings');
    bookticket.style.display = "none";
}
function topup() {
    let amt = parseInt(document.getElementById('amt').value);
    CUser.userBalance += amt;
    updateUser(CUser.userID, CUser);
}
//tickets
function tickets() {
    return __awaiter(this, void 0, void 0, function* () {
        var ticket = document.getElementById('tickets');
        ticket.style.display = "block";
        var home = document.getElementById('home1');
        home.style.display = "none";
        var nav = document.getElementById('nav');
        nav.style.display = "block";
        var signin_up = document.getElementById('container');
        signin_up.style.display = "none";
        var balancediv = document.getElementById('balancediv');
        balancediv.style.display = "none";
        var recharge = document.getElementById('Recharge');
        recharge.style.display = "none";
        var bookticket = document.getElementById('bookings');
        bookticket.style.display = "none";
        var getquantity = document.getElementById('getquantity');
        getquantity.style.display = "none";
        var history = document.getElementById('history');
        history.style.display = "none";
        var table = document.getElementById('table');
        table.innerHTML = "";
        var ticketapi = yield fetchTicket();
        for (var i = 0; i < ticketapi.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${ticketapi[i].fromLocation}</td>
                            <td>${ticketapi[i].toLocation}</td>
                            <td>${ticketapi[i].ticketPrice}</td>`;
            table.appendChild(row);
        }
    });
}
//booking
function booking() {
    return __awaiter(this, void 0, void 0, function* () {
        var bookticket = document.getElementById('bookings');
        bookticket.style.display = "block";
        var ticket = document.getElementById('tickets');
        ticket.style.display = "none";
        var home = document.getElementById('home1');
        home.style.display = "none";
        var nav = document.getElementById('nav');
        nav.style.display = "block";
        var signin_up = document.getElementById('container');
        signin_up.style.display = "none";
        var balancediv = document.getElementById('balancediv');
        balancediv.style.display = "none";
        var recharge = document.getElementById('Recharge');
        recharge.style.display = "none";
        var getquantity = document.getElementById('getquantity');
        getquantity.style.display = "none";
        var history = document.getElementById('history');
        history.style.display = "none";
        var Btable = document.getElementById('Btable');
        Btable.innerHTML = "";
        var ticketapi = yield fetchTicket();
        for (var i = 0; i < ticketapi.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${ticketapi[i].fromLocation}</td>
                            <td>${ticketapi[i].toLocation}</td>
                            <td>${ticketapi[i].ticketPrice}</td>
                           
                           <td> <button id="buy" onclick="buy('${ticketapi[i].ticketID}')">buy</button></td>`;
            Btable.appendChild(row);
        }
    });
}
function buy(TicketID) {
    CticketID = TicketID;
    var getquantity = document.getElementById('getquantity');
    getquantity.style.display = "block";
}
function getticket() {
    buyticket();
}
function buyticket() {
    return __awaiter(this, void 0, void 0, function* () {
        var ticketapi = yield fetchTicket();
        for (var i = 0; i < ticketapi.length; i++) {
            if (String(ticketapi[i].ticketID) == CticketID) {
                if (ticketapi[i].ticketPrice <= CUser.userBalance) {
                    var buytickets = document.getElementById('buytickets').value;
                    price = Number(buytickets) * ticketapi[i].ticketPrice;
                    CUser.userBalance -= price;
                    let historyorder = {
                        orderID: 0,
                        fromLocation: ticketapi[i].fromLocation,
                        toLocation: ticketapi[i].toLocation,
                        ticketPrice: price,
                        date: new Date()
                    };
                    addOrder(historyorder);
                    updateUser(CUser.userID, CUser);
                    alert("ticket buy");
                    break;
                }
                else {
                    alert("Infuffient Balance");
                }
            }
        }
    });
}
function historys() {
    return __awaiter(this, void 0, void 0, function* () {
        var history = document.getElementById('history');
        history.style.display = "block";
        var bookticket = document.getElementById('bookings');
        bookticket.style.display = "none";
        var ticket = document.getElementById('tickets');
        ticket.style.display = "none";
        var home = document.getElementById('home1');
        home.style.display = "none";
        var nav = document.getElementById('nav');
        nav.style.display = "block";
        var signin_up = document.getElementById('container');
        signin_up.style.display = "none";
        var balancediv = document.getElementById('balancediv');
        balancediv.style.display = "none";
        var recharge = document.getElementById('Recharge');
        recharge.style.display = "none";
        var getquantity = document.getElementById('getquantity');
        getquantity.style.display = "none";
        var orderStrore = yield fetchOrder();
        var htable = document.getElementById('htable');
        htable.innerHTML = "";
        for (var i = 0; i < orderStrore.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${orderStrore[i].fromLocation}</td>
            <td>${orderStrore[i].toLocation}</td>
            <td>${orderStrore[i].ticketPrice}</td>
            <td>${orderStrore[i].date.split("T")[0].split("-").reverse().join("/")}</td>
            `;
            htable.appendChild(row);
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5160/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5160/api/Ticket';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5160/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5160/api/User', {
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
function addTicket(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5160/api/Ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5160/api/Order', {
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
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5160/api/User/${id}`, {
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
