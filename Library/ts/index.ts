let CurrentUser:User
interface User
{
    userID:any
    userName:string
    gender:string
    departMent:string
    phone:string
    mailID:string
    balance:number
    password:string
}
interface Book
{
    bookID:number
    bookName:string
    authorName:string
    bookCount:number
}
interface Borrow
{

borrowkID:number
bookID:number
userID:number
borrowedDate:Date
borrowBookCount:number
paidFine:number
status:string
}
function signup()
{
    var signin_page=document.getElementById('signin') as HTMLDivElement
    signin_page.style.display="none"
    var signup_page=document.getElementById('signup') as HTMLDivElement
    signup_page.style.display="block"
}
function signin()
{
    var signup_page=document.getElementById('signup') as HTMLDivElement
    signup_page.style.display="none"
    var signin_page=document.getElementById('signin') as HTMLDivElement
    signin_page.style.display="block"
}
async function sign_up()
{
    var uname=(document.getElementById('name') as HTMLInputElement).value
    var ugender=(document.getElementById('gender') as HTMLInputElement).value
    var udepartment=(document.getElementById('department') as HTMLInputElement).value
    var uphone=(document.getElementById('phone') as HTMLInputElement).value
    var umail=(document.getElementById('mail') as HTMLInputElement).value
    var ubalance=parseInt((document.getElementById('balance') as HTMLInputElement).value)
    var upassword=(document.getElementById('password') as HTMLInputElement).value
    var userSignup:User=
    {
      userID:undefined,
      userName:uname,
      gender:ugender,
      departMent:udepartment,
      phone:uphone,
      mailID:umail,
      balance:ubalance,
      password:upassword
    }
    addUser(userSignup)
    alert("signup success")
}
async function sign_in()
{
  var semail1=(document.getElementById('email1') as HTMLInputElement).value
  var spassword1=(document.getElementById('password1') as HTMLInputElement).value
  var signinUser=await fetchUser()
  var flag=0
  for(var i=0;i<signinUser.length;i++)
    {
      if(semail1==signinUser[i].mailID)
        {
          
          CurrentUser=signinUser[i]
          flag++
        }
    }
    if(flag != 0)
      {
       
        var container=document.getElementById('container') as HTMLDivElement
        container.style.display="none"
        var nav=document.getElementById('nav') as HTMLDivElement
        nav.style.display="block"
        home()
      }
}
function home()
{
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="block"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  home.innerHTML="Hello"+CurrentUser.userName
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
}
function balance()
{
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="block"
  balance.innerHTML="Balance "+CurrentUser.balance
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
}
function recharge()
{
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="block"
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
}
function recharge_amount()
{
var recharge_amt=parseInt((document.getElementById('recharge_amt') as HTMLInputElement).value)
  CurrentUser.balance+=recharge_amt
  updateUser(CurrentUser.userID,CurrentUser)
  alert("Recharge Successfully")
}
async function Borrow_history()
{
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="block"
  var B_table1=document.getElementById('B_table1') as HTMLTableElement
  B_table1.innerHTML=""
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
  var fetHistory=await fetchBorrow()
 
  for(var i=0;i<fetHistory.length;i++)
    {
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
}
async function borrow()
{
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="block"
  var Borrow_table1=document.getElementById('Borrow_table1') as HTMLTableElement
  Borrow_table1.innerHTML=""
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var B_table1=document.getElementById('B_table1') as HTMLTableElement
  B_table1.innerHTML=""
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var fetBook=await fetchBook()
  for(var i=0;i<fetBook.length;i++)
    {
      var row=document.createElement('tr')
      row.innerHTML=`<td>${fetBook[i].bookID}</td>
      <td>${fetBook[i].bookName}</td>
      <td>${fetBook[i].authorName}</td>
      <td>${fetBook[i].bookCount}</td>`;
      Borrow_table1.appendChild(row)
    }
  
   

}

async function bookid_check()
  {
    var book_id=parseInt((document.getElementById('book_id') as HTMLInputElement).value)
    var fetBook=await fetchBook()
    var flag=0
    for(var i=0;i<fetBook.length;i++)
      {
        if(fetBook[i].bookID==book_id)
          {
            flag++
          }
      }
      if(flag != 0)
        {
          var b_count=document.getElementById('b_count') as HTMLDivElement
          b_count.style.display="block"
        }
  }
  async function book_count()
  {
    var book_count=parseInt((document.getElementById('book_count') as HTMLInputElement).value)
    var fetBook=await fetchBook()
    var fetborrow=await fetchBorrow()
    var flag=0
    var flag1=0
    var flag2=0
    for(var i=0;i<fetBook.length;i++)
      {
        if(fetBook[i].bookCount>book_count)
          {
            flag++
            var b_count=document.getElementById('b_count') as HTMLDivElement
              b_count.style.display="block"
          }
        for(var j =0;j<fetborrow.length;j++)
          {
            if(fetborrow[j].userID==CurrentUser.userID)
              {
                if(fetborrow[j].borrowBookCount<=3)
                  {
                    flag1++;
                    let book_buy:Borrow=
                    {
                      borrowkID:0,
                      bookID:fetBook[i].bookID,
                      userID:CurrentUser.userID,
                      borrowedDate:new Date(),
                      borrowBookCount:book_count,
                      paidFine:0,
                      status:"booked"
                    }
                    addBorrow(book_buy)
                    alert("booked")
                    break
                  }
                  
              }
              else
              {
                let book_buy:Borrow=
                    {
                      borrowkID:0,
                      bookID:fetBook[i].bookID,
                      userID:CurrentUser.userID,
                      borrowedDate:new Date(),
                      borrowBookCount:book_count,
                      paidFine:0,
                      status:"booked"
                    }
                    addBorrow(book_buy)
                    alert("bboked");
                    break
              }
              
          }
        }
        /*
        if(flag != 0)
          {
              var b_count=document.getElementById('b_count') as HTMLDivElement
              b_count.style.display="block"
          }*/
  }
 async function return_book()
 {
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
  var return_book=document.getElementById('return_book') as HTMLDivElement
  return_book.style.display="block"
  var fetHistory=await fetchBorrow()
  var R_table1=document.getElementById('r_table1') as HTMLTableElement
  R_table1.innerHTML=""
  var return_book=document.getElementById('return_book') as HTMLDivElement
  return_book.style.display="block"
  for(var i=0;i<fetHistory.length;i++)
    {
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
 }
 let retID:number;
 function rets(bookID:number)
 {
  retID=bookID
  var returns=document.getElementById('return') as HTMLDivElement
  returns.style.display="block"
  var B_history=document.getElementById('B_history') as HTMLDivElement
  B_history.style.display="none"
  var home=document.getElementById('home') as HTMLDivElement
  home.style.display="none"
  var balance=document.getElementById('C_balance') as HTMLDivElement
  balance.style.display="none"
  var recharge=document.getElementById('recharge') as HTMLDivElement
  recharge.style.display="none"
  var Borrow_book=document.getElementById('Borrow_book') as HTMLDivElement
  Borrow_book.style.display="none"
  var return_book=document.getElementById('return_book') as HTMLDivElement
  return_book.style.display="block"
  var R_table1=document.getElementById('r_table1') as HTMLTableElement
  R_table1.innerHTML=""
 }
 async function editing()
 {
  var rborrowkid=parseInt((document.getElementById('rborrowkid')as HTMLInputElement).value)
  var rbookid =parseInt((document.getElementById('rbookid')as HTMLInputElement).value)
  var ruserid=parseInt((document.getElementById('ruserid') as HTMLInputElement).value)
  var rdate=(document.getElementById('rdate')as HTMLInputElement).value
  var rcount=parseInt((document.getElementById('rcount')as HTMLInputElement).value)
  var rfine=parseInt((document.getElementById('rfine')as HTMLInputElement).value)
  var rstatus=(document.getElementById('rstatus')as HTMLInputElement).value
  var fetBorrow=await fetchBorrow()
  for(var i=0;i<fetBorrow.length;i++)
    {
      if(fetBorrow[i].bookID==retID)
        {
          let fetret:Borrow=
          {
            borrowkID:rborrowkid,
            bookID:rbookid,
            userID:ruserid,
            borrowedDate:new Date(),
            borrowBookCount:rcount,
            paidFine:rfine,
            status:"returned"
          }
          UpdateBorrow(retID,fetret)
          alert("returned");
        }
    }
 }
async function fetchUser(): Promise<User[]>
{
    const apiUrl = 'http://localhost:5076/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchBook(): Promise<Book[]>
{
    const apiUrl = 'http://localhost:5076/api/Book';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchBorrow(): Promise<Borrow[]>
{
    const apiUrl = 'http://localhost:5076/api/Borrow';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function addUser(user: User): Promise<void>
 {
    const response = await fetch('http://localhost:5076/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
 }
 async function addBorrow(borrow: Borrow): Promise<void>
 {
    const response = await fetch('http://localhost:5076/api/Borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(borrow)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
 }
 async function addBook(book: Book): Promise<void>
 {
    const response = await fetch('http://localhost:5076/api/Book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
 }
 async function updateUser(id: any, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5076/api/User/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  async function UpdateBook(id: number, book: Book): Promise<void> {
    const response = await fetch(`http://localhost:5076/api/Book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  async function UpdateBorrow(id: number, borrow: Borrow): Promise<void> {
    const response = await fetch(`http://localhost:5076/api/Borrow/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(borrow)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  async function deleteBorrow(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5076/api/Borrow/${id}`,
        {
            method: 'DELETE'
        });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    //medicine();

}