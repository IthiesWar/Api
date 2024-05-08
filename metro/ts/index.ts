let userAutoIncrement=1000
let UserID:number
let CUser:User
let Cname:string
let ticketIncrement=1000;
let ticketID:number
let CticketID:string
let orderID:number
let orderAutoIncremet=1000;
let price:number
interface User
{
    userID:number;
    userName:string;
    userEmail:string;
    userBalance:number;
    userPhone:string;
    userPassword:string;
    /*
    constructor (userName:string,userEmail:string,userBalance:number,userPhone:string,userPassword:string)
    {
        UserAutoIncrement++
        this.UserId="U"+UserAutoIncrement.toString();
        this.UserName=userName;
        this.UserEmail=userEmail;
        this.UserBalance=userBalance;
        this.UserPhone=userPhone;
        this.UserPassword=userPassword
    }*/
}
interface Ticket
{
    ticketID:number;
    fromLocation:string;
    toLocation:string;
    ticketPrice:number;
   
    /*
    constructor(fromLocation:string,toLocation:string,ticketprice:number,ticketQuantity:number)
    {
        ticketIncrement++;
        this.TicketID="t"+ticketIncrement.toString()
        this.FromLocation=fromLocation
        this.ToLocation=toLocation
        this.TicketPrice=ticketprice
        this.Ticketquantity=ticketQuantity
    }*/
}
interface Order
{
    orderID:number
    fromLocation:string
    toLocation:string
    ticketPrice:number
    date:any
  //  Date1:string
    /*
    constructor(fromLocation:string,toLocation:string,ticketPrice:number,quantity:number)
    {
        this.FromLocation=fromLocation
        this.ToLocation=toLocation
        this.TicketPrice=ticketPrice
        this.Quantity=quantity
    }*/
}
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
function signin()
{
    let signin=document.getElementById('signin') as HTMLDivElement
    let signup=document.getElementById('signup') as HTMLDivElement
    signin.style.display="block"
    signup.style.display="none"
}
function signup()
{
    let signin=document.getElementById('signin') as HTMLDivElement
    let signup=document.getElementById('signup') as HTMLDivElement
    
    signin.style.display="none"
    signup.style.display="block"
}
async function subsignup()
{
    let name=(document.getElementById('name') as HTMLInputElement).value
    let email=(document.getElementById('email') as HTMLInputElement).value
    let balance=(document.getElementById('balance') as HTMLInputElement).value
    let phone=(document.getElementById('phone') as HTMLInputElement).value
    let password=(document.getElementById('password') as HTMLInputElement).value
    let flag=0
    let SignupUser:User={
        userID:0,
        userName:name,
        userEmail:email,
        userBalance:Number(balance),
        userPhone:phone,
        userPassword:password
    }
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
            alert("Successfully Signup")
            
}
async function subsignin()
{
    let email=(document.getElementById('s-email') as HTMLInputElement).value
    let passowrd=(document.getElementById('s-password') as HTMLInputElement).value
    let flag=0
  //  let signinfet:User[];
   // try{
        let signinfet=await fetchUser();
        for(var i=0;i<signinfet.length;i++)
            {
                if(email==signinfet[i].userEmail && passowrd==signinfet[i].userPassword)
                    {
                        flag=1
                        Cname=signinfet[i].userName
                        CUser=signinfet[i]
                    }
            }
            if(flag==1)
                {
                    var nav=document.getElementById('nav') as HTMLDivElement
                    nav.style.display="block"
                    home()
                    var signin_up=document.getElementById('container') as HTMLDivElement
                    signin_up.style.display="none"
                }
   // } catch(error){
   //     console.log(error);
   // }
    
   
}
function home()
{
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="block"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="none"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display=""
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="none"
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="none"

  
                
    home.innerHTML="Hello "+CUser.userName
              
         
}
function showbalance()
{
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="none"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="block"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display="none"
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="none"
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="none"
    
    balancediv.innerHTML=CUser.userBalance+""
}
function recharge()
{
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="none"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="none"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display="block"
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="none"
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="none"
}
function topup()
{ let amt:number =parseInt((document.getElementById('amt') as HTMLInputElement).value)

   
    CUser.userBalance+=amt;
    updateUser(CUser.userID,CUser);


}

//tickets
async function tickets()
{
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="block"
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="none"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="none"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display="none"
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="none"
    var table=document.getElementById('table') as HTMLTableElement
    table.innerHTML=""
    var ticketapi=await fetchTicket()
       
    for(var i=0;i<ticketapi.length;i++)
        {
            var row=document.createElement('tr')
            row.innerHTML=`<td>${ticketapi[i].fromLocation}</td>
                            <td>${ticketapi[i].toLocation}</td>
                            <td>${ticketapi[i].ticketPrice}</td>`
                        table.appendChild(row)
        }
}
//booking
async function booking()
{
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="block"
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="none"
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="none"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="none"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="none"
    var Btable=document.getElementById('Btable') as HTMLTableElement
    Btable.innerHTML=""
    var ticketapi=await fetchTicket()
    
    for(var i=0;i<ticketapi.length;i++)
        {
            var row=document.createElement('tr')
            row.innerHTML=`<td>${ticketapi[i].fromLocation}</td>
                            <td>${ticketapi[i].toLocation}</td>
                            <td>${ticketapi[i].ticketPrice}</td>
                           
                           <td> <button id="buy" onclick="buy('${ticketapi[i].ticketID}')">buy</button></td>`
                        Btable.appendChild(row)
        }
}
function buy(TicketID:any)
{
    CticketID=TicketID
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="block"
}
function getticket()
{
    buyticket()
}
async function buyticket()
{
    var ticketapi=await fetchTicket()
    for(var i=0;i<ticketapi.length;i++)
        {
            if(String(ticketapi[i].ticketID)==CticketID)
                {
    
                    if(ticketapi[i].ticketPrice<=CUser.userBalance)
                        {
                        var buytickets=(document.getElementById('buytickets') as HTMLInputElement).value
                     price=Number(buytickets)*ticketapi[i].ticketPrice
                     CUser.userBalance-=price;
                   let historyorder:Order={
                    orderID:0,
                    fromLocation:ticketapi[i].fromLocation,
                    toLocation:ticketapi[i].toLocation,
                    ticketPrice:price,
                    date:new Date()
                   }
                   addOrder(historyorder)
                   updateUser(CUser.userID,CUser)
                    alert("ticket buy")
                    break
                        }
                        else
                        {
                            alert("Infuffient Balance")
                        }
                       
                }
                
        }
        
}

async function historys()
{
    var history=document.getElementById('history') as HTMLDivElement
    history.style.display="block"
    var bookticket=document.getElementById('bookings') as HTMLDivElement
    bookticket.style.display="none"
    var ticket=document.getElementById('tickets') as HTMLDivElement
    ticket.style.display="none"
    var home=document.getElementById('home1') as HTMLDivElement
    home.style.display="none"
    var nav=document.getElementById('nav') as HTMLDivElement
    nav.style.display="block"
    var signin_up=document.getElementById('container') as HTMLDivElement
    signin_up.style.display="none"
    var balancediv=document.getElementById('balancediv') as HTMLDivElement
    balancediv.style.display="none"
    var recharge=document.getElementById('Recharge') as HTMLDivElement
    recharge.style.display="none"
    var getquantity=document.getElementById('getquantity') as HTMLDivElement
    getquantity.style.display="none"
    
    var orderStrore=await fetchOrder();
    var htable=document.getElementById('htable') as HTMLTableElement
    htable.innerHTML=""
    for(var i=0;i<orderStrore.length;i++)
        {
            var row=document.createElement('tr')
            row.innerHTML=`<td>${orderStrore[i].fromLocation}</td>
            <td>${orderStrore[i].toLocation}</td>
            <td>${orderStrore[i].ticketPrice}</td>
            <td>${orderStrore[i].date.split("T")[0].split("-").reverse().join("/")}</td>
            `
            htable.appendChild(row)
        }
}
async function fetchUser(): Promise<User[]>
{
    const apiUrl = 'http://localhost:5160/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchTicket(): Promise<Ticket[]>
{
    const apiUrl = 'http://localhost:5160/api/Ticket';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchOrder(): Promise<Order[]>
{
    const apiUrl = 'http://localhost:5160/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function addUser(user: User): Promise<void>
 {
    const response = await fetch('http://localhost:5160/api/User', {
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
  async function addTicket(ticket: Ticket): Promise<void> {
    const response = await fetch('http://localhost:5160/api/Ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
  }
  async function addOrder(order: Order): Promise<void> {
    const response = await fetch('http://localhost:5160/api/Order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
  }
  
  async function updateUser(id: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5160/api/User/${id}`, {
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