using LIBRARYAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplicationApi
{

    [Route("api/[controller]")]
    [ApiController]
    public class BorrowController:ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public BorrowController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
         [HttpGet]
        public IActionResult BorrowUser()
        {
            return Ok(_dbContext.borrow);
        }
        [HttpGet("{id}")]
        public  IActionResult GetBorrowDetails(int id)
        {
            var UserDetails=_dbContext.borrow.FirstOrDefault(U=>U.BorrowkID==id);
            if(UserDetails==null)
            {
                return NotFound();
            }
            return Ok(UserDetails);
        }
         [HttpPost]
        public IActionResult PostBorrowDetails([FromBody]Borrow UserDetails)
        {
            _dbContext.borrow.Add(UserDetails);
             _dbContext.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutBorrow(int id,[FromBody] Borrow UserDetails)
        {
            var index=_dbContext.borrow.FirstOrDefault(U=>U.BorrowkID==id);
            if(index==null)
            {
                return NotFound();
            }
            index.BookID=UserDetails.BookID;
            index.UserID=UserDetails.UserID;
            index.BorrowedDate=UserDetails.BorrowedDate;
            index.BorrowBookCount=UserDetails.BorrowBookCount;
            index.PaidFine=UserDetails.PaidFine;
            index.Status=UserDetails.Status;
            _dbContext.SaveChanges();
            return Ok();
        }
         [HttpDelete("{id}")]
        public IActionResult DeleteBorrow(int id)
        {
            var DeleteUser=_dbContext.borrow.FirstOrDefault(U=>U.BorrowkID==id);
            if(DeleteUser==null)
            {
                return NotFound();
            }
            _dbContext.borrow.Remove(DeleteUser);
             _dbContext.SaveChanges();
            return Ok();
        }

    }
} 
