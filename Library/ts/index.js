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
let CurrentUser;
function signup() {
    var signin_page = document.getElementById('signin');
    signin_page.style.display = "none";
    var signup_page = document.getElementById('signup');
    signup_page.style.display = "block";
}
function signin() {
    var signup_page = document.getElementById('signup');
    signup_page.style.display = "none";
    var signin_page = document.getElementById('signin');
    signin_page.style.display = "block";
}
function sign_up() {
    return __awaiter(this, void 0, void 0, function* () {
        var uname = document.getElementById('name').value;
        var ugender = document.getElementById('gender').value;
        var udepartment = document.getElementById('department').value;
        var uphone = document.getElementById('phone').value;
        var umail = document.getElementById('mail').value;
        var ubalance = parseInt(document.getElementById('balance').value);
        var upassword = document.getElementById('password').value;
        var userSignup = {
            userID: undefined,
            userName: uname,
            gender: ugender,
            departMent: udepartment,
            phone: uphone,
            mailID: umail,
            balance: ubalance,
            password: upassword
        };
        addUser(userSignup);
        alert("signup success");
    });
}
function sign_in() {
    return __awaiter(this, void 0, void 0, function* () {
        var semail1 = document.getElementById('email1').value;
        var spassword1 = document.getElementById('password1').value;
        var signinUser = yield fetchUser();
        var flag = 0;
        for (var i = 0; i < signinUser.length; i++) {
            if (semail1 == signinUser[i].mailID) {
                CurrentUser = signinUser[i];
                flag++;
            }
        }
        if (flag != 0) {
            var container = document.getElementById('container');
            container.style.display = "none";
            var nav = document.getElementById('nav');
            nav.style.display = "block";
            home();
        }
    });
}
function home() {
    var home = document.getElementById('home');
    home.style.display = "block";
    var balance = document.getElementById('C_balance');
    balance.style.display = "none";
    home.innerHTML = "Hello" + CurrentUser.userName;
    var recharge = document.getElementById('recharge');
    recharge.style.display = "none";
    var B_history = document.getElementById('B_history');
    B_history.style.display = "none";
    var Borrow_book = document.getElementById('Borrow_book');
    Borrow_book.style.display = "none";
}
function balance() {
    var home = document.getElementById('home');
    home.style.display = "none";
    var balance = document.getElementById('C_balance');
    balance.style.display = "block";
    balance.innerHTML = "Balance " + CurrentUser.balance;
    var recharge = document.getElementById('recharge');
    recharge.style.display = "none";
    var B_history = document.getElementById('B_history');
    B_history.style.display = "none";
    var Borrow_book = document.getElementById('Borrow_book');
    Borrow_book.style.display = "none";
}
function recharge() {
    var home = document.getElementById('home');
    home.style.display = "none";
    var balance = document.getElementById('C_balance');
    balance.style.display = "none";
    var recharge = document.getElementById('recharge');
    recharge.style.display = "block";
    var B_history = document.getElementById('B_history');
    B_history.style.display = "none";
    var Borrow_book = document.getElementById('Borrow_book');
    Borrow_book.style.display = "none";
}
function recharge_amount() {
    var recharge_amt = parseInt(document.getElementById('recharge_amt').value);
    CurrentUser.balance += recharge_amt;
    updateUser(CurrentUser.userID, CurrentUser);
    alert("Recharge Successfully");
}
function Borrow_history() {
    return __awaiter(this, void 0, void 0, function* () {
        var B_history = document.getElementById('B_history');
        B_history.style.display = "block";
        var B_table1 = document.getElementById('B_table1');
        B_table1.innerHTML = "";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('C_balance');
        balance.style.display = "none";
        var recharge = document.getElementById('recharge');
        recharge.style.display = "none";
        var Borrow_book = document.getElementById('Borrow_book');
        Borrow_book.style.display = "none";
        var fetHistory = yield fetchBorrow();
        for (var i = 0; i < fetHistory.length; i++) {
            var row = document.createElement("tr");
            row.innerHTML = `
      <td >${fetHistory[i].bookID}</td>
              <td >${fetHistory[i].userID}</td>
              <td >${fetHistory[i].borrowedDate}</td>
              <td >${fetHistory[i].borrowBookCount}</td>
              <td>${fetHistory[i].paidFine}</td>
              <td>${fetHistory[i].status}</td>
             `;
            B_table1.appendChild(row);
        }
    });
}
function borrow() {
    return __awaiter(this, void 0, void 0, function* () {
        var Borrow_book = document.getElementById('Borrow_book');
        Borrow_book.style.display = "block";
        var Borrow_table1 = document.getElementById('Borrow_table1');
        Borrow_table1.innerHTML = "";
        var B_history = document.getElementById('B_history');
        B_history.style.display = "none";
        var B_table1 = document.getElementById('B_table1');
        B_table1.innerHTML = "";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('C_balance');
        balance.style.display = "none";
        var recharge = document.getElementById('recharge');
        recharge.style.display = "none";
        var fetBook = yield fetchBook();
        for (var i = 0; i < fetBook.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${fetBook[i].bookID}</td>
      <td>${fetBook[i].bookName}</td>
      <td>${fetBook[i].authorName}</td>
      <td>${fetBook[i].bookCount}</td>`;
            Borrow_table1.appendChild(row);
        }
    });
}
function bookid_check() {
    return __awaiter(this, void 0, void 0, function* () {
        var book_id = parseInt(document.getElementById('book_id').value);
        var fetBook = yield fetchBook();
        var flag = 0;
        for (var i = 0; i < fetBook.length; i++) {
            if (fetBook[i].bookID == book_id) {
                flag++;
            }
        }
        if (flag != 0) {
            var b_count = document.getElementById('b_count');
            b_count.style.display = "block";
        }
    });
}
function book_count() {
    return __awaiter(this, void 0, void 0, function* () {
        var book_count = parseInt(document.getElementById('book_count').value);
        var fetBook = yield fetchBook();
        var fetborrow = yield fetchBorrow();
        var flag = 0;
        var flag1 = 0;
        var flag2 = 0;
        for (var i = 0; i < fetBook.length; i++) {
            if (fetBook[i].bookCount > book_count) {
                flag++;
                var b_count = document.getElementById('b_count');
                b_count.style.display = "block";
            }
            for (var j = 0; j < fetborrow.length; j++) {
                if (fetborrow[j].userID == CurrentUser.userID) {
                    if (fetborrow[j].borrowBookCount <= 3) {
                        flag1++;
                        let book_buy = {
                            borrowkID: 0,
                            bookID: fetBook[i].bookID,
                            userID: CurrentUser.userID,
                            borrowedDate: new Date(),
                            borrowBookCount: book_count,
                            paidFine: 0,
                            status: "booked"
                        };
                        addBorrow(book_buy);
                        alert("booked");
                        break;
                    }
                }
                else {
                    let book_buy = {
                        borrowkID: 0,
                        bookID: fetBook[i].bookID,
                        userID: CurrentUser.userID,
                        borrowedDate: new Date(),
                        borrowBookCount: book_count,
                        paidFine: 0,
                        status: "booked"
                    };
                    addBorrow(book_buy);
                    alert("bboked");
                    break;
                }
            }
        }
        /*
        if(flag != 0)
          {
              var b_count=document.getElementById('b_count') as HTMLDivElement
              b_count.style.display="block"
          }*/
    });
}
function return_book() {
    return __awaiter(this, void 0, void 0, function* () {
        var B_history = document.getElementById('B_history');
        B_history.style.display = "none";
        var home = document.getElementById('home');
        home.style.display = "none";
        var balance = document.getElementById('C_balance');
        balance.style.display = "none";
        var recharge = document.getElementById('recharge');
        recharge.style.display = "none";
        var Borrow_book = document.getElementById('Borrow_book');
        Borrow_book.style.display = "none";
        var return_book = document.getElementById('return_book');
        return_book.style.display = "block";
        var fetHistory = yield fetchBorrow();
        var R_table1 = document.getElementById('r_table1');
        R_table1.innerHTML = "";
        var return_book = document.getElementById('return_book');
        return_book.style.display = "block";
        for (var i = 0; i < fetHistory.length; i++) {
            var row = document.createElement("tr");
            row.innerHTML = `
      <td >${fetHistory[i].bookID}</td>
              <td >${fetHistory[i].userID}</td>
              <td >${fetHistory[i].borrowedDate}</td>
              <td >${fetHistory[i].borrowBookCount}</td>
              <td>${fetHistory[i].paidFine}</td>
              <td>${fetHistory[i].status}</td>
              <td><button onclick="rets(${fetHistory[i].bookID});">return</button></td>
             `;
            R_table1.appendChild(row);
        }
    });
}
let retID;
function rets(bookID) {
    retID = bookID;
    var returns = document.getElementById('return');
    returns.style.display = "block";
    var B_history = document.getElementById('B_history');
    B_history.style.display = "none";
    var home = document.getElementById('home');
    home.style.display = "none";
    var balance = document.getElementById('C_balance');
    balance.style.display = "none";
    var recharge = document.getElementById('recharge');
    recharge.style.display = "none";
    var Borrow_book = document.getElementById('Borrow_book');
    Borrow_book.style.display = "none";
    var return_book = document.getElementById('return_book');
    return_book.style.display = "block";
    var R_table1 = document.getElementById('r_table1');
    R_table1.innerHTML = "";
}
function editing() {
    return __awaiter(this, void 0, void 0, function* () {
        var rborrowkid = parseInt(document.getElementById('rborrowkid').value);
        var rbookid = parseInt(document.getElementById('rbookid').value);
        var ruserid = parseInt(document.getElementById('ruserid').value);
        var rdate = document.getElementById('rdate').value;
        var rcount = parseInt(document.getElementById('rcount').value);
        var rfine = parseInt(document.getElementById('rfine').value);
        var rstatus = document.getElementById('rstatus').value;
        var fetBorrow = yield fetchBorrow();
        for (var i = 0; i < fetBorrow.length; i++) {
            if (fetBorrow[i].bookID == retID) {
                let fetret = {
                    borrowkID: rborrowkid,
                    bookID: rbookid,
                    userID: ruserid,
                    borrowedDate: new Date(),
                    borrowBookCount: rcount,
                    paidFine: rfine,
                    status: "returned"
                };
                UpdateBorrow(retID, fetret);
                alert("returned");
            }
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5076/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5076/api/Book';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5076/api/Borrow';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5076/api/User', {
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
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5076/api/Borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5076/api/Book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5076/api/User/${id}`, {
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
function UpdateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5076/api/Book/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function UpdateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5076/api/Borrow/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function deleteBorrow(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5076/api/Borrow/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        //medicine();
    });
}
