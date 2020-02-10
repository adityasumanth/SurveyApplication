using Survey.Concerns;
using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Contracts
{
    public interface ISurveyContract
    {
        List<SurveyForm> GetSurveyForms();
        public SurveyForm GetSurveyFormById(int id);
        public List<SurveyData> GetSurveyData(int id);
        public SurveyData PostPollData(SurveyData pollData);
        public SurveyForm PostNewSurveyForm(SurveyForm surveyForm);
    }
}
