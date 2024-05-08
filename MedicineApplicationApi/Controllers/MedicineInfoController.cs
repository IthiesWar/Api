using MedicineApplicationApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplicationApi
{

     [Route("api/[controller]")]
    [ApiController]
    public class MedicineInfoController:ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public MedicineInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
         [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicineInfo);
        }
        [HttpGet("{id}")]
        public  IActionResult GetMedicineDetails(int id)
        {
            var MedDetails=_dbContext.medicineInfo.FirstOrDefault(M=>M.MedicineID==id);
            if(MedDetails==null)
            {
                return NotFound();
            }
            return Ok(MedDetails);
        }
         [HttpPost]
        public IActionResult PostMedicineDetails([FromBody]MedicineInfo MedDetails)
        {
            _dbContext.medicineInfo.Add(MedDetails);
             _dbContext.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        public IActionResult PutMedicineDetails(int id,[FromBody] MedicineInfo MedDetails)
        {
            var index=_dbContext.medicineInfo.FirstOrDefault(M=>M.MedicineID==id);
            if(index==null)
            {
                return NotFound();
            }
            index.MedicineName=MedDetails.MedicineName;
            index.MedicineCount=MedDetails.MedicineCount;
            index.MedicinePrice=MedDetails.MedicinePrice;
            index.ExpiaryDate=MedDetails.ExpiaryDate;
            _dbContext.SaveChanges();
            return Ok();
        }
         [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)
        {
            var DeleteUser=_dbContext.medicineInfo.FirstOrDefault(M=>M.MedicineID==id);
            if(DeleteUser==null)
            {
                return NotFound();
            }
            _dbContext.medicineInfo.Remove(DeleteUser);
             _dbContext.SaveChanges();
            return Ok();
        }

    }
} 
