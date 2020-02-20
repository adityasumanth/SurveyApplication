using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Survey.Concerns
{
    public class SurveyForm
    {
        [Required]
        public int Id { get; set; }
        [Required] 
        public string Title { get; set; }
        [Required]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }
        [Required]
        public bool isActive { get; set; }
        [Required]
        public bool isPublic { get; set; }
        [ForeignKey("User")]
        [Required]
        public int CreatedBy { get; set; }
        public List<SurveyQuestion> Questions { get; set; }
    }
}
