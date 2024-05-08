using medicalstoreapi;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
namespace medicalstoreapi.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Contactcontroller:ControllerBase
    {
        private static List<Contacts> _Contacts=new List<Contacts>
        {
            new Contacts{ID="2",Name="Ravi",Email="u8h@gamil.com",Phone="1234567890"},
            new Contacts{ID="3",Name="Chandean",Email="jhfd@gmail.com",Phone="1233444333"},
            new Contacts{ID="4",Name="Baskaran",Email="ksj@gmail.com",Phone="1298698"}
        };
       
     [HttpGet]
     public IActionResult GetContacts()
        {
            
            return Ok(_Contacts);
        }
         //GET: api/Contacts/1
        [HttpGet("{id}")]
        public  IActionResult GetMedicine(string id)
        {
            var medicine=_Contacts.Find(m=>m.ID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }
        [HttpPost]
        public IActionResult PostMedicine([FromBody]Contacts medicine)
        {
            _Contacts.Add(medicine);
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id,[FromBody] Contacts medicine)
        {
            var index=_Contacts.FindIndex(m=>m.ID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Contacts[index]=medicine;
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine=_Contacts.Find(m=>m.ID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            _Contacts.Remove(medicine);
            return Ok();
        }
    }
}