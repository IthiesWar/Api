using LIBRARYAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplicationApi
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
         [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users);
        }
        [HttpGet("{id}")]
        public  IActionResult GetUserDetails(int id)
        {
            var UserDetails=_dbContext.users.FirstOrDefault(U=>U.UserID==id);
            if(UserDetails==null)
            {
                return NotFound();
            }
            return Ok(UserDetails);
        }
         [HttpPost]
        public IActionResult PostUserDetails([FromBody]User UserDetails)
        {
            _dbContext.users.Add(UserDetails);
             _dbContext.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutUser(int id,[FromBody] User UserDetails)
        {
            var index=_dbContext.users.FirstOrDefault(U=>U.UserID==id);
            if(index==null)
            {
                return NotFound();
            }
            index.UserName=UserDetails.UserName;
            index.Gender=UserDetails.Gender;
            index.DepartMent=UserDetails.DepartMent;
            index.Phone=UserDetails.Phone;
            index.MailID=UserDetails.MailID;
            index.Balance=UserDetails.Balance;
            index.Password=UserDetails.Password;
            _dbContext.SaveChanges();
            return Ok();
        }
         [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var DeleteUser=_dbContext.users.FirstOrDefault(U=>U.UserID==id);
            if(DeleteUser==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(DeleteUser);
             _dbContext.SaveChanges();
            return Ok();
        }

    }
} 
