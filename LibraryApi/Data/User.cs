using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARYAPI.Controllers;

[Table("user", Schema = "public")]
public class User
{
  [Key]
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Gender { get; set; }
    
    public string DepartMent { get; set; }
    
    public string Phone { get; set; }
    
    public string MailID { get; set; }
    public int Balance { get; set; }
    
    public string Password { get; set; }
    
    
    
    
    
}