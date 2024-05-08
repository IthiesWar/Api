using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicineApplicationApi;
 [Table("userDetails", Schema = "public")]
public class User
{
    [Key]
    public int UserID { get; set; }
    
    public string UserName { get; set; }
    
    public string UserEmail { get; set; }
    
    public int UserBalance { get; set; }
    public string UserPhone { get; set; }
    
    public string UserPassword { get; set; }
    
    
    
    
}