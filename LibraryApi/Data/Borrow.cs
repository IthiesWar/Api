using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARYAPI.Controllers;

[Table("borrow", Schema = "public")]
public class Borrow
{
    [Key]
    public int  BorrowkID{ get; set; }
    public int  BookID{ get; set; }
    public int UserID{ get; set; }
    
    public DateTime BorrowedDate { get; set; }
    
    public int BorrowBookCount { get; set; }
    
  
    public int PaidFine { get; set; }
    
      public string  Status{ get; set; }

    
}