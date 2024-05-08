using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARYAPI.Controllers;

[Table("book", Schema = "public")]
public class Book
{
   [Key]
    public int BookID { get; set; }
    
    public string BookName { get; set; }
    
    public string AuthorName { get; set; }
    
    public int BookCount { get; set; }
    
    
}