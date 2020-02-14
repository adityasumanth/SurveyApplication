using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Concerns
{
    public class UpdateSurvey
    {
        public SurveyForm SurveyForm { get; set; }
        public int[] DeletedQuestions { get; set; }
        public int[] DeletedOptions { get; set; }
    }
}
