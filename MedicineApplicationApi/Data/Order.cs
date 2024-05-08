using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicineApplicationApi;
 [Table("order", Schema = "public")]
public class Order
{
    [Key]

    public int OrderID { get; set; }
    
    public string MedicineName { get; set; }
    
    public int MedicineCount { get; set; }
    
    public int MedicinePrice { get; set; }
    
    public string OrderStatus { get; set; }
    
    
    
}