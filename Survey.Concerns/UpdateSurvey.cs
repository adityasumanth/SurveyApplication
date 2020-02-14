using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Concerns
{
    public class UpdateSurvey
    {
        public SurveyForm SurveyForm { get; set; }
        public List<SurveyQuestion> DeletedQuestions { get; set; }
        public List<SurveyOption> DeletedOptions { get; set; }
    }
}
