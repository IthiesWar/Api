using LIBRARYAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplicationApi
{

    [Route("api/[controller]")]
    [ApiController]
    public class BookController:ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public BookController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
         [HttpGet]
        public IActionResult BookUser()
        {
            return Ok(_dbContext.book);
        }
        [HttpGet("{id}")]
        public  IActionResult GetBookDetails(int id)
        {
            var UserDetails=_dbContext.book.FirstOrDefault(U=>U.BookID==id);
            if(UserDetails==null)
            {
                return NotFound();
            }
            return Ok(UserDetails);
        }
         [HttpPost]
        public IActionResult PostBookDetails([FromBody]Book UserDetails)
        {
            _dbContext.book.Add(UserDetails);
             _dbContext.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutBook(int id,[FromBody] Book UserDetails)
        {
            var index=_dbContext.book.FirstOrDefault(U=>U.BookID==id);
            if(index==null)
            {
                return NotFound();
            }
            index.BookID=UserDetails.BookID;
            index.BookName=UserDetails.BookName;
            index.AuthorName=UserDetails.AuthorName;
            index.BookCount=UserDetails.BookCount;
            _dbContext.SaveChanges();
            return Ok();
        }
         [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var DeleteUser=_dbContext.book.FirstOrDefault(U=>U.BookID==id);
            if(DeleteUser==null)
            {
                return NotFound();
            }
            _dbContext.book.Remove(DeleteUser);
             _dbContext.SaveChanges();
            return Ok();
        }

    }
} 
