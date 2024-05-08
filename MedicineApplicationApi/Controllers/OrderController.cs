using MedicineApplicationApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplicationApi
{

     [Route("api/[controller]")]
    [ApiController]
    public class OrderController:ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
         [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders);
        }
        [HttpGet("{id}")]
        public  IActionResult GetOrderDetails(int id)
        {
            var OrderDetails=_dbContext.orders.FirstOrDefault(O=>O.OrderID==id);
            if(OrderDetails==null)
            {
                return NotFound();
            }
            return Ok(OrderDetails);
        }
         [HttpPost]
        public IActionResult PostOrderDetails([FromBody]Order OrderDetails)
        {
            _dbContext.orders.Add(OrderDetails);
             _dbContext.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id,[FromBody] Order OrderDetails)
        {
            var index=_dbContext.orders.FirstOrDefault(O=>O.OrderID==id);
            if(index==null)
            {
                return NotFound();
            }
            index.MedicineName=OrderDetails.MedicineName;
            index.MedicineCount=OrderDetails.MedicineCount;
            index.MedicinePrice=OrderDetails.MedicinePrice;
            index.OrderStatus=OrderDetails.OrderStatus;
            _dbContext.SaveChanges();
            return Ok();
        }
         [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var DeleteUser=_dbContext.orders.FirstOrDefault(O=>O.OrderID==id);
            if(DeleteUser==null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(DeleteUser);
             _dbContext.SaveChanges();
            return Ok();
        }
    }
} 
