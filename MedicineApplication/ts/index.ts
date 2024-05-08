let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserID: any;
let CurrentUser:User;
let CurrentMed:MedicineInfo;
let CurrentOrder:Order;
let CurrentUserName: string;
let currentmedicineID:number;
let OrderId:any;
interface User {

    userID: any;
    userName: string;
    userEmail: string;
    userPhone: string;
    userPassword: string;
    userBalance:number


}
interface MedicineInfo {

    medicineID: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    expiaryDate:string;
    
      }

interface Order {
    orderID: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice:number;
    orderStatus:string

  
}
function signup() {
    var c = document.getElementById('signup') as HTMLDivElement
    var d = document.getElementById('signin') as HTMLDivElement

    c.style.display = "block"
    d.style.display = "none"
}
function signin() {

    var c = document.getElementById('signup') as HTMLDivElement
    var d = document.getElementById('signin') as HTMLDivElement
    c.style.display = "none"
    d.style.display = "block"
}
async function subsignin(event:any) {
    event.preventDefault();
    var email = document.getElementById('email1') as HTMLInputElement
    var password = document.getElementById('password1') as HTMLInputElement
    var flag=0;
    let fetchsignin=await fetchUser()
    
    for (var i = 0; i < fetchsignin.length; i++) {
       if (email.value == fetchsignin[i].userEmail) {
            var a = document.getElementById('in') as HTMLButtonElement
            var b = document.getElementById('up') as HTMLButtonElement
            var c = document.getElementById('signup') as HTMLDivElement
            var d = document.getElementById('signin') as HTMLDivElement
            var e=document.getElementById('ul') as HTMLDivElement
            var f=document.getElementById('wrapper') as HTMLDivElement
            d.style.display = "none"
            f.style.display="none"
            e.style.display='block';
            CurrentUserID=fetchsignin[i].userID
            CurrentUser=fetchsignin[i];
            flag=1
            home();
       }
    }
    
    if(flag==0)
        {
            alert("not exit")
        }      
}
async function subsignup(event:any) {
    event.preventDefault();
    var name1=(document.getElementById('name') as HTMLInputElement).value
    var email1 =(document.getElementById('email') as HTMLInputElement).value
    var phone1=(document.getElementById('phone') as HTMLInputElement).value
    var password1=(document.getElementById('password') as HTMLInputElement).value
    var balance1=parseInt((document.getElementById('balance') as HTMLInputElement).value)
    var flag=0;
    var signupUser:User={
        userID:undefined,
        userName:name1,
        userEmail:email1,
        userBalance:balance1,
        userPhone:phone1,
        userPassword:password1
    }
    addUser(signupUser)
    alert("Successfully Signup")
}
function home()
{
    var home=document.getElementById('home') as HTMLParagraphElement
  
        home.innerHTML="Hello "+CurrentUser.userName
}
function showbalance()
{
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
    var purchase1=document.getElementById('purchase1') as HTMLDivElement
    purchase1.style.display="none";
    var home=document.getElementById('home') as HTMLParagraphElement
    var balance=document.getElementById('balance1') as HTMLParagraphElement
    balance.innerHTML=""
    var recharge1=document.getElementById('recharge1') as HTMLDivElement
    recharge1.style.display="none"
    var history1=document.getElementById('history1') as HTMLDivElement;
    history1.style.display="none";
                    balance.innerHTML+="balance "+CurrentUser.userBalance
                    var cancel1=document.getElementById('cancel1') as HTMLDivElement;
                    cancel1.style.display="none"             
                
    
                balance.style.display="block"
            
            home.style.display="none"
            var medicineid=document.getElementById('medicineid') as HTMLDivElement
    medicineid.style.display="none"
   
}
function recharges()
{
   
    var home=document.getElementById('home') as HTMLParagraphElement
    home.style.display="none"
    var inputrecharge=(document.getElementById('inputrecharge') as HTMLInputElement).value
    var medicineid=document.getElementById('medicineid') as HTMLDivElement
    medicineid.style.display="none"
   
           
                    CurrentUser.userBalance+=Number(inputrecharge)
                    UpdateUser(CurrentUser.userID,CurrentUser)
             
}
function recharge()
{
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
    var medicine2 = document.getElementById('medicine1') as HTMLDivElement;
    medicine2.style.display="none"
    var purchase1=document.getElementById('purchase1') as HTMLDivElement
    purchase1.style.display="none";
    var recharge1=document.getElementById('recharge1') as HTMLDivElement
    recharge1.style.display="block"
    var balance=document.getElementById('balance1') as HTMLParagraphElement
    balance.style.display="none"
    var history1=document.getElementById('history1') as HTMLDivElement;
    history1.style.display="none";
    var cancel1=document.getElementById('cancel1') as HTMLDivElement;
    cancel1.style.display="none"
   
}
async function medicine()
{
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
    var recharge1=document.getElementById('recharge1') as HTMLDivElement
    recharge1.style.display="none"
    var cancel1=document.getElementById('cancel1') as HTMLDivElement;
    cancel1.style.display="none"
    var balance=document.getElementById('balance1') as HTMLParagraphElement
    balance.style.display="none"
    var home=document.getElementById('home') as HTMLParagraphElement
    home.style.display="none"
    var medicine2 = document.getElementById('medicine1') as HTMLDivElement;
    medicine2.style.display="block"
    var history1=document.getElementById('history1') as HTMLDivElement;
    history1.style.display="none";
    var med1 = document.getElementById("med1") as HTMLTableElement;
    med1.innerHTML = "";
    var purchase1=document.getElementById('purchase1') as HTMLDivElement
    purchase1.style.display="none";
  let fetMed=await fetchMedicine();
    for (var i = 0; i < fetMed.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = `<td >${fetMed[i].medicineName}</td>
                <td id="medcount">${fetMed[i].medicineCount}</td>
                <td id="medprice">${fetMed[i].medicinePrice}</td>
                <td id="meddate">${fetMed[i].expiaryDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td><button onclick="edithistory(${fetMed[i].medicineID});">edit</button></td>
                <td><button onclick="deletemed(${fetMed[i].medicineID});">delete</button></td>`;
               
        med1.appendChild(row);
        
       
    }
}
let medID:number
function edithistory(medicineID:number)
{
  medID=medicineID
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="block"
  var home=document.getElementById('home') as HTMLParagraphElement
    home.style.display="none"
    var balance=document.getElementById('balance1') as HTMLParagraphElement
    balance.style.display="none"
    var recharge1=document.getElementById('recharge1') as HTMLDivElement
    recharge1.style.display="none"
    var purchase1=document.getElementById('purchase1') as HTMLDivElement
    purchase1.style.display="none";
    var quantity=document.getElementById('quantity') as HTMLDivElement
    quantity.style.display="none"
    var history1=document.getElementById('history1') as HTMLDivElement;
    history1.style.display="none";
    var cancel1=document.getElementById('cancel1') as HTMLDivElement;
    cancel1.style.display="none"
    var htable1=document.getElementById('htable1') as HTMLTableElement;
}
async function editing()
{
  var ename=(document.getElementById('ename') as HTMLInputElement).value
  var ecount=parseInt((document.getElementById('ecount') as HTMLInputElement).value)
  var eprice=parseInt((document.getElementById('eprice') as HTMLInputElement).value)
  var edate=(document.getElementById('edate') as HTMLInputElement).value
  let fetMed=await fetchMedicine()
  for(var i=0;i<fetMed.length;i++)
    {
      if(medID==fetMed[i].medicineID)
        {
          let addMed:MedicineInfo=
          {
            medicineID:medID,
            medicineName:ename,
            medicineCount:ecount,
            medicinePrice:eprice,
            expiaryDate:edate
          }
          UpdateMed(medID,addMed)
          alert("edited")
        }
        
    }
}
function deletemed(medicineID:number)
{
  deleteMedicineDetails(medicineID)
}

async function purchase() {
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
  var home=document.getElementById('home') as HTMLParagraphElement
  home.style.display="none"
  var balance=document.getElementById('balance1') as HTMLParagraphElement
  balance.style.display="none"
  var recharge1=document.getElementById('recharge1') as HTMLDivElement
  recharge1.style.display="none"
  var cancel1=document.getElementById('cancel1') as HTMLDivElement;
  cancel1.style.display="none"
      var purchase1=document.getElementById('purchase1') as HTMLDivElement
      purchase1.style.display="block";
      var medicine2 = document.getElementById('medicine1') as HTMLDivElement;
      medicine2.style.display="none"
      var table1=document.getElementById("table1") as HTMLTableElement;
      table1.innerHTML="";
      let purfet=await fetchMedicine()
      for(var i=0;i<purfet.length;i++)
          {
              var row=document.createElement("tr")
              row.innerHTML=`<td>${purfet[i].medicineName}</td>
              <td>${purfet[i].medicineCount}</td>
              <td>${purfet[i].medicinePrice}</td>
              <td>${purfet[i].expiaryDate.split("T")[0].split("-").reverse().join("/")}</td>
              <td><button onclick="Medicine('${purfet[i].medicineID}');">buy</button></td>`
              table1.appendChild(row);
              
          }
        
}
function Medicine(MedicineId:number)
{
    currentmedicineID=MedicineId
    var quantity=document.getElementById('quantity') as HTMLInputElement
    quantity.style.display="block";
}
function quantity()
{
    buyMedicine()
}
async function buyMedicine()
{
  let purfet=await fetchMedicine()
  let order_Status="orderd"
    for(var i=0;i<purfet.length;i++)
        {
            if(purfet[i].medicineID==currentmedicineID)
              {
                if(purfet[i].medicinePrice<=CurrentUser.userBalance)
                {
                    var quantity:number=parseInt((document.getElementById('quantity1') as HTMLInputElement).value)
                    purfet[i].medicineCount-=Number(quantity);
                    var price=quantity*purfet[i].medicinePrice;
                  
                    CurrentUser.userBalance-=price
                    
                   let orderPush:Order=
                    {
                      orderID:0,
                      medicineName:purfet[i].medicineName,
                      medicineCount:purfet[i].medicineCount,
                      medicinePrice:purfet[i].medicinePrice,
                      orderStatus:order_Status
                      }
                     addOrder(orderPush)
                    UpdateUser(CurrentUser.userID,CurrentUser)
                      alert("Successfully pushed")
                  }
              else
              {
                alert("wrong id");
              }    
       }
}
}
async function cancel()
{
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
  var home=document.getElementById('home') as HTMLParagraphElement
  home.style.display="none"
  var balance=document.getElementById('balance1') as HTMLParagraphElement
  balance.style.display="none"
  var recharge1=document.getElementById('recharge1') as HTMLDivElement
  recharge1.style.display="none"
  var purchase1=document.getElementById('purchase1') as HTMLDivElement
  purchase1.style.display="none";
  var quantity=document.getElementById('quantity') as HTMLDivElement
  quantity.style.display="none"
  var medicine2 = document.getElementById('medicine1') as HTMLDivElement;
  medicine2.style.display="none"
  var cancel1=document.getElementById('cancel1') as HTMLDivElement;
  cancel1.style.display="block"
  var ctable1=document.getElementById('ctable1') as HTMLTableElement;
  ctable1.innerHTML="";
  let fetcancel=await fetchOrder()
  for(var i=0;i<fetcancel.length;i++)
      {
        if(fetcancel[i].orderStatus=="orderd")
          {
          var row=document.createElement("tr")
              row.innerHTML=`<td>${fetcancel[i].medicineName}</td>
              <td>${fetcancel[i].medicineCount}</td>
              <td>${fetcancel[i].medicinePrice}</td>
              <td>${fetcancel[i].orderStatus}</td>
              <td><button id="btn" onclick="cancelorder('${fetcancel[i].orderID}');">Cancel</button></td>`
              ctable1.appendChild(row);
          }
      }
}

async function orderhistory()
{
  var editShow=document.getElementById('edit') as HTMLDivElement
  editShow.style.display="none"
    var home=document.getElementById('home') as HTMLParagraphElement
    home.style.display="none"
    var balance=document.getElementById('balance1') as HTMLParagraphElement
    balance.style.display="none"
    var recharge1=document.getElementById('recharge1') as HTMLDivElement
    recharge1.style.display="none"
    var purchase1=document.getElementById('purchase1') as HTMLDivElement
    purchase1.style.display="none";
    var quantity=document.getElementById('quantity') as HTMLDivElement
    quantity.style.display="none"
    var history1=document.getElementById('history1') as HTMLDivElement;
    history1.style.display="block";
    var cancel1=document.getElementById('cancel1') as HTMLDivElement;
    cancel1.style.display="none"
    var htable1=document.getElementById('htable1') as HTMLTableElement;
    htable1.innerHTML=""
    let fetOrder=await fetchOrder()

    for(var i=0;i<fetOrder.length;i++)
        {
            var row=document.createElement("tr")
                row.innerHTML=`<td>${fetOrder[i].medicineName}</td>
                <td>${fetOrder[i].medicineCount}</td>
                <td>${fetOrder[i].medicinePrice}</td>
                <td>${fetOrder[i].orderStatus}</td>`
                htable1.appendChild(row);
        }
}
async function cancelorder(orderID:number)
{
  let flag =0;
 
  let fetOrder=await fetchOrder()
  let fetMed=await fetchMedicine()
  for(var i=0;i<fetOrder.length;i++)
    {
      if(orderID==fetOrder[i].orderID)
        {

        if(fetOrder[i].orderStatus=="orderd")
          {
            fetOrder[i].orderStatus="Cancelled"
            CurrentUser.userBalance+=fetOrder[i].medicinePrice
           UpdateOrder(fetOrder[i].orderID,fetOrder[i])
           UpdateUser(CurrentUser.userID,CurrentUser)
            flag++;
          }
        }
    }
    if(flag !=0)
      {
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
}
async function fetchUser(): Promise<User[]>
{
    const apiUrl = 'http://localhost:5029/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchMedicine(): Promise<MedicineInfo[]>
{
    const apiUrl = 'http://localhost:5029/api/MedicineInfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchOrder(): Promise<Order[]>
{
    const apiUrl = 'http://localhost:5029/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function addUser(user: User): Promise<void>
 {
    const response = await fetch('http://localhost:5029/api/User', {
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
 async function addMedicine(medicine: MedicineInfo): Promise<void>
 {
    const response = await fetch('http://localhost:5029/api/MedicineInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicine)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
 }
 async function addOrder(order: Order): Promise<void>
 {
    const response = await fetch('http://localhost:5029/api/Order', {
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
 async function UpdateUser(id: any, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5029/api/User/${id}`, {
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
  async function UpdateOrder(id: number, order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5029/api/Order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  async function UpdateMed(id: number, med: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5029/api/MedicineInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(med)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  async function deleteMedicineDetails(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5029/api/MedicineInfo/${id}`,
        {
            method: 'DELETE'
        });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    medicine();

}


