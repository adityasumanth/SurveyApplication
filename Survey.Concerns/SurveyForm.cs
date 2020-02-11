using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Survey.Concerns
{
    public class SurveyForm
    {
        [Required]
        public int SurveyFormId { get; set; }
        [Required] 
        public string Title { get; set; }
        [Required]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CreatedOn { get; set; }
        [Required]
        [ForeignKey("User")]
        public int CreatedBy { get; set; }
        public List<SurveyQuestion> Questions { get; set; }
    }
}
